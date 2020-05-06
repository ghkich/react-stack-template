import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { usePaginatedQuery } from 'react-query'

import API, { getQueryError, setAuthorizationHeader } from '../../api/api'
import { Order } from './types'

type OrderQueryBy = 'customerId' | 'companyId'

interface UseOrdersQueryParams {
  queryBy: OrderQueryBy
  id: number
  filters?: { status?: 'finished' | 'not_found' } | null
  perPage?: number
}

const queryByBaseUrl = (queryBy: OrderQueryBy) => {
  switch (queryBy) {
    case 'companyId':
      return `/companies`
    case 'customerId':
      return `/customers`
  }
}

export const useOrdersQuery = ({ queryBy, id, filters, perPage }: UseOrdersQueryParams) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>()

  const fetchOrders = async (key: any, page: number) => {
    const response: AxiosResponse<Order[]> = await API.get(queryByBaseUrl(queryBy) + `/${id}/orders`, {
      params: { 'per-page': perPage, page: page },
      headers: { ...setAuthorizationHeader() },
    })
    setPageCount(Number(response.headers['x-pagination-page-count']))
    return response.data
  }

  const query = usePaginatedQuery([`${queryBy}-${id}-orders-${perPage}-${filters?.status}`, currentPage], fetchOrders)

  return {
    data: query.resolvedData,
    status: query.status,
    fetching: query.isFetching,
    error: getQueryError(query.status, query.error),
    pagination: {
      currentPage,
      setCurrentPage,
      pageCount,
    },
  }
}

// export const useOrdersStatisticsQuery = () => {
//   const fetchStatistics = async () => {
//     const response: AxiosResponse<Order[]> = await API.get('orderStatistics', {
//       headers: { ...setAuthorizationHeader() },
//     })
//     return response.data
//   }

//   const query = useQuery('ordersStatistics', fetchStatistics)

//   return {
//     data: query.data,
//     status: query.status,
//     fetching: query.isFetching,
//     error: getQueryError(query.status, query.error),
//   }
// }
