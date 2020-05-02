import React from 'react'

import OrdersStatistics from './components/OrdersStatistics'

interface Props {}

const Home: React.FC<Props> = (props) => {
  return (
    <div>
      <OrdersStatistics />
    </div>
  )
}

export default Home
