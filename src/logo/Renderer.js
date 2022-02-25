import * as THREE from 'three'
import Sketch from './Sketch.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'
// import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'

export default class Renderer {
	constructor() {
		this.sketch = new Sketch()
		this.canvas = this.sketch.canvas
		this.viewport = this.sketch.viewport
		this.scene = this.sketch.scene
		this.camera = this.sketch.camera
		this.debug = this.sketch.debug

		this.setInstance()
		this.setPostProcess()
	}

	setInstance() {
		this.instance = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: false,
			alpha: false,
			powerPreference: 'high-performance',
		})
		// this.instance.outputEncoding = THREE.sRGBEncoding
		// this.instance.physicallyCorrectLights = true
		// this.instance.toneMapping = THREE.LinearToneMapping
		// this.instance.toneMapping = THREE.ACESFilmicToneMapping
		// this.instance.toneMappingExposure = 1.25
		// this.instance.toneMapping = THREE.ReinhardToneMapping
		// this.instance.setClearColor(background.color)
		this.instance.setClearColor(0x232323)
		this.instance.setSize(this.viewport.width, this.viewport.height)
		this.instance.setPixelRatio(this.viewport.pixelRatio)
	}

	setPostProcess() {
		// const RenderTarget = this.viewport.pixelRatio >= 2
		// 	? THREE.WebGLRenderTarget
		// 	: THREE.WebGLMultisampleRenderTarget // this one has ios bug

		const renderTarget = new THREE.WebGLRenderTarget(
			this.viewport.width,
			this.viewport.height,
			{
				generateMipmaps: false,
				minFilter: THREE.LinearFilter,
				magFilter: THREE.LinearFilter,
				// format: THREE.RGBFormat,
				// encoding: THREE.sRGBEncoding,
			},
		)

		this.composer = new EffectComposer(this.instance, renderTarget)

		const renderPass = new RenderPass(this.scene, this.camera.instance)
		const fxaaPass = new ShaderPass(FXAAShader)
		// const smaaPass = new SMAAPass(this.viewport.actualWidth, this.viewport.actualHeight)

		fxaaPass.material.uniforms['resolution'].value.x = 1 / (this.viewport.width * this.viewport.pixelRatio)
		fxaaPass.material.uniforms['resolution'].value.y = 1 / (this.viewport.height * this.viewport.pixelRatio)

		this.composer.addPass(renderPass)
		this.composer.addPass(fxaaPass)
		// this.composer.addPass(smaaPass)
		// this.composer.addPass(vignettePass)

		this.composer.setSize(this.viewport.width, this.viewport.height)
		this.composer.setPixelRatio(this.viewport.pixelRatio)

		this.fxaaPass = fxaaPass
		// this.smaaPass = smaaPass
	}

	resize() {
		this.instance.setSize(this.viewport.width, this.viewport.height)
		this.instance.setPixelRatio(this.viewport.pixelRatio)

		this.composer.setSize(this.viewport.width, this.viewport.height)
		this.composer.setPixelRatio(this.viewport.pixelRatio)

		this.fxaaPass.material.uniforms['resolution'].value.x = 1 / (this.viewport.width * this.viewport.pixelRatio)
		this.fxaaPass.material.uniforms['resolution'].value.y = 1 / (this.viewport.height * this.viewport.pixelRatio)

		// this.smaaPass.setSize(this.viewport.actualWidth, this.viewport.actualHeight)
	}

	update() {
		// this.instance.render(this.scene, this.camera.instance)
		this.composer.render()
	}
}