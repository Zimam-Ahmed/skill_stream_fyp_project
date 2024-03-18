import { apiSlice } from './apiSlice';

const Attendence_URL = '/api/attendence';

export const attendenceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAttendence: builder.mutation({
      query: ({ classId, attendanceData }) => ({  // Corrected parameter name
        url: `${Attendence_URL}/${classId}`,
        method: 'POST',
        body: { classId, attendanceData },  // Corrected parameter name
      }),
      transformResponse: (response) => response.json(),
    }),
  }),
});

export const { useCreateAttendenceMutation } = attendenceApiSlice;
