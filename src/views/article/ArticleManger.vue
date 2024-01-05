<template>
    <div>
    
        <el-card>
    
            <template #head>
    
                <div>
    
                    <span>
    
                        文章管理
    
                    </span>
    
                    <el-button type="primary">
    
                        添加文章
    
                    </el-button>
    
                </div>
</template>
        <div>
            <el-form inline :model="mangerInlneForm">
                <el-form-item label="文章分类:">
                    <el-select v-model="mangerInlneForm.categoryId">
                        <el-option plcaeholder="请选择" v-for="c in categorys" :key="c.id" :label="c.categoryName" :value="c.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发布状态:">
                    <el-select placeholder="请选择" v-model="mangerInlneForm.state">
                        <el-option label="已发布" value="已发布"></el-option>
                        <el-option label="草稿" value="草稿"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="categorySearch">
                        搜索
                    </el-button>
                    <el-button @click="categoryReset">
                        重置
                    </el-button>

                </el-form-item>
            </el-form>

            <el-table :data="mangerData">
                <el-table-column prop="title" label="文章标题"></el-table-column>
                <el-table-column prop="categoryId" label="分类"></el-table-column>
                <el-table-column prop="updateTime" label="发布时间"></el-table-column>
                <el-table-column prop="state" label="发布状态"></el-table-column>
                <el-table-column label="操作">
<template #default="{row}">
    <el-button :icon="Edit" type="primary" size="small" @click="categoryEdit(row)">
    
        编辑</el-button>
    
    <el-button :icon="Delete" type="danger" size="small" @click="categoryDelete(row)">删除
    
    </el-button>
</template>
                </el-table-column>
                <el-table-column>
                </el-table-column>

<template #empty>
    <span>暂无数据</span>
</template>
            </el-table>
            <el-col :offset="12">
                <el-pagination 
                @current-change="ArticleList()"
                @size-change="(num) => pagination.pageSize = num"
                v-model:current-page="pagination.currentPage" page-count="pagination.pageSize" layout="jumper,sizes, prev, pager, next" :total="100" />
            </el-col>

        </div>
    </el-card>

    <el-drawer v-model="drawer" title="添加文章" size="50%" direction="rtl">

        <el-form :model="categoryDrawer">
            <el-form-item label="文章标题">
                <el-input v-model="categoryDrawer.title"></el-input>
            </el-form-item>
            <el-form-item label="文章分类">
                <el-select v-model="categoryDrawer.categoryId">
                    <el-option plcaeholder="请选择" v-for="c in categorys" :key="c.id" :label="c.categoryName" :value="c.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章封面">
                 
                <el-upload 
                action="/api/freeimg/upload"
                name="file" 
                :headers="{ 'Authorization': token ? token : ''}"
                :on-success="uploadSuccess" class="avatar-uploader" :auto-upload="true" :show-file-list="false">
                    <img v-if="categoryDrawer.coverImg" :src="categoryDrawer.coverImg" alt="">
                    <el-icon v-else class="acatar-uploader-icon">
                        <Plus></Plus>
                    </el-icon>
                </el-upload>

            </el-form-item>
            <el-form-item label="文章内容">
                <div class="tinymce-box" ref="editorRef">
                    <Editor v-model="categoryDrawer.content" api-key="no-api-key" :init="{
                        plugins: 'lists link image table code help wordcount',
                        language: 'zh_CN',
                    }" />
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addManger(1)">发布</el-button>
                <el-button type="info" @click="addManger(0)">草稿</el-button>
            </el-form-item>
        </el-form>

    </el-drawer>
</div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { addArticleService, ArticleListService } from "@/api/article"
import Editor from '@tinymce/tinymce-vue'
import { ElMessage } from 'element-plus'

const pagination = ref({
    currentPage: 0,
    pageSize: 0,
    total: 1000
})


const mangerInlneForm = ref({
    categoryId: undefined,
    state: "",
})

const token = ref(localStorage.getItem('token'))

const ArticleList = () => {
    console.log(111);
    ArticleListService(pagination.value.currentPage, pagination.value.pageSize, )
}
onMounted(() => {
    ArticleList()
})
const mangerData = ref([])

const drawer = ref(true)

const categoryDrawer = ref({
    content:"",
    title: "",
    categoryId: 0,
    coverImg: "",

})
const addManger = async (state) => {
    await nextTick()

    const res = addArticleService(
        categoryDrawer.value.title,
        categoryDrawer.value.content,
        categoryDrawer.value.coverImg,
        state,
        categoryDrawer.value.categoryId
    )
    if (res.code === 0) {
        ElMessage.success(res.message)
    }else {
        ElMessage.error(res.message)

    }
}
const categorySearch = () => {
    console.log(pagination.value.pageSize);
    categoryReset()
}


const uploadSuccess = (res) => {
    console.log(res);
    if (res.code === 0 ) {
        categoryDrawer.value.coverImg = res.data.links.url
        console.log(categoryDrawer.value.coverImg);
    }
    // categoryDrawer.value.coverImg = ""
}

// const categoryId = ref("")
// const state = ref("")

const categoryReset = () => {
    state.value = ""
    categoryId.value = ""
}
const categorys = [{
        id: 0,
        categoryName: "人文",
    },
    {
        id: 1,
        categoryName: "军事",
    },
    {
        id: 2,
        categoryName: "时事",
    },
    {
        id: 3,
        categoryName: "没事",
    },
    {
        id: 4,
        categoryName: "旅游",
    },
    {
        id: 5,
        categoryName: "历史",
    }
]
</script>

<style lang="scss" scoped>

</style>
