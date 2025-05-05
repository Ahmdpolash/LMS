import { baseApi } from "@/redux/api/baseApi";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/course/create-course",
        method: "POST",
        body:  data ,
        credentials: "include",
      }),
    }),
  }),
});


export const {useCreateCourseMutation} = courseApi