import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://backend-ph-tour-management-system-sigma.vercel.app/api/v1" }),
    endpoints: () => ({}),
})