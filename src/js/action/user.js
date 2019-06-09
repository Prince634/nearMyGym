import { LOAD_INITIAL_DATA } from '../helpers/type.js'
import Axios from 'axios'

export const getInitialData = () => (dispatch) => {
	return Axios.get('https://react-ssr-api.herokuapp.com/users').then((resp)=>{
		dispatch({
			type: LOAD_INITIAL_DATA,
			payload: resp.data
		})	
	})
	
} 
