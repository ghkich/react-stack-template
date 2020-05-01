import React from 'react'
import { Link } from 'react-router-dom'

interface Props {}

const Orders: React.FC<Props> = (props) => {
  return (
    <div>
      <div>Meus pedidos</div>
      <Link to={(location) => `${location.pathname}/123456`}>123456</Link>
    </div>
  )
}

export default Orders
