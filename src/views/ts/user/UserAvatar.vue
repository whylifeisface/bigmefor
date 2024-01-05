<template>
	<div>
		<el-card>
			<template #header>
				更换头像
			</template>


			<el-upload
			ref="uploadRef"
			action="/api/freeimg/upload"
			name="file" class="avatar-uploader"
			:headers="{ 'Authorization': token ? token : ''}"
			:show-file-list="false"
			:auto-upload="true"
			:on-success="uploadSuccess"
			>
				<img v-if="imgUrl" :src="imgUrl" class="avatar" alt="oi">

				<el-icon v-else class="acatar-uploader-icon">
                        <Plus></Plus>
                    </el-icon>
										
			</el-upload>
			<span style="height: 10px; margin-bottom: 15px;">只能上传jpg/png文件,且不超过500kb</span>
			<div style="margin-top: 10px;">
				<el-button type="primary" :icon="Plus" @click="uploadRef.$el.querySelector('input').click()">选择图片</el-button>
				<el-button type="success" :icon="Upload" @click="uploadAvatar">上传</el-button>
			</div>

		</el-card>


	</div>
</template>

<script setup lang="ts">
import { ref,onMounted, Ref } from 'vue'
import { Plus, Upload,} from '@element-plus/icons-vue'
import { updateAvatar } from '@/api/ts/user';
import { ElMessage } from 'element-plus';
import { userInfoStoreService } from '@/stores/userInfoStore';
const uploadRef = ref()
const token = ref(localStorage.getItem('token'))
const userInfoStore = userInfoStoreService()

onMounted(()=>{
	console.log(uploadRef.value.$el, "$el");

})
const imgUrl = ref('')

const uploadSuccess = (res: any) => {
    console.log(res);
    if (res.code === 0) {
			imgUrl.value = res.data.links.url
        console.log(imgUrl.value);
				userInfoStore.getInfo(true)

    }
}

const uploadAvatar = () => {
	console.log(1112);
	
	if (imgUrl.value.length != 0) {

		updateAvatar(imgUrl.value).then(res => {
			if(res.status == 0) {
				console.log("ok");
				ElMessage.success("更新成功")
				
			}
		})

	}
	
}

</script>

<style lang="scss" scoped>
.el-icon {
	width: 200px;
	height: 200px;
	border: 1px dashed #d9d9d9;

}
</style>