import React, { useEffect, useState } from 'react'
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
import { useCreateAccount } from '../../state/register/requests'
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
  const { cnpj } = useRegisterState()
  const createAccountRequest = useCreateAccount()
  const history = useHistory()
  const [termsAccepted, setTermsAccepted] = useState(false)
  const { handleSubmit, register, watch, errors } = useForm<FormData>()

  useEffect(() => {
    if (!cnpj) {
      history.push(RoutePaths.REGISTER_CNPJ)
    }
  }, [cnpj])

  const onSubmit = handleSubmit(({ name, email, phone, password }) => {
    createAccountRequest.call({
      customer_name: name,
      customer_document_number: cnpj,
      customer_entity_type: 'PJ',
      user_name: name,
      user_email: email,
      user_password: password,
    })
  })

  return (
    <LoginLayout
      customHeader={<RegisterHeader message={`CNPJ: ${cnpj}`} />}
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
      {createAccountRequest.error && (
        <Alert
          type="error"
          message={createAccountRequest.error.message}
          description={createAccountRequest.error.tip}
          style={{ marginBottom: 20 }}
        />
      )}
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
          <Checkbox checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)}>
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
        <ButtonLoader
          status={createAccountRequest.status}
          loadingMessage="Criando conta..."
          onSuccess={() => console.log('criada com sucesso')}
          disabled={!termsAccepted}
        >
          Confirmar
        </ButtonLoader>
      </form>
    </LoginLayout>
  )
}

export default RegisterCnpj2
