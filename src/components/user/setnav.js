
export const setnav = (index)=>{
    const navs = document.getElementsByClassName("userpage")
    for(let x = 0 ; x < navs.length ; x++){
        navs[x].classList.remove("activenav")
    }
    navs[index].classList.add("activenav")
}