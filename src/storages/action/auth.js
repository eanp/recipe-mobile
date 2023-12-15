import axios from "axios";

const dataDummy = {
	"email": "member@recipe.com",
	"password": "test1234"
}

const url = "https://tiny-toad-teddy.cyclic.app"

export const login = () => async (dispatch,getState) => {
	try{
		dispatch({type:"LOGIN_REQUEST"})
		const result = axios.post(url+"/auth/login",dataDummy)
		console.log(result)

		result && dispatch({type:"LOGIN_SUCCESS",payload:result})
	} catch(err){
		console.log("err => ",err.messages)
		console.log(err)
		dispatch({type:"LOGIN_ERROR",type:err.messages})
	}
}

export const logout = () => async (dispatch,getState) => {
	return(dispatch,getState)=> {
		dispatch({type:"LOGOUT"})
	}
}