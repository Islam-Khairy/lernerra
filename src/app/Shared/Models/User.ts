export interface User{
    userId:string,
    fullName:string,
    email:string,
    phoneNumber?:string
    pictureUrl?:string
    token:string,
    roles:string[]
}

export interface registerDto{
    fullName:string,
    email:string,
    password:string,
    confirmPassword:string
}

export interface updateUserDto{
    fullName:string,
    phoneNumber:string,
    profilePictureUrl:string
    email:string
}

export interface UserInfo{
    fullName:string,
    phoneNumber:string,
    profilePictureUrl:string
    email:string
}
