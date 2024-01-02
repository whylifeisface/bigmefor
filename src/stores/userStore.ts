import { defineStore } from "pinia"
import { ref } from "vue"
export const userStoreService = defineStore("userStore", () => {
    const register = ref(false)
    const changeStatus =  (value = true) => {
        if (value == undefined)
        register.value = !register.value
        else {
            register.value = value
            console.log(value ," value")
        }

    }

    return { register, changeStatus }
}, 
// { persist: true }
)