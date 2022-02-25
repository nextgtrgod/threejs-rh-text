import textModel from '@/assets/logo/models/text-compressed.glb?url'
import hdriMap from '@/assets/logo/textures/hdr.hdr?url'
import bgMapAvif from '@/assets/logo/textures/bg.avif?url'
import bgMapWebp from '@/assets/logo/textures/bg.webp?url'
import bgMap from '@/assets/logo/textures/bg.png?url'
import ImageSet from '../utils/ImageSet.js'

const sources = [
	{ type: 'gltf', name: 'textModel', path: textModel },
	{ type: 'rgbe', name: 'hdriMap', path: hdriMap },
	{
		type: 'texture',
		name: 'bg',
		path: new ImageSet({
			avif: bgMapAvif,
			webp: bgMapWebp,
			fallback: bgMap,
		}),
	},
	// {
	// 	type: 'cubeTexture',
	// 	name: 'envMap',
	// 	path: ['px', 'nx', 'py', 'ny', 'pz', 'nz'].map(name => (
	// 		require(`~/assets/logo/textures/cubemap/${name}.png`)
	// 	))
	// },
]

export default sources