<template>
    <div>
    
    
    
        <el-card>
    
    
    
            <template #header>
    
        
    
                    <div class="card">
    
        
    
                        <span>
    
        
    
                            文章分类
    
        
    
                        </span>
    
        
    
                        <div class="extra">
    
        
    
                            <el-button type="primary" @click="dialogVisible = true">
    
        
    
                                添加分类
    
        
    
                            </el-button>
    
        
    
                        </div>
    
        
    
                    </div>
</template>
        <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="categoryName" label="分类名称"></el-table-column>
        <el-table-column prop="categoryAlias" label="分类别名"></el-table-column>
        <el-table-column label="操作">
<template #default="{row}">
    <el-button type="primary" size="mini" @click="edit(row)">
    
    
    
        编辑</el-button>
    
    
    
    <el-button type="danger" size="mini" @click="del(row)">删除</el-button>
</template>
        </el-table-column>
<template #empty>
    <div>
    
    
    
        <el-empty description="没有数据" />
    
    
    
    </div>
</template>
    </el-table>


    </el-card>

   


    <!-- 表格 -->

    <!-- 添加的dialog -->
    <el-dialog :title=" status == 0 ? '添加分类' : '修改分类'" v-model="dialogVisible" width="30%" @close="closeDialog">
        <el-form :model="form" ref="formRef" label-width="100px">
            <el-form-item label="分类名称" prop="categoryName">
                <el-input v-model="form.categoryName"></el-input>
            </el-form-item>
            <el-form-item label="分类别名" prop="categoryAlias">
                <el-input v-model="form.categoryAlias"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="btn" type="info" @click="ensure">确认</el-button>
                <el-button class="btn" type="danger" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { articleCategoryService, addCategoryService, putCategoryService, deleteCategoryService } from '@/api/category'
import { userInfoStoreService } from '@/stores/userInfoStore'



const userInfoStore = userInfoStoreService()

const dialogVisible = ref(true);
onMounted(() => {
    articleCategoryList()

})

const closeDialog = () => {
    form.value = {
        id: "",
        categoryName: "",
        categoryAlias: "",
    }
}

// const uploadSuccess = () => {

// }

const cancel = () => {
    dialogVisible.value = false
}
import { ElMessage } from 'element-plus'
const ensure = async () => {
    if (status.value == 0) {
        // 添加
        let result = await addCategoryService(form.value.categoryName, form.value.categoryAlias, userInfoStore.info.id);
        ElMessage.success(result.message)
        articleCategoryList()
        dialogVisible.value = false;
    } else {
        let result = await putCategoryService(form.value.id, form.value.categoryName, form.value.categoryAlias);
        ElMessage.success(result.message)
        articleCategoryList()
        dialogVisible.value = false;
    }

}
const status = ref(0)

const form = ref({
    id: 999,
    categoryName: "",
    categoryAlias: "",
})
const articleCategoryList = () => {

    articleCategoryService().then((res) => {
        if (res.code === 0) {
            tableData.value = res.data
            console.log(res.data);
            console.log(tableData.value);
        }
    })
}


const getTitle = () => {
    if (status.value == 0) {
        status.value = 1
    } else {
        status.value = 0
    }
}
const tableData = ref([])

const del = (row) => {
    deleteCategoryService(row.id).then((res) => {
        if (res.code === 0) {
            // ElMessage.success(res.message)
            ElMessage.confirm(res.message)
            articleCategoryList()
        } else {
            ElMessage.info("出错啦")
        }
    })
    articleCategoryList()

}

const edit = (row) => {
    dialogVisible.value = true;
    getTitle()
    Object.assign(form.value, row)


}
</script>

<style lang="scss" scoped>
.avatar-uploader {
    width: 90px;
    height: 90px;
    border: 1px solid #d9d9d9;
    display: flex;
    justify-content: center;
}

.card {
    display: flex;
    justify-content: space-between;
    .extra {}
}
</style>
