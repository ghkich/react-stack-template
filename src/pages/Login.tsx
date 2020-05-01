import React from 'react'
import { useForm } from 'react-hook-form'

import Button from '../components/Button/Button'
import FormItem from '../components/FormItem/FormItem'
import Input from '../components/Input/Input'
import LoginLayout from '../layouts/LoginLayout'
import { RoutePaths } from '../routes'
import { useLogin } from '../services/services'

type FormData = {
  username: string
  password: string
  keepMeLoggedIn: boolean
}

const Login: React.FC = () => {
  const { handleSubmit, register, errors } = useForm<FormData>()
  const { login, authenticating } = useLogin()

  const onSubmit = handleSubmit(async ({ username, password, keepMeLoggedIn }) => {
    login(username, password, keepMeLoggedIn)
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
        <FormItem label="Usuário" feedback={errors.username && 'Informe o nome do usuário'} feedbackStatus="error">
          <Input
            name="username"
            autoComplete="username"
            ref={register({
              required: 'Required',
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
