import CForm from './CForm/index.vue';
import CCrud from './CCrud/index.vue';
import '../styles/element-variables.scss'

 
const components = [
	CForm,
	CCrud
]
const install = function(Vue) {
	components.forEach(component => {
		Vue.component(component.name, component)
	})
 
	if (typeof window !== 'undefined' && window.Vue) {
		install(window.Vue)
	}
}
export default install;