import { motion } from 'framer-motion'
import React from 'react'
import { useForm } from 'react-hook-form'

import { RoutePaths } from '../../app/routes'
import Alert from '../../components/Alert/Alert'
import Button from '../../components/Button/Button'
import Checkbox from '../../components/Checkbox/Checkbox'
import FormItem from '../../components/FormItem/FormItem'
import Input from '../../components/Input/Input'
import { useLoginRequest } from '../../features/auth/requests'
import LoginLayout from '../../layouts/LoginLayout/LoginLayout'
import { enteringFromTop } from '../../utils/animation-utils'

type FormData = {
  email: string
  password: string
  keepMeLoggedIn: boolean
}

const Login: React.FC = () => {
  const { handleSubmit, register, errors } = useForm<FormData>()
  const loginRequest = useLoginRequest()
  const authenticating = loginRequest.status === 'loading'

  const onSubmit = handleSubmit(async ({ email, password, keepMeLoggedIn }) => {
    loginRequest.call(email, password, keepMeLoggedIn)
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
          Documento é com a gente.
        </>
      }
    >
      {loginRequest.error && (
        <Alert
          type="error"
          message={loginRequest.error.message}
          description={loginRequest.error.tip}
          style={{ marginBottom: 20 }}
        />
      )}
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
            tabIndex={1}
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
        <Button type="primary" htmlType="submit" loading={authenticating} block tabIndex={4}>
          Entrar
        </Button>
        <motion.div
          style={{ position: 'absolute', marginTop: 10, left: 0, right: 0, zIndex: 0 }}
          initial={authenticating ? 'enter' : 'exit'}
          animate={authenticating ? 'enter' : 'exit'}
          variants={enteringFromTop}
        >
          <div style={{ fontSize: 13, textAlign: 'center', userSelect: 'none' }}>Verificando credenciais...</div>
        </motion.div>
      </form>
      <p style={{ marginTop: 55, fontSize: 14, lineHeight: '35px', textAlign: 'center', ...hideElementStyle }}>
        <b>Ainda não tem uma conta?</b>{' '}
        <Button type="link" to={RoutePaths.REGISTER} tabIndex={6}>
          Crie agora mesmo
        </Button>
      </p>
    </LoginLayout>
  )
}

export default Login
