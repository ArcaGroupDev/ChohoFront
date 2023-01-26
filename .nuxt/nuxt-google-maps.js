import Vue from 'vue';
import GMap from "\u002Fhome\u002Fchoho\u002FProyectosChoho\u002FArcaGit\u002FChohoFront\u002Fnode_modules\u002Fnuxt-gmaps\u002Fcomponents\u002FGMap.vue";
import GMapMarker from "\u002Fhome\u002Fchoho\u002FProyectosChoho\u002FArcaGit\u002FChohoFront\u002Fnode_modules\u002Fnuxt-gmaps\u002Fcomponents\u002FGMapMarker.vue";
import GMapCircle from "\u002Fhome\u002Fchoho\u002FProyectosChoho\u002FArcaGit\u002FChohoFront\u002Fnode_modules\u002Fnuxt-gmaps\u002Fcomponents\u002FGMapCircle.vue";
import GMapInfoWindow from "\u002Fhome\u002Fchoho\u002FProyectosChoho\u002FArcaGit\u002FChohoFront\u002Fnode_modules\u002Fnuxt-gmaps\u002Fcomponents\u002FGMapInfoWindow.vue";
export default(context, inject) =>{
  Vue.component('GMap', GMap);
  Vue.component('GMapMarker', GMapMarker);
  Vue.component('GMapCircle', GMapCircle);
  Vue.component('GMapInfoWindow', GMapInfoWindow);
  inject('GMaps', {apiKey: "AIzaSyA3JK3zmYtyFihrt6RZSI6FVbo4FebUOp0", loaded: false, libraries: undefined})
}