import { LOAD_INITIAL_DATA, LOAD_SSR_INITIAL_DATA } from '../helpers/type.js'

const defaultState = {
	user_list: [],
	loadedSSR:false
}

export default function (state = defaultState, action){

	switch(action.type){

		case 'LOAD_INITIAL_DATA' : {
			let newState = {
				...state
			}
			newState.user_list = action.payload
			return newState
		}

		case 'LOAD_SSR_INITIAL_DATA': {
			let newState = {
				...state
			}
			newState.loadedSSR = true
			return newState
		}
		default: return state
	}
	return state
}