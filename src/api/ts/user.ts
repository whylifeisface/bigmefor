import request from "@/util/ts/request"
import { AxiosRequestConfig } from "axios"

export interface RegisterData {
	username: string,
	password: string,
	repassword :string
}

export const registerUser = (registerData: Map<keyof RegisterData, string>) => {
	const requestParam = new URLSearchParams()
	// 遍历对象
	// let key: keyof RegisterData
	for (const [key,value] of registerData) { 
		// 去除空格
		requestParam.append(key,value)
	}

	return request.post('/user/register', requestParam)
}
export type loginData = Omit<RegisterData, "repassword">
export const LoginUser = (loginData: Map<keyof loginData, string>) => {
	console.log(loginData)
	const requestParam = new URLSearchParams()
	// let key: keyof loginData 
	for (const [key, value] of loginData) {
		requestParam.append(key, value)
	}
	// console.log(requestParam)
	return request.post('/user/login', requestParam)

}

export const getUserInfo = () => {

	return request.get('/user/userInfo');

}
export const rePassword = (map: Map<string, string>) => {
		// 强转 没办法
	return request.get('/user/updatePwd', map as AxiosRequestConfig<any>);
}

export interface UserInfoType {
	id: number,
	username: string,
	nickname: string,
	email: string,
	avatar: string,
	create_time?: string,
	update_time?: string
}
// id, username, nickname, email
export const updateUserInfo = (userInfo: UserInfoType) => {
	const { id, username, nickname, email } = userInfo;
	return request.post('/user/update', { id, username, nickname, email });
}
