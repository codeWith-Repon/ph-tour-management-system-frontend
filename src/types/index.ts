export type {
    ISendOtp,
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
