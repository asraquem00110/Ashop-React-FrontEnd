

export const RedirectIfUnauthenticated = (e) =>{
    if(e.response.status === 401) {
        window.alert("You need to Relogin")
        localStorage.removeItem('loguser')
        window.location.href = "/"
    }
   
}