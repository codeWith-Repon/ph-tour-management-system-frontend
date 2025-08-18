import { baseApi } from "@/redux/baseApi";


export const divisionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addDivision: builder.mutation({
            query: (divisionData) => ({
                url: "/division/create",
                method: "POST",
                data: divisionData
            }),
            invalidatesTags: ["DIVISION"]
        }),
        getDivision: builder.query({
            query: (params) => ({
                url: "/division",
                method: "GET",
                params
            }),
            providesTags: ["DIVISION"],
        }),
        removeDivision: builder.mutation({
            query: (divisionId) => ({
                url: `division/${divisionId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["DIVISION"]
        })
    })
})

export const { useAddDivisionMutation, useGetDivisionQuery, useRemoveDivisionMutation } = divisionApi;