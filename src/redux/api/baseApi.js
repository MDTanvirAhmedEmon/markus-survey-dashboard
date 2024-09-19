import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://94.130.57.216:80/api/',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

// http://94.130.57.216:80/api/

// http://94.130.57.216:80/

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQuery,
  tagTypes: ['Survey', 'Project', 'Company', 'Settings', 'Event', 'Notification'],
  endpoints: () => ({}),
})

export const imageUrl = 'http://94.130.57.216:80'