import React from 'react'

import ListOrders from '../../features/orders/ListOrders'

interface Props {}

const Home: React.FC<Props> = (props) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <ListOrders />
    </div>
  )
}

export default Home
