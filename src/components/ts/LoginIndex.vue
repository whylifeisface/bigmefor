<script setup lang="ts">
import { useRouter } from 'vue-router'
import { LoginUser, getUserInfo }  from '@/api/ts/user'
import type { loginData } from '@/api/ts/user'
import { ElMessage } from "element-plus";

import  { userStoreService } from '@/stores/userStore'
import  { userInfoStoreService } from '@/stores/userInfoStore'

const userStore = userStoreService()
const userInfoStore = userInfoStoreService()
import { ref } from 'vue'

const form = ref({
    username: '',
    password: '',
})
const formRef = ref()
const rule = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 15, message: '长度在 3 到 10 个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 15, message: '长度在 3 到 10 个字符', trigger: 'blur' }
    ],
}

const router = useRouter()
const toRigister = () => {
  userStore.changeStatus()
}
const onSubmit = () => {
    formRef.value.validate().then(() => {
        // console.log(form)
        const { username, password } = form.value

        let map = new Map<keyof loginData, string>();
        map.set('username', username)
        map.set('password', password)

    // console.log(map,"222")
        LoginUser(map)
            .then((res) => {
                console.log(res)
                if (res.status === 0) {
                    localStorage.setItem('token', res.data)

                  ElMessage.success('登录成功')
                  router.push('/')

                }
            })
            
    })
}
// const clearRegisterData = () => {
//     form.value.username = ''
//     form.value.password = ''
// }
import { Lock, User } from '@element-plus/icons-vue'
</script>

<template>
<div>
    <div>
        <h1>登录</h1>
        <el-form size="large" :model="form" ref="formRef" :rules="rule">
            <el-form-item label="" prop="username">
                <el-input :prefix-icon="User" v-model="form.username" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="" prop="password">
                <el-input type="password" :prefix-icon="Lock" v-model="form.password" placeholder="请输入密码" />
            </el-form-item>
            <div class="el-form-_">
              <el-checkbox>记住我</el-checkbox>
              <el-link type="primary"  :underline="false">忘记密码?</el-link>
            </div>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
            <el-form-item>
                <el-link type="info" underline="false" @click="toRigister">
                    注册
                </el-link>
            </el-form-item>
        </el-form>

    </div>

</div>
</template>

<style lang="scss" scoped>
.el-form-_ {
  display: flex;
  justify-content: space-between;
}
</style>
