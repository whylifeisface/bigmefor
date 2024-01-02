
import request from "@/util/ts/request"
import moment from "moment"


export const articleCategoryService = () => {

	return request.get(`/category/list`)
}

export const deleteCategoryService = (id: number) => {

	return request.delete(`/category/delete?id=${id}`)
}
interface ICategory {
	categoryName: string,
	categoryAlias: string,
	// createUser: number,
	// createTime: string,
	// updateUser: number,
	updateTime: string,
	id: number
}
export const addCategoryService = (iCategory: ICategory) => {

	const date = new Date();
	const formatDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
	const { categoryName, categoryAlias, id } = iCategory
 return	request.post(`/category/add`,  {
		categoryName, categoryAlias,
		createUser: id,
		createTime: formatDate,
		updateTime: formatDate
	})
}

export const putCategoryService = (iCategory: ICategory) => {
	// new Date();
	const { categoryName, categoryAlias, id } = iCategory;

	const formatDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
	// let json = JSON.parse();;
	return	request.put(`/category/update`,{id,categoryAlias,categoryName, updateTime:formatDate})
 }