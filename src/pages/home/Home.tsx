import { AxiosResponse } from 'axios'
import React, { useState } from 'react'
import { usePaginatedQuery } from 'react-query'

import API, { setAuthorizationHeader } from '../../services/api'
import { Order } from '../../services/types'
import OrdersStatistics from './components/OrdersStatistics'

function isError(error: unknown): error is Error {
  return error instanceof Error
}

interface Props {}

const Home: React.FC<Props> = (props) => {
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)

  const fetchOrders = async (key: any, page = 1) => {
    const response: AxiosResponse<Order[]> = await API.get('/customers/1/orders?per-page=1&page=' + page, {
      headers: { ...setAuthorizationHeader() },
    })
    setPageCount(parseInt(response.headers['x-pagination-page-count'], 10))
    return response.data
  }

  const { status, resolvedData, error, isFetching } = usePaginatedQuery(['orders', page], fetchOrders, {
    retry: false,
    staleTime: 2000,
  })

  let errorMessage = ''

  if (status === 'error') {
    if (isError(error)) {
      // handle Error
      errorMessage = error.message // ok
    } else {
      // handle unknown error
    }
  }

  return (
    <div>
      <OrdersStatistics />
      <div>
        {status === 'loading' ? (
          <div>Loading...</div>
        ) : status === 'error' ? (
          <div>Error: {errorMessage}</div>
        ) : (
          // `resolvedData` will either resolve to the latest page's data
          // or if fetching a new page, the last successful page's data
          <div>
            Pedidos
            {resolvedData?.map((order) => (
              <div key={order.id} style={{ backgroundColor: 'white', marginBottom: 10, padding: 10, borderRadius: 4 }}>
                ID do pedido: {order.id}
              </div>
            ))}
          </div>
        )}
        <div>Current Page: {page}</div>
        {pageCount !== 0 &&
          Array.from(Array(pageCount).keys()).map((pageNumber) => (
            <button key={pageNumber} onClick={() => setPage(pageNumber + 1)}>
              Página {pageNumber + 1}
            </button>
          ))}
        {
          // Since the last page's data potentially sticks around between page requests,
          // we can use `isFetching` to show a background loading
          // indicator since our `status === 'loading'` state won't be triggered
          isFetching ? <span> Fetching...</span> : null
        }{' '}
      </div>
    </div>
  )
}

export default Home
