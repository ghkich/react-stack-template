import React from 'react'
import { useForm } from 'react-hook-form'

import { RoutePaths } from '../../app/routes'
import Button from '../../components/Button/Button'
import FormItem from '../../components/FormItem/FormItem'
import Input from '../../components/Input/Input'
import LoginLayout from '../../layouts/LoginLayout/LoginLayout'

type FormData = {
  cpf?: string
  cnpj?: string
}

const Register: React.FC = () => {
  const { handleSubmit, register, errors } = useForm<FormData>()
  // const loginRequest = useRegisterRequest()
  const authenticating = false

  const onSubmit = handleSubmit(async ({ cnpj }) => {
    // loginRequest.call(email, password, keepMeLoggedIn)
  })

  return (
    <LoginLayout
      title="Qual é seu CNPJ?"
      backgroundMessage={
        <>
          Crie uma conta e solicite documentos ou faça <br />
          pesquisas em cartórios <br />
          de todo o Brasil.
        </>
      }
    >
      <form onSubmit={onSubmit}>
        <FormItem label="CNPJ" feedback={errors.cnpj && 'Informe um CNPJ válido'} feedbackStatus="error">
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
      <p style={{ marginTop: 55, fontSize: 14, textAlign: 'center' }}>
        <b>Já tem uma conta?</b>{' '}
        <Button type="link" to={RoutePaths.LOGIN}>
          Faça seu login
        </Button>
      </p>
    </LoginLayout>
  )
}

export default Register
