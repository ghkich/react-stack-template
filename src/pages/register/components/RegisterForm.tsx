import { cnpj as cnpjUtils, cpf as cpfUtils } from 'cpf-cnpj-validator'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { RoutePaths } from '../../../app/routes'
import Button from '../../../components/Button/Button'
import Checkbox from '../../../components/Checkbox/Checkbox'
import FormError from '../../../components/FormError/FormError'
import FormItem from '../../../components/FormItem/FormItem'
import FormSubmit from '../../../components/FormSubmit/FormSubmit'
import Input from '../../../components/Input/Input'
import { useCreateAccount } from '../../../state/register/requests'

interface RegisterFormProps {
  document: {
    type: 'cpf' | 'cnpj'
    number: string
  }
}

type FormData = {
  name: string
  corporate_name?: string
  email: string
  phone: string
  password: string
  password_repeat: string
}

const RegisterForm: React.FC<RegisterFormProps> = ({ document }) => {
  const createAccount = useCreateAccount()
  const history = useHistory()
  const [termsAccepted, setTermsAccepted] = useState(false)
  const { handleSubmit, register, control, watch, errors } = useForm<FormData>()

  const isPJ = document.type === 'cnpj'
  const documentNumber = isPJ ? cnpjUtils.strip(document.number, true) : cpfUtils.strip(document.number, true)

  const onSubmit = handleSubmit(({ name, corporate_name, email, phone, password }) => {
    createAccount.call({
      user_name: name,
      ...(isPJ && {
        corporate_name,
      }),
      customer_document_number: documentNumber,
      user_email: email,
      user_password: password,
      user_phone: phone.replace(/[ _().-]/g, ''),
      customer_entity_type: isPJ ? 'PJ' : 'PF',
    })
  })

  return (
    <form onSubmit={onSubmit}>
      {createAccount.error && <FormError error={createAccount.error} />}
      <FormItem label="Seu nome" feedback={errors.name && 'Informe seu nome'}>
        <Input
          name="name"
          autoComplete="off"
          ref={register({
            required: 'Obrigatório',
          })}
          autoFocus
        />
      </FormItem>
      {isPJ && (
        <FormItem label="Razão social" feedback={errors.corporate_name && 'Informe a Razão social da sua empresa'}>
          <Input
            name="corporate_name"
            autoComplete="off"
            ref={register({
              required: 'Obrigatório',
            })}
          />
        </FormItem>
      )}
      <FormItem label="E-mail" feedback={errors.email && 'Informe um email válido'}>
        <Input
          name="email"
          autoComplete="off"
          ref={register({
            required: 'Obrigatório',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'invalid email address',
            },
          })}
        />
      </FormItem>
      <FormItem label="Telefone">
        <Controller
          as={Input}
          control={control}
          type="tel"
          name="phone"
          mask="(99) 99999-9999"
          autoComplete="off"
          defaultValue=""
        />
      </FormItem>
      <FormItem label="Senha" feedback={errors.password && 'Informe uma senha'}>
        <Input
          name="password"
          type="password"
          autoComplete="new-password"
          ref={register({
            required: 'Obrigatório',
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
      <FormSubmit
        status={createAccount.status}
        loadingMessage="Criando conta..."
        onSuccess={() => history.push(RoutePaths.LOGIN + '?conta-criada=1')}
        onError={() => createAccount.resetStatus()}
        delayResponse={10000000}
        disabled={!termsAccepted}
        style={{ marginBottom: 75 }}
      >
        Confirmar
      </FormSubmit>
    </form>
  )
}

export default RegisterForm
