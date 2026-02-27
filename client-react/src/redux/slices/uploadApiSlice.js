import { UPLOAD_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const uploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useUploadProductImageMutation } = uploadApiSlice;
