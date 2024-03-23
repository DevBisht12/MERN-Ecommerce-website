import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
  reducerPath:'productsApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api/'}),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, categoryName, sort }) => {
        let url=`/get-All-Products?page=${page}`;
        if(categoryName){
          url += `&category=${encodeURIComponent(categoryName)}`;
        }
        if (sort) {
          url += `&sort=${encodeURIComponent(sort)}`;
        }
        return {
          url,
          method: 'GET',
        };
      },
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/view-product-details/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {useGetProductsQuery,useGetProductByIdQuery}= productsApi;