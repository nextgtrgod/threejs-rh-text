
const formats = {
	avif: {
		image: 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=',
		supports: null,
	},
	webp: {
		image: 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA',
		supports: null,
	},
}

export default class ImageSet {
	constructor(images) {
		this.images = images
	}

	get image() {
		return new Promise(async (resolve) => {
			for (let key in formats) {
				const supports = await this.detectSupport(formats[key])
				const image = this.images[key]
				if (supports && image) {
					return resolve(image)
				}
			}
			return resolve(this.images['fallback'])
		})
	}

	async detectSupport(format) {
		return new Promise(resolve => {
			if (format.supports !== null) {
				return resolve(format.supports)
			}

			const image = new Image()
			image.onload = () => {
				format.supports = true
				resolve(format.supports)
			}
			image.onerror = () => {
				format.supports = false
				resolve(format.supports)
			}
			image.src = format.image
		})
	}
}