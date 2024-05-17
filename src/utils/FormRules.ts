function emailRules(value: string){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) == true ? true : "Invalid email address";
}

function notNullRules(value: string, field = "Field"){
    return value !== undefined && value != "" && value != null ? true : field+" is required";
}

function minimumLength(value: string, length: number){
    return value.length >= length ? true : "Field must be at least "+length+" or more characters";
}

function maximumLength(value: string, length: number){
    return value.length <= length ? true : "Field must be "+length+" characters maximum";
}
function minimumCapital(value: string, length: number){
    const uppercaseCount = (value.match(/[A-Z]/g) || []).length;
    return uppercaseCount >= length ? true : "Field must have at least "+length+" capital letter";
}

function sameField(value1: string, value2: string, field1: string, field2: string){
    if(value1 != value2){
        return field1+" and "+field2+" must be the same";
    }
    return true;
}

export { emailRules, notNullRules, minimumLength, maximumLength, minimumCapital, sameField};