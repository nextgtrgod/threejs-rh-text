import Time from './Time.js'

let instance = null

export default class Mouse {
	constructor({ container } = {}) {
		if (instance) return instance
		instance = this

		this.time = new Time()
		this.container = container
		this.x = 0
		this.y = 0

		this.handleMove = this.handleMove.bind(this)
		this.handleOut = this.handleOut.bind(this)

		this.container.addEventListener('pointermove', this.handleMove)
		this.container.addEventListener('pointerout', this.handleOut)
	}

	handleMove({ clientX, clientY }) {
		this.x = 2 * (clientX / window.innerWidth) - 1
		this.y = 2 * (-clientY / window.innerHeight) + 1

		this.time.start()
	}

	handleOut() {
		this.x = 0
		this.y = 0
	}

	destroy() {
		this.container.removeEventListener('pointermove', this.handleMove)
		this.container.removeEventListener('pointerout', this.handleOut)
	}
}