/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { IProduct } from '@/interface/general.interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// auth service build

export const generalApi = createApi({
  reducerPath: 'generalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.buildadom.net/api/v1',
    headers: { accept: 'application/json' },
  }),
  endpoints: (builder) => ({
    // QUERIES
    allProducts: builder.query<any, void>({
      query: () => ({
        url: '/products',
        keepUnusedDataFor: 0.0001,
      }),
      transformResponse: (response: { products: any }, meta, arg) => {
        return response.products
      },
    }),
    getQueryByCategory: builder.query<any, { category: number }>({
      query: (category) => ({
        url: `products?limit=10&category=${category}`,
      }),
      transformResponse: (response: { products: IProduct[] }) => {
        return response.products
      },
    }),
  }),
})

export const { useAllProductsQuery, useGetQueryByCategoryQuery } = generalApi
