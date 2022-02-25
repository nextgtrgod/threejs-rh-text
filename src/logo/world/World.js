import * as THREE from 'three'
import Sketch from '../Sketch.js'
import EventEmitter from '../utils/EventEmitter.js'
import Resources from '../utils/Resources.js'
import Background from './Background.js'
import Text from './Text.js'
import Light from './Light.js'
import sources from '../config/sources.js'

let instance = null

export default class World extends EventEmitter {
	constructor() {
		super()

		if (instance) return instance
		instance = this

		this.sketch = new Sketch()
		this.resources = new Resources()
		this.group = new THREE.Group()
		this.group.name = 'name'

		this.resources.on('ready', () => {
			this.setObjects()
			this.emit('ready')
		})
		this.resources.load(sources)
	}

	setObjects() {
		this.background = new Background()
		this.text = new Text()
		this.light = new Light()

		this.group.add(
			this.background.mesh,
			this.text.mesh,
			this.light.group,
		)
	}
}