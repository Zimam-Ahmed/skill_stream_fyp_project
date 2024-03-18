import { apiSlice } from './apiSlice';
const CLASSROOM_URL = '/api/classroom';

export const classApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        createClass: builder.mutation({
            query: (data) => ({
                url: `${CLASSROOM_URL}`,
                method: 'POST',
                body: data
            }),
        }),
        joinClass: builder.mutation({
            query: (data) => ({
                url: `${CLASSROOM_URL}/join`,
                method: 'POST',
                body: data
            }),
        }), 
        createOrUpdateLink: builder.mutation({
            query: ({classId, link}) => ({
                url: `${CLASSROOM_URL}/${classId}/link`,
                method: 'POST',
                body: { link }
            }),
        }),       
    }),
});
export const{ useCreateClassMutation, useJoinClassMutation, useCreateOrUpdateLinkMutation } = classApiSlice; 