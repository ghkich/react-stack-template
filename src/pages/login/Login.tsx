import { AxiosResponse } from 'axios'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import Alert from '../../components/Alert/Alert'
import Button from '../../components/Button/Button'
import FormItem from '../../components/FormItem/FormItem'
import Input from '../../components/Input/Input'
import LoginLayout from '../../layouts/LoginLayout'
import { RoutePaths } from '../../routes'
import API from '../../state/api'
import { useAuthState } from '../../state/auth/AuthProvider'
import { Auth } from '../../state/auth/types'
import { enteringFromTop } from '../../utils/animation-utils'
import { setLocalItem } from '../../utils/storage-utils'

type FormData = {
  email: string
  password: string
  keepMeLoggedIn: boolean
}

const Login: React.FC = () => {
  const history = useHistory()
  const { setAuth } = useAuthState()
  const [authenticating, setAuthenticating] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { handleSubmit, register, errors } = useForm<FormData>()

  const onSubmit = handleSubmit(async ({ email, password, keepMeLoggedIn }) => {
    try {
      setAuthenticating(true)
      const response: AxiosResponse<Auth> = await API.post('users/login', { email, password })
      setAuth(response.data)
      setLocalItem('auth', response.data)
      if (keepMeLoggedIn) {
        //TODO: cookie!
      }
      history.push(RoutePaths.HOME)
    } catch (error) {
      if (error.response?.status === 403) {
        setErrorMessage('E-mail ou senha inválidos')
      } else {
        setErrorMessage(() => {
          throw new Error(error)
        })
      }
    } finally {
      setAuthenticating(false)
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
      {errorMessage && (
        <Alert
          type="error"
          message={errorMessage}
          description="Por favor, verifique as informações enviadas"
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
          <label>
            <input type="checkbox" name="keepMeLoggedIn" ref={register()} disabled={authenticating} tabIndex={3} />
            Continuar logado
          </label>
        </FormItem>
        <Button type="primary" htmlType="submit" loading={authenticating} block tabIndex={4}>
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
        <b>Ainda não tem uma conta?</b>{' '}
        <Button type="link" tabIndex={6}>
          Crie agora mesmo
        </Button>
      </p>
    </LoginLayout>
  )
}

export default Login
