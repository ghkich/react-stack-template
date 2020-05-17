import {render} from '@testing-library/react'
import React from 'react'

import App from '../App'

it('renders the app without crashing', () => {
  render(<App />)
})
