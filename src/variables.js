export const DATE_TEXT = {
    MONTHS: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ],
    WEEKDAYS:[
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ],
    ORDINAL_DAYS: (day)=>{
        let ones = day % 10
        switch(ones){
            case 1:
                return `${day}st`;
            case 2:
                return `${day}nd`;
            case 3:
                return `${day}rd`;
            default:
                return `${day}th`;
        }
    }
}

export const NAMESPACE = "48e48b76-13a9-416e-85f0-fc3f43394628"

export const SASS_VARIABLES = {
    orange: "#F7630C",
    yellowOrange: "#FFB117",
    darkGray: "#282727",
    gray: "#454444",
    pink: "#FF5151",
    green: "rgb(137, 189, 34)",
    red: "#FF0073",
    lightGray: "rgba(white,.55)",
    lightGraySolid: "rgba(white,.55)"
}