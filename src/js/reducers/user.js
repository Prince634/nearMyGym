import { LOAD_INITIAL_DATA } from '../helpers/type.js'

const defaultState = {
	user_list: []
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
		default: return state
	}
	return state
}