import React from 'react'

import { useOrders } from '../../../state/order/effects'

interface Props {}

const ListOrders: React.FC<Props> = (props) => {
  const { orders, isLoading, isFetching, errorMessage, currentPage, setCurrentPage, pageCount } = useOrders({
    fetchBy: 'customerId',
    id: 1,
    perPage: 1,
  })

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {errorMessage && <div>Error: {errorMessage}</div>}
      {!isLoading && !errorMessage && (
        <div>
          Pedidos
          {orders?.map((order) => (
            <div key={order.id} style={{ backgroundColor: 'white', marginBottom: 10, padding: 10, borderRadius: 4 }}>
              ID do pedido: {order.id}
            </div>
          ))}
        </div>
      )}
      <div>Current Page: {currentPage}</div>
      {pageCount !== 0 &&
        Array.from(Array(pageCount).keys()).map((pageNumber) => (
          <button key={pageNumber} onClick={() => setCurrentPage(pageNumber + 1)}>
            Página {pageNumber + 1}
          </button>
        ))}
      {isFetching ? <span> Fetching...</span> : null}
    </div>
  )
}

export default ListOrders
