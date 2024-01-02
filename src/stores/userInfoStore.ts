import { defineStore } from "pinia"
import { ref } from "vue"
export const userInfoStoreService = defineStore("userinfo", () => {


	const info = ref({})

	const setInfo = (data: any) => {
		console.log(data);

		info.value = data

	}

	const removeInfo = () => {
		info.value = {}
	}

	return { info, setInfo, removeInfo }
}, { persist: true })