import { defineStore } from "pinia"
import { ref } from "vue"
export const mangerStoreService = defineStore("mangerStore", () => {

	const content = ref("")
	const clearContent = () => {

		content.value = ""
	}

	return { content, clearContent }
}, { persist: true })