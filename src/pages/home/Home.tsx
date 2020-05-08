import React from 'react'

import ListOrders from '../orders/components/ListOrders'

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
