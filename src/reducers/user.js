
const initialState = {
    loginfo: localStorage.getItem("loguser") || 'guest',
    token: localStorage.getItem('token') || '',
}
const userReducer = (state = initialState , action)=>{
    switch(action.type){

        default: 
            return state    
    }
}

export default userReducer