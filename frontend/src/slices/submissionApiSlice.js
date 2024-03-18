import { apiSlice } from './apiSlice';

const SUBMISSION_URL = `/api/submission`;

export const submissionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSubmission: builder.mutation({
      query: (data) => ({
        url: `${SUBMISSION_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateObtainedPoints: builder.mutation({
      query: ({ classworkId, filename, obtainedPoints }) => ({
        url: `${SUBMISSION_URL}/updateObtainedPoints/${classworkId}/${filename}`,
        method: 'PUT', // Use PUT for updating marks
        body: { obtainedPoints },
      }),
    }),
  }),
});

export const { useCreateSubmissionMutation, useUpdateObtainedPointsMutation } = submissionApiSlice;
