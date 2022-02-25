import * as THREE from 'three'
import Debug from '../utils/Debug.js'
import Mouse from '../utils/Mouse.js'
import { light as options } from '../config/settings.js'

export default class Light {
	constructor() {
		this.debug = new Debug()
		this.mouse = new Mouse()
		this.group = new THREE.Group()
		this.group.name = 'light'

		// this.setAmbient()
		this.setPoint()
		this.setDebug()
	}

	setAmbient() {
		this.ambient = new THREE.AmbientLight(0xffffff, 1)
		this.group.add(this.ambient)
	}

	setPoint() {
		this.point = new THREE.PointLight( 0xffffff, options.intensity, 20 )
		this.point.distance = options.distance
		this.point.position.set(options.x, options.y, options.z)
		this.group.add(this.point)
	}

	setDebug() {
		if (!this.debug.active) return

		const folder = this.debug.ui.addFolder('Light')
		folder.add(this.point, 'intensity', 0, 20)
		folder.add(this.point.position, 'x', -5, 5, 0.01)
		folder.add(this.point.position, 'y', -5, 5, 0.01)
		folder.add(this.point.position, 'z', 0, 10, 0.01)
		folder.add(this.point, 'distance', 0, 20, 0.01)
		folder.add(this.point, 'decay', 0, 1, 0.001)

		const helper = new THREE.PointLightHelper(this.point)
		this.group.add(helper)
	}
}