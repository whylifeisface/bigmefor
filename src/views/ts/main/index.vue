<template>
<div class="main">

    <el-container class="layout_container">
        <el-aside class="aside" width="200px">
            <div class="bg"></div>
            <el-menu router active-text-color="#ff04b" background-color="#232323" text-color="#fff">
                <el-menu-item index="/article/category"> <i></i>文章分类 </el-menu-item>
                <el-menu-item index="/article/manger"> 文章管理 </el-menu-item>

                <el-submenu>
                    <el-submenu-title>个人中心 </el-submenu-title>
                    <el-menu-item index="/user/info"> 基本资料 </el-menu-item>
                    <el-menu-item index="/user/avatar"> 更换头像 </el-menu-item>
                    <el-menu-item index="/user/resetpassword"> 重置密码 </el-menu-item>

                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header style="color: black;">
                <el-row>
                    <el-col :span="4">
                        当前用户: <bold> {{ userInfoStore.info.nickname }}</bold>
                    </el-col>
                    <el-col :offset="15" :span="4">
                        <el-icon type="User"></el-icon>
                        <el-dropdown placement="bottom-end" @command="handleCommand">
                            111
                            <span>
                                <el-avatar :src=" userInfoStore.info.userPic?userInfoStore.info.userPic:''"></el-avatar>
                                <el-icon>
                                    <CaretBootom></CaretBootom>
                                </el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item command="info" :icon="User">基本资料</el-dropdown-item>
                                    <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
                                    <el-dropdown-item command="resetPassword" :icon="EditPen">重置密码</el-dropdown-item>
                                    <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </el-col>
                </el-row>
            </el-header>
            <el-main style="color: black;">
                <div>
                    <router-view></router-view>
                    内容展示区
                </div>
            </el-main>
            <el-footer>
                <!-- 底部 -->
                bigme @2023 create by me
                <br>
                伟大无需多言
            </el-footer>
        </el-container>
    </el-container>
</div>
</template>

<script setup lang="ts">
import { User, Crop, EditPen, SwitchButton } from '@element-plus/icons-vue'
import { userInfoStoreService } from "../../../stores/userInfoStore"
import {useRouter} from "vue-router"
import {ElMessageBox , ElMessage} from "element-plus"
const userInfoStore = userInfoStoreService()
// const getUser = async () => {
//     userInfoStore.setInfo(result.data)
// }
const router = useRouter()
const handleCommand = (command) => {
    //判断指令
if(command === "logout"){
    ElMessageBox
    .confirm('你确认要退出吗','温馨提示',{confirmBUttonText: '确认', cancelButtonText: '取消',type: 'warning'})
    .then(async () => {
        //退出登录
    //清空pinia中的token及其个人信息
    
    localStorage.removeItem("token");
    userInfoStore.removeInfo();

    //跳转到登录页面

    router.push({
        path: '/login'
    })


    })
    .catch(() => {
        ElMessage({type: 'info', message: '取消退出'})
    })
}else {
    router.push({ path: "/user/" + command })
}
}
</script>

<style lang="scss" scoped>
.main {
    width: 100vw;
    height: 100vh;

    .layout_container {
        .bg {
            height: 120px;
            background: url("../../assets/logo.png") no-repeat center / 120px auto #232323;
        }

        height: 100%;

    }

    .aside {
        ul {
            height: 100%;
        }
    }
}
</style>
