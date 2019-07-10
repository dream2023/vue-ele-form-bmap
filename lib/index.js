import Bmap from './Bmap'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(Bmap.name, Bmap)
}

export default Bmap
