import Mouse from './utils/Mouse.js'
import Time from './utils/Time.js'

const throttle = (callback, delay) => {
	let lastCall = Date.now()
	return () => {
		const now = Date.now()
		if (now - lastCall < delay) return
		lastCall = now
		callback()
	}
}

class Property {
	constructor({ value = 0, axis = 'x', range = 1, damping = 1, onUpdate } = {}) {
		this.value = value
		this.axis = axis
		this.range = range
		this.target = this.value
		this.damping = damping
		this.onUpdate = onUpdate
	}

	update(mouse, delta) {
		this.target = mouse[this.axis] * this.range
		this.value += (this.target - this.value) * delta * this.damping
		this.onUpdate(this.value)
	}

	get animationEnd() {
		return Math.abs(this.target - this.value) < 0.075
	}
}

let instance = null

export default class Animator {
	constructor() {
		if (instance) return instance
		instance = this

		this.properties = []

		this.mouse = new Mouse()
		this.time = new Time()

		this.stop = throttle(this.stop.bind(this), 500)
	}

	add(...properties) {
		properties.forEach(options => {
			const property = new Property(options)
			this.properties.push(property)
		})
	}

	update(delta) {
		for (const property of this.properties) {
			property.update(this.mouse, delta)
		}

		this.stop()
	}

	stop() {
		if (this.properties.some(property => !property.animationEnd)) return
		
		this.time.stop()
	}
}