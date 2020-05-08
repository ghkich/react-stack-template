import React from 'react'
import { Link } from 'react-router-dom'

import ListOrders from './components/ListOrders'
import OrdersStatistics from './components/OrdersStatistics'

interface Props {}

const Orders: React.FC<Props> = (props) => {
  return (
    <div>
      <OrdersStatistics />
      <ListOrders />
      <Link to={(location) => `${location.pathname}/123456`}>123456</Link>
    </div>
  )
}

export default Orders
