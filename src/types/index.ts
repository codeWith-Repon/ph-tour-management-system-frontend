import type { ComponentType } from "react"

export type {
    ISendOtp,
    IVerifyOtp,
    ILogin,
    IRegister,
} from "./auth.types"

export type {
    IRegisterData,
    ILoginData
} from "./response.types"



export interface IResponse<T> {
    statusCode: number
    success: boolean
    message: string
    data: T
}

export interface ISidebarItem {
    title: string,
    items:
    {
        title: string,
        url: string,
        component: ComponentType
    }[]
}