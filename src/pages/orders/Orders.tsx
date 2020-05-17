import React from 'react'
import {Link} from 'react-router-dom'

import PageLayout from '../../layouts/PageLayout/PageLayout'
import ListOrders from './components/ListOrders'
import OrdersStatistics from './components/OrdersStatistics'

interface Props {}

const Orders: React.FC<Props> = (props) => {
  return (
    <PageLayout title="Meus pedidos" insideHeader={<OrdersStatistics />}>
      <div style={{margin: 30}}>
        <ListOrders />
        <Link to={(location) => `${location.pathname}/123456`}>123456</Link>
      </div>
    </PageLayout>
  )
}

export default Orders
