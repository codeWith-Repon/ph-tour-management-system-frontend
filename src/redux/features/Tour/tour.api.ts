import { baseApi } from "@/redux/baseApi";


export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        AddTour: builder.mutation({
            query: (tourData) => ({
                url: "/tour/create",
                method: "POST",
                data: tourData
            }),
            invalidatesTags: ["TOUR"]
        }),
        getAllTours: builder.query({
            query: () => ({
                url: "/tour",
                method: "GET"
            }),
            providesTags: ["TOUR"]
        }),
        AddTourType: builder.mutation({
            query: (tourTypeName) => ({
                url: "/tour/create-tour-type",
                method: "POST",
                data: tourTypeName
            }),
            invalidatesTags: ["TOUR-TYPE"]
        }),
        getTourTypes: builder.query({
            query: () => ({
                url: "/tour/tour-types",
                method: "GET"
            }),
            providesTags: ["TOUR-TYPE"],
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
            invalidatesTags: ["TOUR-TYPE"]
        })
    })
})

export const {
    useAddTourMutation,
    useGetAllToursQuery,
    useAddTourTypeMutation,
    useGetTourTypesQuery,
    useRemoveTourTypeMutation
} = tourApi