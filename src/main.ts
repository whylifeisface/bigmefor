import "./assets/main.css"

import { createApp } from "vue"
import { createPinia } from "pinia"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import App from "./App.vue"
// import VueTinyMCE from "@tinymce/tinymce-vue"

import router from "./router/index"
import { createPersistedState } from "pinia-persistedstate-plugin"
const app = createApp(App)
const persistedstate = createPersistedState()
const pinia = createPinia()
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
pinia.use(persistedstate)
app.use(ElementPlus)
// app.use(VueTinyMCE)
app.use(pinia)
app.use(router)

app.mount("#app")
