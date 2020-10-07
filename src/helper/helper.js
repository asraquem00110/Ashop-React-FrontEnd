export const roundToDecimal = (num,decimalplace)=> {   
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?!=\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    let dec =  +(Math.round(num + `e+${decimalplace}`)  + `e-${decimalplace}`);

    let finddecimal = /\./
    let test = finddecimal.test(dec)
    return test ? numberWithCommas(dec) : `${numberWithCommas(dec)}.00`

}

const MonthArray = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

export const formatBdayDate = (Bday)=>{
    if(Bday == null) return ""
    var Bdate = new Date(Bday)
    return `${MonthArray[Bdate.getMonth()]} ${Bdate.getDate()}, ${Bdate.getFullYear()}`
} 