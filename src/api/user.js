import request from "@/util/request"




export const registerUser = (registerData) => {
	const requestParam = new URLSearchParams()
	for (const [key, value] of registerData) { 
		// 去除空格
		requestParam.append(key,value)
	}

	return request.post('/user/register', requestParam)
}

export const LoginUser = (loginData) => {
	console.log(loginData)
	const requestParam = new URLSearchParams()
	for (const [key, value] of loginData) {
		requestParam.append(key, value)
	}
	console.log(requestParam)
	return request.post('/user/login', requestParam)

}

export const getUserInfo = () => {

	return request.get('/user/userInfo');

}
export const rePassword = (map) => {

	return request.get('/user/updatePwd',map);
}


export const updateUserInfo = (id, username, nickname, email) => {
	return request.post('/user/update', { id, username, nickname, email });
}
