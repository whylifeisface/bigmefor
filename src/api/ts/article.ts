import request from "@/util/ts/request"

export const deleteArticleService = (id: number) => {
	
	return request.delete("/article?id=" + id)
}
export interface ArticleParams {
	id?: number,
	title: string,
	content: string,
	coverImg: string,
	state: number,
	categoryId: number
}

export const addArticleService = (ArticleParams: ArticleParams) => { 
	const { title, content, coverImg, state, categoryId } = ArticleParams
	return request.post("/article/add", { title, content, coverImg, state, categoryId })
}
export interface ArticleListParams {
	pageNum: number,
	pageSize: number,
	state?: number,
	categoryId?: number
}
export const ArticleListService = (articleList: ArticleListParams) => { 

	if (articleList.categoryId == undefined) {
		request.get(`/article/list?pageNum=${articleList.pageNum}&pageSize=${articleList.pageSize}`)
	} else {
		return request.get(`/article/list?pageNum=${articleList.pageNum}&pageSize=${articleList.pageSize}&state=${articleList.state}&categoryId=${articleList.categoryId}`)
	}

}