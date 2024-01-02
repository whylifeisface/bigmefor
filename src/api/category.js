
import request from "@/util/request"
import moment from "moment"


export const articleCategoryService = () => {

	return request.get(`/category/list`)
}

export const deleteCategoryService = (id) => {

	return request.delete(`/category/delete?id=${id}`)
}
export const addCategoryService = (categoryName,categoryAlias, id) => {

	const date = new Date();
	const formatDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
 return	request.post(`/category/add`,  {
		categoryName, categoryAlias,
		createUser: id,
		createTime: formatDate,
		updateTime: formatDate
	})
}

export const putCategoryService = (id,categoryName,categoryAlias) => {
	// new Date();
	const date = new Date();
	const formatDate = moment(date).format("YYYY-MM-DD HH:mm:ss")
	// let json = JSON.parse();
	return	request.put(`/category/update`,{id,categoryAlias,categoryName, updateTime:formatDate})
 }