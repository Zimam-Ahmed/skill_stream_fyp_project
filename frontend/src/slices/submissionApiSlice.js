import { apiSlice } from './apiSlice';
const SUBMISSION_URL = `/api/submission`;

export const submissionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        createSubmission: builder.mutation({
            query: (data) => ({
                url: `${SUBMISSION_URL}`,
                method: 'POST',
                body: data
            }),
        }),       
    }),
});
export const{ useCreateSubmissionMutation } = submissionApiSlice; 