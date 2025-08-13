import { baseApi } from "@/redux/baseApi";


export const divisionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addDivision: builder.mutation({
            query: (divisionData) => ({
                url: "/division/create",
                method: "POST",
                data: divisionData
            })
        }),
        getDivision: builder.query({
            query: () => ({
                url: "/division",
                method: "GET",
            }),
            providesTags: ["DIVISION"]
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