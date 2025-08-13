import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "./axiosBaseQuery"

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: axiosBaseQuery(),
    // baseQuery: fetchBaseQuery({
    //     baseUrl: config.baseUrl,         ///when you wan't to use fetch base query not axios
    //     credentials: "include"
    // }),
    tagTypes: ["USER", "TOUR"],
    endpoints: () => ({}),
})