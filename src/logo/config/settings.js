import * as THREE from 'three'

export const background = {
	// color1: 0x70aeff,
	// color2: 0xbee7f6,
	color1: 0x70c1ff,
	color2: 0xffffff,
	scale: 5.7,
	speed: 0.382,
}

export const text = {
	color: 0x63d4fe,
	metalness: 0.05,
	roughness: 0,
	transmission: 1,
	sheen: 2,
	sheenRoughness: 0,
	sheenColor: 0xffffff,
	ior: 2.333,
	reflectivity: 1,
	thickness: 3,
	envMapIntensity: 3,
	clearcoat: 1,
	clearcoatRoughness: 0.3,
	normalScale: 0,
	clearcoatNormalScale: 0,
	normalRepeat: 3,
	attenuationTint: 0xffffff,
	attenuationDistance: 0,
}

export const light = {
	color: new THREE.Color(0xffffff),
	// intensity: 5.25,
	intensity: 20,
	x: 0,
	y: -3.15,
	z: 2,
	distance: 5.13,
}