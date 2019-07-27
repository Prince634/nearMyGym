import Axios from 'axios'

export const API_GET = (url)=> {

	return new Promise((resolve, reject)=> {
		try{
			return Axios.get(url).then((response)=>{
				resolve(response.data)
			})
		}catch(e){
			console.log('error at api ', e)
		}
	})
}

export const API_POST = (url, postData)=> {

	return new Promise((resolve, reject)=> {
		return Axios.post(url, postData).then((response)=>{
			resolve(response.data)
		})
	})
}