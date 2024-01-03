<script setup lang="ts">

import {ref, watch} from 'vue'
// import { registerUser } from '@/api/user'
import LoginIndex from "@/components/login/LoginIndex.vue";
import RegisterIndex from "@/components/login/RegisterIndex.vue";
// import { useRouter } from 'vue-router'
import  { userStoreService } from '@/stores/userStore'

const userStore = userStoreService()


const url = ref(window.location.href.split('/')[3])

//未销毁TODO 需要优化
watch(url, (newValue) =>{
  newValue === "register"? userStore.changeStatus(false) : userStore.changeStatus(true)
},{
  immediate: true
})

</script>

<template>
<div style="width:100vw;">

    <el-row class="login_page">
        <el-col :span="12" class="bg">

        </el-col>
        <el-col :span="6" :offset="3" class="form">
            <div>
              <component :is="userStore.register ? LoginIndex : RegisterIndex"></component>

            </div>
        </el-col>
    </el-row>

</div>
</template>

<style lang="scss" scoped>
.login_page {
    width: 100%;
    height: 100vh;

    .bg {
        background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
            url('@/assets/login_bg.jpg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }

    .form {
        // 垂直居中
        display: flex;
        align-items: center;
    }
}
</style>
