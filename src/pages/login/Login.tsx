import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { RoutePaths } from '../../app/routes'
import Alert from '../../components/Alert/Alert'
import Button from '../../components/Button/Button'
import ButtonLoader from '../../components/ButtonLoader/ButtonLoader'
import Checkbox from '../../components/Checkbox/Checkbox'
import FormItem from '../../components/FormItem/FormItem'
import Input from '../../components/Input/Input'
import Title from '../../components/Title/Title'
import LoginLayout from '../../layouts/LoginLayout/LoginLayout'
import { useLoginRequest } from '../../state/auth/requests'

type FormData = {
  email: string
  password: string
  keepMeLoggedIn: boolean
}

const Login: React.FC = () => {
  const { handleSubmit, register, errors } = useForm<FormData>()
  const loginRequest = useLoginRequest()
  const authenticating = loginRequest.status === 'loading'
  const history = useHistory()

  const onSubmit = handleSubmit(async ({ email, password, keepMeLoggedIn }) => {
    loginRequest.call(email, password, keepMeLoggedIn)
  })

  const hideElementStyle = {
    opacity: authenticating ? 0 : 1,
    pointerEvents: authenticating ? 'none' : 'visible',
  } as React.CSSProperties

  return (
    <LoginLayout
      backgroundMessage={
        <>
          Sem dor de cabeça. <br />
          Documento é com a gente.
        </>
      }
    >
      <Title level={2} style={{ marginBottom: 20 }}>
        Accesar sua conta
      </Title>
      {loginRequest.error && (
        <Alert
          type="error"
          message={loginRequest.error.message}
          description={loginRequest.error.tip}
          style={{ marginBottom: 20 }}
        />
      )}
      <form onSubmit={onSubmit}>
        <FormItem label="E-mail" feedback={errors.email && 'Informe um e-mail válido'}>
          <Input
            name="email"
            autoComplete="email"
            ref={register({
              required: 'Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'invalid email address',
              },
            })}
            disabled={authenticating}
            tabIndex={1}
          />
        </FormItem>
        <FormItem label="Senha" feedback={errors.password && 'Informe a senha'}>
          <Button
            type="link"
            style={{
              fontSize: 13,
              position: 'absolute',
              top: 3,
              right: 0,
              ...hideElementStyle,
            }}
            to={RoutePaths.HOME}
            tabIndex={5}
          >
            Esqueci minha senha
          </Button>
          <Input
            name="password"
            type="password"
            autoComplete="current-password"
            ref={register({
              required: 'Required',
            })}
            disabled={authenticating}
            tabIndex={2}
          />
        </FormItem>
        <FormItem>
          <Checkbox name="keepMeLoggedIn" ref={register()} disabled={authenticating} tabIndex={3}>
            Continuar conectado
          </Checkbox>
        </FormItem>
        <ButtonLoader
          status={loginRequest.status}
          loadingMessage="Verificando credenciais..."
          onSuccess={() => history.push(RoutePaths.HOME)}
        >
          Entrar
        </ButtonLoader>
      </form>
      <p style={{ marginTop: 55, fontSize: 14, lineHeight: '35px', textAlign: 'center', ...hideElementStyle }}>
        <b>Ainda não tem uma conta?</b>{' '}
        <Button type="link" to={RoutePaths.REGISTER_CNPJ} tabIndex={6}>
          Crie agora mesmo
        </Button>
      </p>
    </LoginLayout>
  )
}

export default Login
