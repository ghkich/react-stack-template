import React from 'react'
import { useForm } from 'react-hook-form'

import Button from '../../components/Button/Button'
import FormItem from '../../components/FormItem/FormItem'
import Input from '../../components/Input/Input'

type FormData = {
  name: string
  email: string
}

const Register: React.FC = () => {
  const { handleSubmit, register, errors } = useForm<FormData>()
  // const loginRequest = useRegisterRequest()
  const authenticating = false

  const onSubmit = handleSubmit(async ({ name, email }) => {
    // loginRequest.call(email, password, keepMeLoggedIn)
  })

  return (
    <form onSubmit={onSubmit}>
      <FormItem label="CNPJ" feedback={errors.name && 'Digite seu nome'} feedbackStatus="error">
        <Input
          name="cnpj"
          autoComplete="off"
          ref={register({
            required: 'Required',
          })}
          disabled={authenticating}
        />
      </FormItem>
      <FormItem>
        <Button type="link" onClick={() => {}}>
          Quero cadastrar minha empresa
        </Button>
      </FormItem>
      <Button type="primary" htmlType="submit" loading={authenticating} block>
        Continuar
      </Button>
    </form>
  )
}

export default Register
