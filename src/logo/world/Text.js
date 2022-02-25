import * as THREE from 'three'
import Resources from '../utils/Resources.js'
import Debug from '../utils/Debug.js'
import Animator from '../Animator.js'
import { text as options } from '../config/settings.js'

export default class Text {
	constructor() {
		this.resources = new Resources()
		this.debug = new Debug()
		this.animator = new Animator()

		this.setMaterial()
		this.setMesh()
		this.setAnimation()
		// this.setDebug()
	}

	setMaterial() {
		// const envMap = this.resources.items['envMap']
		// envMap.mapping = THREE.CubeRefractionMapping

		const envMap = this.resources.items['hdriMap']
		envMap.mapping = THREE.EquirectangularRefractionMapping

		this.material = new THREE.MeshPhysicalMaterial({
			color: options.color,
			metalness: options.metalness,
			roughness: options.roughness,
			transmission: options.transmission,
			sheen: options.sheen,
			sheenRoughness: options.sheenRoughness,
			sheenColor: options.sheenColor,
			ior: options.ior,
			reflectivity: options.reflectivity,
			thickness: options.thickness,
			envMap: envMap,
			envMapIntensity: options.envMapIntensity,
			clearcoat: options.clearcoat,
			clearcoatRoughness: options.clearcoatRoughness,
			attenuationDistance: options.attenuationDistance,
		})
	}

	setMesh() {
		this.mesh = this.resources.items['textModel'].scene.children[0]
		this.mesh.material = this.material
	}

	setAnimation() {
		this.animator.add(
			{
				value: this.mesh.rotation.y,
				range: -Math.PI / 8,
				axis: 'x',
				damping: 2,
				onUpdate: value => {
					this.mesh.rotation.y = value
				},
			},
			{
				value: this.mesh.rotation.x,
				range: Math.PI / 8,
				axis: 'y',
				damping: 2,
				onUpdate: value => {
					this.mesh.rotation.x = value
				},
			},
		)
	}

	setDebug() {
		if (!this.debug.active) return

		const folder = this.debug.ui.addFolder('Text')

		folder.addColor(options, 'color').onChange((value) => {
			this.material.color.set(value)
		})
		
		folder.add(this.material, 'roughness', 0, 1, 0.01)
		folder.add(this.material, 'metalness', 0, 1, 0.01)
		folder.add(this.material, 'transmission', 0, 1, 0.01)
		folder.add(this.material, 'ior', 1, 2.333, 0.01)
		folder.add(this.material, 'reflectivity', 0, 1, 0.01)
		folder.add(this.material, 'thickness', 0, 5, 0.1)
		folder.add(this.material, 'envMapIntensity', 0, 6, 0.1)
		folder.add(this.material, 'clearcoat', 0, 1, 0.01)
		folder.add(this.material, 'clearcoatRoughness', 0, 1, 0.01)
		folder.add(this.material, 'sheen', 0, 1, 0.01)
		folder.add(this.material, 'sheenRoughness', 0, 1, 0.01)
		folder.addColor(options, 'sheenColor').onChange((value) => {
			this.material.sheenColor = new THREE.Color(value)
		})
	}
}