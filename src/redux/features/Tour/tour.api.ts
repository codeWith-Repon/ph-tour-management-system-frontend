import { baseApi } from "@/redux/baseApi";


export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        AddTourType: builder.mutation({
            query: (tourTypeName) => ({
                url: "/tour/create-tour-type",
                method: "POST",
                data: tourTypeName
            }),
            invalidatesTags: ["TOUR"]
        }),
        getTourTypes: builder.query({
            query: () => ({
                url: "/tour/tour-types",
                method: "GET"
            }),
            providesTags: ["TOUR"],
            transformResponse: (response) => {
                return {
                    data: response.data,
                    meta: response.meta
                }
            },  ///if no need to status, message, success only need data
        }),
        removeTourType: builder.mutation({
            query: (tourTypeId) => ({
                url: `/tour/tour-types/${tourTypeId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["TOUR"]
        })
    })
})

export const {
    useAddTourTypeMutation,
    useGetTourTypesQuery,
    useRemoveTourTypeMutation
} = tourApi