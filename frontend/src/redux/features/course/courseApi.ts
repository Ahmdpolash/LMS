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

    getSingleCourse: builder.query({
      query: (id: string) => ({
        url: `/course/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: [tagTypes.course],
    }),

    getCourseContent: builder.query({
      query: (id: string) => ({
        url: `/course/course-content/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result, error, id) => [{ type: tagTypes.course, id }],
    }),
    addQuestion: builder.mutation({
      query: (data) => ({
        url: "/course/add-question",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: tagTypes.course, id: arg.courseId },
      ],
    }),

    replyQuestion: builder.mutation({
      query: (data) => ({
        url: "/course/reply-question",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: tagTypes.course, id: arg.courseId },
      ],
    }),

    addReview: builder.mutation({
      query: (id) => ({
        url: `/add-review/${id}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: tagTypes.course, id: arg.courseId },
      ],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useGetSingleCourseQuery,
  useGetCourseContentQuery,
  useAddQuestionMutation,
  useReplyQuestionMutation,
  useAddReviewMutation,
} = courseApi;
