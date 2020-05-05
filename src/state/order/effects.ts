import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { usePaginatedQuery } from 'react-query'
import { isError } from 'util'

import API, { setAuthorizationHeader } from '../api'
import { Order } from './types'

type OrderFetchBy = 'customerId' | 'companyId'

interface UseOrdersParams {
  fetchBy: OrderFetchBy
  id: number
  filters?: { status?: 'finished' | 'not_found' } | null
  perPage?: number
}

const fetchByBaseUrl = (fetchBy: OrderFetchBy) => {
  switch (fetchBy) {
    case 'companyId':
      return `/companies`
    case 'customerId':
      return `/customers`
  }
}

export const useOrders = ({ fetchBy, id, filters, perPage }: UseOrdersParams) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>()

  const fetchOrders = async (key: any, page: number) => {
    const response: AxiosResponse<Order[]> = await API.get(fetchByBaseUrl(fetchBy) + `/${id}/orders`, {
      params: { 'per-page': perPage, page: page },
      headers: { ...setAuthorizationHeader() },
    })
    setPageCount(Number(response.headers['x-pagination-page-count']))
    return response.data
  }

  const { status, resolvedData, error, isFetching } = usePaginatedQuery(
    [`${fetchBy}-${id}-orders-${perPage}-${filters?.status}`, currentPage],
    fetchOrders,
  )

  let errorMessage = ''

  if (status === 'error') {
    if (isError(error)) {
      errorMessage = error.message
    } else {
      throw new Error(error as any)
      // handle unknown error
    }
  }

  return {
    isLoading: status === 'loading',
    orders: resolvedData,
    errorMessage,
    isFetching,
    currentPage,
    setCurrentPage,
    pageCount,
  }
}
