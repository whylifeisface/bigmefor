import { defineStore } from "pinia"
import { ref } from "vue"
import  { UserInfoType } from "@/api/ts/user"
export const userInfoStoreService = defineStore("userinfo", () => {


	const info = ref<UserInfoType>({
		id: 0,
		username: "",
		avatar: "",
		email: "",
		nickname: "",
		create_time: "",
		update_time: "",
	})

	const setInfo = (data: UserInfoType) => {
		console.log(data);

		info.value = data

	}

	const removeInfo = () => {
		info.value = {
			id: 0,
			username: "",
			avatar: "",
			email: "",
			nickname: "",
			create_time: "",
			update_time: "",
		}
	}

	return { info, setInfo, removeInfo }
},
//  { persist: true }
 )