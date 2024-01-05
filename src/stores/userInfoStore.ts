import { defineStore } from "pinia"
import { ref } from "vue"
import  { getUserInfo, type UserInfoType } from "@/api/ts/user"
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
	function isEmpty(){
		//判断info是否为空
		return info.value.id === 0 && info.value.nickname == ""
	}
	const getInfo = (refresh: boolean = false) => {

		if (isEmpty() || refresh) {
			            getUserInfo().then((res) => {
                    if(res.status === 0)
                        setInfo(res.data)
                  })
		}

		return info.value
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

	return { info, setInfo, removeInfo, getInfo }
},
//  { persist: true }
 )