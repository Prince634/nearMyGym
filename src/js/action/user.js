import { LOAD_INITIAL_DATA, LOAD_SSR_INITIAL_DATA } from '../helpers/type.js'
import Axios from 'axios'

export const getInitialData = () => (dispatch) => {
	return Axios.get('https://react-ssr-api.herokuapp.com/users').then((resp)=>{
		dispatch({
			type: LOAD_INITIAL_DATA,
			payload: resp.data
		})	
	})
	
} 

export const getServerInitialData = () => (dispatch) => {
	dispatch({
			type: LOAD_SSR_INITIAL_DATA
		})
	
}