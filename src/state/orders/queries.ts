import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { usePaginatedQuery } from 'react-query'

import API, { setAuthorizationHeader } from '../../api/config'
import { getQueryError } from '../../api/errors'
import { Order } from './types'

type OrderQueryBy = 'customerId' | 'companyId'

interface UseOrdersQueryParams {
  filters?: { status?: 'finished' | 'not_found' } | null
  perPage?: number
}

export const useOrdersQuery = ({ filters, perPage }: UseOrdersQueryParams) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>()

  const fetchOrders = async (key: any, page: number) => {
    const response: AxiosResponse<Order[]> = await API.get('/orders', {
      params: {
        expand: 'customer,user,documentType,currentStatus',
        fields: 'id,customer.name,user.name,',
        'per-page': perPage,
        page: page,
      },
      headers: { ...setAuthorizationHeader() },
    })
    setPageCount(Number(response.headers['x-pagination-page-count']))
    return response.data
  }

  const query = usePaginatedQuery([`orders-${perPage}-${filters?.status}`, currentPage], fetchOrders)

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
