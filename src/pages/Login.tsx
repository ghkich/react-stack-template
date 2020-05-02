import { motion } from 'framer-motion'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import Button from '../components/Button/Button'
import FormItem from '../components/FormItem/FormItem'
import Input from '../components/Input/Input'
import LoginLayout from '../layouts/LoginLayout'
import { RoutePaths } from '../routes'
import { useLogin } from '../services/services'
import { enteringFromTop } from '../utils/animation-utils'

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

  const hideElementStyle = {
    opacity: authenticating ? 0 : 1,
    pointerEvents: authenticating ? 'none' : 'visible',
  } as React.CSSProperties

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
        <FormItem label="E-mail" feedback={errors.email && 'Informe um e-mail válido'} feedbackStatus="error">
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
          />
        </FormItem>
        <FormItem label="Senha" feedback={errors.password && 'Informe a senha'} feedbackStatus="error">
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
          />
        </FormItem>
        <FormItem>
          <label>
            <input type="checkbox" name="keepMeLoggedIn" ref={register()} disabled={authenticating} />
            Continuar logado
          </label>
        </FormItem>
        <Button type="primary" htmlType="submit" loading={authenticating} block>
          Entrar
        </Button>
        <motion.div
          style={{
            position: 'relative',
            zIndex: 0,
            textAlign: 'center',
            fontSize: 13,
            margin: '10px auto',
            userSelect: 'none',
            opacity: 0.4,
          }}
          initial={authenticating ? 'enter' : 'exit'}
          animate={authenticating ? 'enter' : 'exit'}
          variants={enteringFromTop}
        >
          Verificando credenciais...
        </motion.div>
      </form>
      <p style={{ marginTop: 60, fontSize: 14, textAlign: 'center', ...hideElementStyle }}>
        <b>Ainda não tem uma conta?</b> <Button type="link">Crie agora mesmo</Button>
      </p>
    </LoginLayout>
  )
}

export default Login
