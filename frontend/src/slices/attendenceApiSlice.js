import { apiSlice } from './apiSlice';
const ATTENDENCE_URL = '/api/attendence';

export const attendenceApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        createAttendence: builder.mutation({
            query: (data) => ({
                url: `${ATTENDENCE_URL}`,
                method: 'POST',
                body: data
            }),
        }),     
    }),
});
export const{ useCreateAttendenceMutation } = attendenceApiSlice; 