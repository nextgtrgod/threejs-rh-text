import EventEmitter from './EventEmitter.js'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

let instance = null

export default class Resources extends EventEmitter {
	constructor() {
		super()

		if (instance) return instance
		instance = this

		this.items = {}

		this.toLoad = 0
		this.loaded = 0

		this.setLoaders()
	}

	setLoaders() {
		const dracoLoader = new DRACOLoader()
		dracoLoader.setDecoderPath('./draco/')

		const gltfLoader = new GLTFLoader()
		gltfLoader.setDRACOLoader(dracoLoader)

		const textureLoader = new THREE.TextureLoader()

		const rgbeLoader = new RGBELoader()

		// const cubeTextureLoader = new THREE.CubeTextureLoader()

		this.loaders = {
			gltfLoader,
			textureLoader,
			rgbeLoader,
			// cubeTextureLoader,
		}
	}

	load(sources = []) {
		this.sources = sources
		this.toLoad = this.sources.length
		this.loaded = 0

		for (const source of this.sources) {
			if (this.items[source.name]) {
				this.onSourceLoaded(source, this.items[source.name])
				continue
			}

			switch (source.type) {
				case 'gltf': {
					this.loaders.gltfLoader.load(
						source.path,
						file => this.onSourceLoaded(source, file),
					)
					break
				}
				case 'texture': {
					source.path.image.then(path => {
						this.loaders.textureLoader.load(
							path,
							file => this.onSourceLoaded(source, file),
						)
					})
					break
				}
				case 'rgbe': {
					this.loaders.rgbeLoader.load(
						source.path,
						file => this.onSourceLoaded(source, file),
					)
					break
				}
				// case 'cubeTexture': {
				// 	this.loaders.cubeTextureLoader.load(
				// 		source.path,
				// 		file => this.onSourceLoaded(source, file),
				// 	)
				// 	break
				// }
			}
		}
	}

	onSourceLoaded(source, file) {
		file.name = source.name
		this.items[source.name] = file
		this.loaded++

		if (this.loaded === this.toLoad) {
			this.emit('ready')
		}
	}
}
