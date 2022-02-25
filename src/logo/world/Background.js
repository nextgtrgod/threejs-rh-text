import * as THREE from 'three'
import Resources from '../utils/Resources.js'
import Viewport from '../utils/Viewport.js'
import Debug from '../utils/Debug.js'
import Animator from '../Animator.js'

export default class Background {
	constructor() {
		this.resources = new Resources()
		this.viewport = new Viewport()
		this.debug = new Debug()
		this.animator = new Animator()

		this.setMaterial()
		this.setMesh()
		this.setAnimation()
	}

	setMaterial() {
		const texture = this.resources.items['bg']
		texture.generateMipmaps = false

		this.material = new THREE.MeshBasicMaterial({
			map: texture,
		})
	}

	setMesh() {
		this.geometry = new THREE.PlaneBufferGeometry(12, 12, 1, 1)
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.mesh.position.z = -1
	}

	setAnimation() {
		this.animator.add(
			{
				value: this.mesh.position.x,
				range: -1,
				axis: 'x',
				damping: 1,
				onUpdate: value => {
					this.mesh.position.x = value
				},
			},
			{
				value: this.mesh.position.y,
				range: -0.25,
				axis: 'y',
				damping: 1,
				onUpdate: value => {
					this.mesh.position.y = value
				},
			},
		)
	}
}