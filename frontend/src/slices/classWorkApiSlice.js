import { apiSlice } from './apiSlice';
const CLASSWORK_URL = `/api/classwork`;

export const classWorkApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        createClassWork: builder.mutation({
            query: (data) => ({
                url: `${CLASSWORK_URL}`,
                method: 'POST',
                body: data
            }),
        }),       
    }),
});
export const{ useCreateClassWorkMutation } = classWorkApiSlice; 