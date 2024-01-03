<template>
	<div>
<!-- 密码 -->

		<el-card>
			<template #header>
				<span>修改密码</span>
			</template>
			<el-form :model="passwordForm">
				<el-col :span="12">
				<el-form-item label="输入旧密码">
					<el-input  show-password v-model="passwordForm.oldPassword" placeholder="输入旧密码"></el-input>
				</el-form-item>
				<el-form-item label="输入新密码">
					<el-input v-model="passwordForm.password" show-password  placeholder="输入新密码"></el-input>
				</el-form-item>
				<el-form-item label="输入新密码">
					<el-input v-model="passwordForm.rePassword" show-password placeholder="重新输入新密码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="changePassword">提交</el-button>
				</el-form-item>
				</el-col>
			</el-form>

		</el-card>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { rePassword } from "../../../api/ts/user.js"
import {useRouter} from 'vue-router'
import { ElMessage } from 'element-plus';
const passwordForm = ref({
	oldPassword: '',
	password: '',
	rePassword: '',
})

const router = useRouter()
const changePassword = () => {
	console.log(passwordForm.value)

	const map =	new Map();

	map.set('old_pwd',passwordForm.value.oldPassword)
	map.set('new_pwd',passwordForm.value.password)
	map.set('re_pwd',passwordForm.value.rePassword)
	
	rePassword(map).then((res) => {
			if (res.status === 0) {
				router.push('/login')
				ElMessage.success(res.data)
			}else {
				ElMessage.error(res.data)
			}
	})


}
</script>

<style lang="scss" scoped>

</style>