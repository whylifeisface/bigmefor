<template>
<div>
    <h1>注册</h1>
    <el-form size="large" :model="form" ref="formRef" :rules="rule">
        <el-form-item label="请输入用户名" prop="username">
            <el-input :prefix-icon="User" v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="请输入密码" prop="password">
            <el-input type="password" :prefix-icon="Lock" v-model="form.password" placeholder="请输入密码" />
        </el-form-item>

        <el-form-item label="再次输入密码" prop="rePassword">
            <el-input type="password" :prefix-icon="Lock" v-model="form.rePassword" placeholder="请再次输入密码" />
        </el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form>

    <div>
        //TODO 返回箭头
        <el-link underline="false">返回</el-link>
    </div>
</div>
</template>

<script setup lang="ts">
import { registerUser, type RegisterData } from '@/api/ts/user'
import { ref } from 'vue'
import { Lock, User } from '@element-plus/icons-vue'


const form = ref({
    username: '',
    password: '',
    rePassword: ''
})

console.log(form.value.username, "oi");

const rule = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 15, message: '长度在 3 到 10 个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 15, message: '长度在 3 到 10 个字符', trigger: 'blur' }
    ],
    rePassword: [{
        validator: (rule, value, callback) => {
            if (value !== form.value.password) {
                callback(new Error('两次密码输入不一致'))
            } else if (value == '' || value == ' ') {
                callback(new Error('密码不能为空'))
            } else {
                callback()
            }
        },
        trigger: 'blur'
    }]
}

const register = async (map: Map<keyof RegisterData, string>) => {
    // console.log(map, "map");
    let result = await registerUser(map);
    if (result.status == 200) {
        console.log(111);
               //         // 注册成功
            //         // 跳转到登录页面
            //         // 跳转之前，先清空本地存储
        localStorage.removeItem('token')
                    localStorage.removeItem('user')
                    localStorage.removeItem('userId')
    }
}

const formRef = ref()
const onSubmit = () => {
    formRef.value.validate().then(() => {
        const { username, password, rePassword } = form.value
        let map = new Map();
        map.set('username', username)
        map.set('password', password)
        map.set('rePassword', rePassword)
        register(map)
            // .then((res) => {
            //     console.log(res)
            //     if (res.status === 200) {
            //         // 注册成功
            //         // 跳转到登录页面
            //         // 跳转之前，先清空本地存储
            //         localStorage.removeItem('token')
            //         localStorage.removeItem('user')
            //         localStorage.removeItem('userId')
            //     }
            // })
    })
}
</script>

<style lang="scss" scoped>

</style>
