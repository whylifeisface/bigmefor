import request from "@/util/request"

export const deleteArticleService = (id) => {
	
	return request.delete("/article?id=" + id)
}

export const addArticleService = (title, content, coverImg, state, categoryId) => { 

	return request.post("/article/add", { title, content, coverImg, state, categoryId })
}

export const ArticleListService = (pageNum, pageSize,state,categoryId) => { 

	if (categoryId == undefined) {
	
		request.get(`/article/list?pageNum=${pageNum}&pageSize=${pageSize}`)
	} else {
		return request.get(`/article/list?pageNum=${pageNum}&pageSize=${pageSize}&state=${state}&categoryId=${categoryId}`)
	}

}