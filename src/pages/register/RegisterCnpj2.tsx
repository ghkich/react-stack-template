import React from 'react'
import { useForm } from 'react-hook-form'

import Button from '../../components/Button/Button'
import Checkbox from '../../components/Checkbox/Checkbox'
import FormItem from '../../components/FormItem/FormItem'
import Input from '../../components/Input/Input'
import Title from '../../components/Title/Title'
import LoginLayout from '../../layouts/LoginLayout/LoginLayout'
import { useRegisterState } from '../../state/register/slice'
import RegisterHeader from './components/RegisterHeader'

type FormData = {
  name: string
  email: string
  phone: string
  password: string
  password_repeat: string
}

const RegisterCnpj2: React.FC = () => {
  const { cpf } = useRegisterState()
  const { handleSubmit, register, watch, errors } = useForm<FormData>()
  const onSubmit = handleSubmit(({ name, email, phone, password, password_repeat }) => {
    console.log(name)
  })

  return (
    <LoginLayout
      customHeader={<RegisterHeader message={cpf} />}
      backgroundMessage={
        <>
          Sem dor de cabeça. <br />
          Documento é com a gente.
        </>
      }
    >
      <Title level={2} style={{ marginBottom: 20 }}>
        Crie sua conta de acesso
      </Title>
      <form onSubmit={onSubmit}>
        <FormItem label="Nome" feedback={errors.name && 'Informe seu nome'}>
          <Input
            name="name"
            autoComplete="off"
            ref={register({
              required: 'Required',
            })}
          />
        </FormItem>
        <FormItem label="E-mail" feedback={errors.email && 'Informe um email válido'}>
          <Input
            name="email"
            autoComplete="off"
            ref={register({
              required: 'Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'invalid email address',
              },
            })}
          />
        </FormItem>
        <FormItem label="Telefone">
          <Input name="phone" type="tel" autoComplete="off" ref={register()} />
        </FormItem>
        <FormItem label="Senha" feedback={errors.password && 'Informe uma senha'}>
          <Input
            name="password"
            type="password"
            autoComplete="new-password"
            ref={register({
              required: 'Required',
            })}
          />
        </FormItem>
        <FormItem
          label="Confirme sua senha"
          feedback={errors.password_repeat && 'Confirme sua senha deve ser igual a senha anterior'}
        >
          <Input
            name="password_repeat"
            type="password"
            autoComplete="new-password"
            ref={register({
              validate: (value) => value === watch('password') || 'The passwords do not match',
            })}
          />
        </FormItem>
        <FormItem>
          <Checkbox name="keepMeLoggedIn" ref={register()} tabIndex={3}>
            <span>
              Ao clicar em “confirmar” você está ciente e aceita os{' '}
              <Button type="link" href="#">
                Termos de Uso
              </Button>{' '}
              e a{' '}
              <Button type="link" href="#">
                Política de Privacidade.
              </Button>
            </span>
          </Checkbox>
        </FormItem>
        <Button type="primary" htmlType="submit" block>
          Confirmar
        </Button>
      </form>
    </LoginLayout>
  )
}

export default RegisterCnpj2
