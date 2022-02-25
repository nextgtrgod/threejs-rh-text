import * as THREE from 'three'
import Debug from './utils/Debug.js'
import Viewport from './utils/Viewport.js'
import Time from './utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './world/World.js'
import Mouse from './utils/Mouse.js'
import Animator from './Animator.js'

let instance = null

export default class Sketch {
	constructor({ canvas } = {}) {
		if (instance) return instance
		instance = this

		this.canvas = canvas

		this.debug = new Debug()
		this.viewport = new Viewport({
			canvas: this.canvas,
		})
		this.time = new Time()
		this.scene = new THREE.Scene()
		this.camera = new Camera()
		this.renderer = new Renderer()
		this.mouse = new Mouse({ container: this.canvas })
		this.animator = new Animator()
		this.world = new World()

		this.viewport.on('resize', this.resize.bind(this))
		
		this.world.on('ready', () => {
			this.scene.add(this.world.group)

			this.camera.fitTo(this.world.text.mesh)

			this.viewport.on('resize', () => {
				this.camera.fitTo(this.world.text.mesh)
			})

			this.time.on('update', this.update.bind(this))
			this.time.start()

			this.canvas.classList.remove('loading')
		})
	}

	resize() {
		this.camera.resize()
		this.renderer.resize()
		if (!this.time.running) {
			this.renderer.update()
		}
	}

	update(elapsed, delta) {
		// this.debug.begin()

		this.camera.update()
		this.animator.update(delta)
		this.renderer.update()

		// console.log('updating')

		// this.debug.end()
	}

	destroy() {
		this.time.stop()
		this.time.off('update')
		this.viewport.off('resize')

		this.camera.orbitControls.dispose()
		this.renderer.instance.dispose()

		if (this.debug.active) {
			this.debug.ui.destroy()
		}
	}
}