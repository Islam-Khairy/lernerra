export interface User{
    userId:string,
    fullName:string,
    email:string,
    token:string,
    roles:string[]
}

export interface registerDto{
    fullName:string,
    email:string,
    password:string,
    confirmPassword:string
}