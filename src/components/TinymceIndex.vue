<template>
	<div class="tinymce-box">
    <Editor
      ref="editorRef"
      api-key="no-api-key"
      :init="{
        plugins: 'lists link image table code help wordcount',
        language: 'zh_CN',
      }"
    />
	</div>
</template>

<script setup>
 
import Editor from '@tinymce/tinymce-vue'
const editorRef = ref()

// import { mangerStoreService } from "@/stores/mangerStore"
// import { ref,onMounted } from 'vue'
// const mangerStore = mangerStoreService()
// // console.log(editorRef.value.$el);
// onMounted(() => {
//   console.log(editorRef.value.$el);
// })

</script>

<style lang="scss" scoped>

.tinymce-box{
	width: 100%;
}
</style>