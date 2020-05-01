import React from 'react'
import { useParams } from 'react-router-dom'

interface Props {}

const ViewOrder: React.FC<Props> = () => {
  const params = useParams<{ id: string }>()

  return (
    <div>
      <div>Pedido {params.id}</div>
    </div>
  )
}

export default ViewOrder
