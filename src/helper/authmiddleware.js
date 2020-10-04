

export const authmiddleware = (props)=>{
    // props.history.push('/gg')
    // console.log(props)
    let user = localStorage.getItem("loguser")
    if(user === "guest" || user === null){
        return props.history.push("./")
    }
}