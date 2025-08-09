interface IAuth {
    provider: string
    providerId: string
}

export interface IRegisterData {
    name: string
    email: string
    password: string
    role: string
    isDeleted: boolean
    isActive: string
    isVerified: boolean
    auths: IAuth[]
    _id: string
    createdAt: string
    updatedAt: string
}

export interface IUser {
    _id: string
    name: string
    email: string
    role: string
    isDeleted: boolean
    isActive: string
    isVerified: boolean
    auths: IAuth[]
    createdAt: string
    updatedAt: string
}

export interface ILoginData {
    accessToken: string
    refreshToken: string
    user: IUser
}
