import EventEmitter from './EventEmitter.js'

let instance = null

export default class Viewport extends EventEmitter {
	constructor({ canvas } = {}) {
		super()

		if (instance) return instance
		instance = this

		this.canvas = canvas

		this.setSizes()

		window.addEventListener('resize', () => {
			this.setSizes()
			this.emit('resize')
		})
	}

	setSizes() {
		this.width = this.canvas.parentNode.clientWidth
		this.height = this.canvas.parentNode.clientHeight
		this.pixelRatio = Math.min(window.devicePixelRatio, 2)

		this.actualWidth = this.width * this.pixelRatio
		this.actualHeight = this.height * this.pixelRatio
	}
}