<template>
	<div>
		<el-card>
			<template #header>
				更换头像
			</template>

			<el-upload
			ref="uploadRef"
			:show-file-list="false"
			:auto-upload="true"
			action="/api/upload"
			>
				<!-- <el-avatar :src=""></el-avatar> -->
				<!-- <el-avatar shape="square" :size="100" :src="user.avatar"></el-avatar -->
				<img v-if="imgUrl" :src="imgUrl" class="avatar">
				<img v-else src="https://cube.elemecdn.com/0/88/03b0d3958">
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
onMounted(()=>{
	console.log(uploadRef.value.$el, "$el");

})
const imgUrl = ref('')


</script>

<style lang="scss" scoped>

</style>