import React from 'react'
import { usePaginatedQuery } from 'react-query'

import API, { setAuthorizationHeader } from '../../services/api'
import OrdersStatistics from './components/OrdersStatistics'

interface Props {}

const Home: React.FC<Props> = (props) => {
  const [page, setPage] = React.useState(1)

  const fetchOrders = async (key: any, page = 1) =>
    await API.get('/customers/1/orders?per-page=1&page=' + page, { headers: { ...setAuthorizationHeader() } })

  const { status, resolvedData, latestData, error, isFetching }: any = usePaginatedQuery<any, any>(
    ['orders', page],
    fetchOrders,
    { retry: false },
  )

  return (
    <div>
      <OrdersStatistics />
      <div>
        {status === 'loading' ? (
          <div>Loading...</div>
        ) : status === 'error' ? (
          <div>Error: {error.message}</div>
        ) : (
          // `resolvedData` will either resolve to the latest page's data
          // or if fetching a new page, the last successful page's data
          <div>
            {resolvedData.orders.map((order: any) => (
              <p key={order.id}>{order.name}</p>
            ))}
          </div>
        )}
        <span>Current Page: {page + 1}</span>
        <button onClick={() => setPage((old) => Math.max(old - 1, 0))} disabled={page === 0}>
          Previous Page
        </button>{' '}
        <button
          onClick={() =>
            // Here, we use `latestData` so the Next Page
            // button isn't relying on potentially old data
            setPage((old) => (!latestData || !latestData.hasMore ? old : old + 1))
          }
          disabled={!latestData || !latestData.hasMore}
        >
          Next Page
        </button>
        {
          // Since the last page's data potentially sticks around between page requests,
          // we can use `isFetching` to show a background loading
          // indicator since our `status === 'loading'` state won't be triggered
          isFetching ? <span> Loading...</span> : null
        }{' '}
      </div>
    </div>
  )
}

export default Home
