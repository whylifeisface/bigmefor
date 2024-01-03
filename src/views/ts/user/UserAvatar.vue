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

			<el-button type="primary" :icon="Plus" @click="uploadRef.$el.querySelector('input').click()">选择图片</el-button>
				<el-button type="success" :icon="Upload">上传</el-button>
		</el-card>


	</div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue'
import { Plus, Upload,} from '@element-plus/icons-vue'
const uploadRef = ref()
const token = ref(localStorage.getItem('token'))

onMounted(()=>{
	console.log(uploadRef.value.$el, "$el");

})
const imgUrl = ref('')

const uploadSuccess = (res: any) => {
    console.log(res);
    if (res.code === 0) {
			imgUrl.value = res.data.links.url
        console.log(imgUrl.value);
    }
}


</script>

<style lang="scss" scoped>

</style>