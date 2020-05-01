import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import Button from '../components/Button/Button'
import FormItem from '../components/FormItem/FormItem'
import Input from '../components/Input/Input'
import LoginLayout from '../layouts/LoginLayout'
import { RoutePaths } from '../routes'
import { useLogin } from '../services/services'

type FormData = {
  email: string
  password: string
  keepMeLoggedIn: boolean
}

const Login: React.FC = () => {
  const { handleSubmit, register, errors } = useForm<FormData>()
  const { login, authenticating } = useLogin()
  const history = useHistory()

  const onSubmit = handleSubmit(async ({ email, password, keepMeLoggedIn }) => {
    const authenticated = await login(email, password, keepMeLoggedIn)
    if (authenticated) {
      history.push(RoutePaths.HOME)
    }
  })

  return (
    <LoginLayout
      title="Acessar conta"
      backgroundMessage={
        <>
          Sem dor de cabeça. <br />
          Cartório é com a gente.
        </>
      }
    >
      <form onSubmit={onSubmit}>
        <FormItem label="Usuário" feedback={errors.email && 'Informe um email válido'} feedbackStatus="error">
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
          />
        </FormItem>
        <FormItem label="Senha" feedback={errors.password && 'Informe a senha'} feedbackStatus="error">
          <Button type="link" style={{ fontSize: 13, position: 'absolute', top: 3, right: 0 }} to={RoutePaths.HOME}>
            Esqueci minha senha
          </Button>
          <Input
            name="password"
            type="password"
            autoComplete="current-password"
            ref={register({
              required: 'Required',
            })}
          />
        </FormItem>
        <FormItem>
          <label>
            <input type="checkbox" name="keepMeLoggedIn" ref={register()} />
            Continuar logado
          </label>
        </FormItem>
        <Button type="primary" htmlType="submit" loading={authenticating} block>
          Entrar
        </Button>
      </form>
      <p style={{ marginTop: 60, fontSize: 14, textAlign: 'center' }}>
        <b>Ainda não tem uma conta?</b> <Button type="link">Crie agora mesmo</Button>
      </p>
    </LoginLayout>
  )
}

export default Login
