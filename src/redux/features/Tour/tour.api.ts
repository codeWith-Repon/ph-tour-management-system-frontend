import { baseApi } from "@/redux/baseApi";


export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        AddTourType: builder.mutation({
            query: (tourTypeName) => ({
                url: "tour/create-tour-type",
                method: "POST",
                data: tourTypeName
            })
        }),
        getTourTypes: builder.query({
            query: () => ({
                url: "/tour/tour-types",
                method: "GET"
            }),
            transformResponse: (response) => {
                return {
                    data:response.data,
                    meta: response.meta
                }
            },  ///if no need to status, message, success only need data
        }),
    })
})

export const {
    useAddTourTypeMutation,
    useGetTourTypesQuery
} = tourApi