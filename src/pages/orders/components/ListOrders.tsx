import React from 'react'

import Search from '../../../components/Search/Search'
import Table from '../../../components/Table/Table'
import { useOrdersQuery } from '../../../state/orders/queries'

interface Props {}

const ListOrders: React.FC<Props> = (props) => {
  const { data: orders, status, fetching, error, pagination } = useOrdersQuery({
    perPage: 1,
  })

  return (
    <div>
      <Search
        size="small"
        placeholder="Pesquise por cliente ou número do pedido"
        onSearch={(value) => console.log(value)}
        style={{ maxWidth: 450 }}
      />
      <Table />
      {status === 'loading' && <div>Loading...</div>}
      {error && (
        <div>
          <h4>{error.message}</h4>
          {error.tip && <p>{error.tip}</p>}
        </div>
      )}
      {orders && (
        <div>
          Pedidos
          {orders.map((order) => (
            <div key={order.id} style={{ backgroundColor: 'white', marginBottom: 10, padding: 10, borderRadius: 4 }}>
              {order.customer.name}
            </div>
          ))}
        </div>
      )}

      <div>Current Page: {pagination.currentPage}</div>
      {pagination.pageCount !== 0 &&
        Array.from(Array(pagination.pageCount).keys()).map((pageNumber) => (
          <button key={pageNumber} onClick={() => pagination.setCurrentPage(pageNumber + 1)}>
            Página {pageNumber + 1}
          </button>
        ))}
      {fetching ? <span> Fetching...</span> : null}
    </div>
  )
}

export default ListOrders
