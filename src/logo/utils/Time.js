import EventEmitter from './EventEmitter.js'

let instance = null

export default class Time extends EventEmitter {
	constructor({ autoStart = false } = {}) {
		super()

		if (instance) return instance
		instance = this

		this.autoStart = autoStart
		this.running = false
		this.current = 0
		this.elapsed = 0
		this.delta = 0

		this.rafId = 0

		this.update = this.update.bind(this)

		if (this.autoStart) this.start()
	}

	start() {
		if (this.running) return

		this.current = performance.now()
		this.running = true
		this.rafId = window.requestAnimationFrame(this.update)
	}

	stop() {
		if (!this.running) return
		this.running = false
	}

	update() {
		if (!this.running) {
			return window.cancelAnimationFrame(this.rafId)
		}

		const now = performance.now()
		this.delta = (now - this.current) / 1000
		this.current = now
		this.elapsed += this.delta

		this.emit('update', this.elapsed, this.delta)

		this.rafId = window.requestAnimationFrame(this.update)
	}
}