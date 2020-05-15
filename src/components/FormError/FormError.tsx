import React, { useEffect, useRef } from 'react'

import { FieldError } from '../../api/types'
import Alert from '../Alert/Alert'
import styles from './FormError.module.scss'

export interface FormErrorProps {
  error: {
    message: string
    description: string | FieldError[]
  }
}

const FormError: React.FC<FormErrorProps> = ({ error }) => {
  const formError = useRef<HTMLDivElement>(null)

  useEffect(() => {
    formError.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
  }, [formError])

  return (
    <div ref={formError}>
      <Alert
        type="error"
        message={error.message}
        description={
          Array.isArray(error.description) && (
            <ul className={styles.fieldErrorsContainer}>
              {error.description.map((desc) => (
                <li key={desc.field}>{desc.message}</li>
              ))}
            </ul>
          )
        }
      />
    </div>
  )
}

export default FormError
