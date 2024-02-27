import loadGmapApi from './manager/initializer'
import promiseLazyFactory from './factories/promise-lazy'

import MapElementMixin from './mixins/map-element'
import MapElementFactory from './factories/map-element'
import MountableMixin from './mixins/mountable'

// HACK: Cluster should be loaded conditionally
// However in the web version, it's not possible to write
// `import 'vue2-google-maps/src/components/cluster'`, so we need to
// import it anyway (but we don't have to register it)
// Therefore we use babel-plugin-transform-inline-environment-variables to
// set BUILD_DEV to truthy / falsy
const Cluster = (process.env.BUILD_DEV === '1')
  ? undefined
  : ((s) => s.default || s)(require('./components/cluster'))

let GmapApi = null

// export everything
export {
  loadGmapApi, Cluster,
  MapElementMixin, MapElementFactory,
  MountableMixin
}

export function install (Vue, options) {
  // Set defaults
  options = {
    installComponents: true,
    autobindAllEvents: false,
    ...options
  }

  // Update the global `GmapApi`. This will allow
  // components to use the `google` global reactively
  // via:
  //   import {gmapApi} from 'vue2-google-maps'
  //   export default {  computed: { google: gmapApi }  }
  GmapApi = new Vue({ data: { gmapApi: null } })

  const defaultResizeBus = new Vue()

  // Use a lazy to only load the API when
  // a VGM component is loaded
  const promiseLazyCreator = promiseLazyFactory(loadGmapApi, GmapApi)
  const gmapApiPromiseLazy = promiseLazyCreator(options)

  Vue.mixin({
    created () {
      this.$gmapDefaultResizeBus = defaultResizeBus
      this.$gmapOptions = options
      this.$gmapApiPromiseLazy = gmapApiPromiseLazy
    }
  })

  Vue.$gmapDefaultResizeBus = defaultResizeBus
  Vue.$gmapApiPromiseLazy = gmapApiPromiseLazy

  if (options.installComponents) {
    Vue.component('GmapMap', require('./components/map.vue'))
    Vue.component('GmapMarker', require('./components/marker'))
    Vue.component('GmapInfoWindow', require('./components/info-window.vue'))
    Vue.component('GmapKmlLayer', require('./components/kml-layer'))
    Vue.component('GmapPolyline', require('./components/polyline'))
    Vue.component('GmapPolygon', require('./components/polygon'))
    Vue.component('GmapCircle', require('./components/circle'))
    Vue.component('GmapRectangle', require('./components/rectangle'))
    Vue.component('GmapAutocomplete', require('./components/autocomplete.vue'))
    Vue.component('GmapPlaceInput', require('./components/place-input.vue'))
    Vue.component('GmapStreetViewPanorama', require('./components/street-view-panorama.vue'))
  }
}

export function gmapApi () {
  return GmapApi.gmapApi && window.google
}
