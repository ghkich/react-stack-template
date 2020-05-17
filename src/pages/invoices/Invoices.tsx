import React from 'react'

import PageLayout from '../../layouts/PageLayout/PageLayout'

interface Props {}

const Invoices: React.FC<Props> = (props) => {
  return (
    <PageLayout title="Faturas">
      <div style={{margin: 30}}>
        <p>
          Ipsum enim nostrud deserunt aute nostrud enim. Excepteur ex fugiat do id laborum qui elit deserunt tempor id
          proident sunt. Elit aute commodo ut dolore laboris officia dolore. Proident aute aliqua anim laborum. Eiusmod
          dolor.
        </p>
      </div>
    </PageLayout>
  )
}

export default Invoices
