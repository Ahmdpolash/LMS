import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-type";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/course/create-course",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: [tagTypes.course],
    }),

    getAllCourses: builder.query({
      query: () => ({
        url: "/course",
        method: "GET",
        credentials: "include",
      }),
      providesTags: [tagTypes.course],
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/course/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: [tagTypes.course],
    }),
  }),
});

export const { useCreateCourseMutation, useGetAllCoursesQuery, useDeleteCourseMutation } = courseApi;
