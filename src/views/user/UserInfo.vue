<template>
	<div>

		<el-card>
			<template #header>
				<h1>
					基本资料
				</h1>
			</template>
			
					<el-form ref="UserInfoForm" :model="userInfoStore.info" :rules="rules">
							<el-row>
								<el-col :span="12">
									<el-form-item label="登录名称">
							<el-input v-model="userInfoStore.info.username" ></el-input>
						</el-form-item>
						<el-form-item label="用户昵称" prop="nickname">
							<el-input v-model="userInfoStore.info.nickname" ></el-input>
						</el-form-item>
						<el-form-item label="用户邮箱" prop="email">
							<el-input v-model="userInfoStore.info.email" ></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submit">提交修改</el-button>
						</el-form-item>
								</el-col>
							</el-row>
					</el-form>
		</el-card>

	</div>
</template>

<script setup>
import { userInfoStoreService } from "@/stores/userInfoStore";
import { updateUserInfo, getUserInfo } from "@/api/user";
  import { ref,onMounted } from 'vue'
	const userInfoStore = userInfoStoreService()
const rules = {
	'nickname': [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
	'email': [{ required: true, message: '请输入用户邮箱', trigger: 'blur'}],
}


onMounted(() => {
		if (userInfoStore.info.value == undefined) {
			getUserInfo().then((res) => {
                    if(res.code === 0)
                        userInfoStore.setInfo(res.data)
                  })
		}
})

console.log(userInfoStore.info.value)

const UserInfoForm = ref(null)
const submit = async () => {
	UserInfoForm.value.validate(async (valid) => {
		if (valid) {
			// 验证通过
			console.log('验证通过');
			const id = userInfoStore.info.id
			const userInfo = userInfoStore.info
			const result = await updateUserInfo(id,userInfo.username, userInfo.nickname, userInfo.email)
			if (result.code === 0) {
				getUserInfo().then((res) => {
                    if(res.code === 0)
                        userInfoStore.setInfo(res.data)
					console.log('修改成功');

                  })
					// userInfoStore.setinfo(result.data)
			}
		}
		else {
			console.log('验证失败');
		}


//  let result = await updateUserInfo(id,userInfoStore.username, userInfoStore.nickname, userInfoStore.email)
//  if (result.code == 200) {
// 	userInfoStore.info;
// 		userInfoStore.info.username = res.data.username;
// 		userInfoStore.info.nickname = res.data.nickname;
// 		userInfoStore.info.email = res.data.email;
//  }
//  nextTick()

// 		console.log(result)
	})
}

</script>

<style lang="scss" scoped>

</style>