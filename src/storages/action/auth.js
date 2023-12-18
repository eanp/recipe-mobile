import axios from "axios";

const dataDummy = {
	"email": "member@recipe.com",
	"password": "test1234"
}

const url = "https://tiny-toad-teddy.cyclic.app"

const headers = {
	headers : {
		"Content-Type" : "application/x-www-form-urlencoded"
	}
}

export const login = () => async (dispatch,getState) => {
	try{
		dispatch({type:"LOGIN_REQUEST"})
		const result =  await axios.post(url+"/auth/login",dataDummy,headers)
		console.log("result")
		console.log(result)

		result && dispatch({type:"LOGIN_SUCCESS",payload:result.data.data})
	} catch(err){
		console.log("err => ",err.message)
		if(err?.response?.data?.message){
			dispatch({type:"LOGIN_ERROR",payload:err.response.data.message})
		} else {
			dispatch({type:"LOGIN_ERROR",payload:err.message})
		}
	}
}

export const logout = () => async (dispatch,getState) => {
		console.log("logout")
		dispatch({type:"LOGOUT"})
}