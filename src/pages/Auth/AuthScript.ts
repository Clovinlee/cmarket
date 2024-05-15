function emailRules(value: string){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) == true ? true : "Invalid email address";
}

function notNullRules(value: string, field = "Field"){
    return value !== undefined ? true : field+" is required";
}

export { emailRules, notNullRules };