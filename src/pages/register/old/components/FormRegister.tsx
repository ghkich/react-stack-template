import React from 'react'
import { useForm } from 'react-hook-form'

import Button from '../../../../components/Button/Button'
import Checkbox from '../../../../components/Checkbox/Checkbox'
import FormItem from '../../../../components/FormItem/FormItem'
import Input from '../../../../components/Input/Input'
import Title from '../../../../components/Title/Title'

type FormData = {
  name: string
}

export interface RegisterDocument {
  type: 'cpf' | 'cnpj'
  value: string
}

type FormProps = {
  document: RegisterDocument
  onBack: () => void
}

const FormRegister: React.FC<FormProps> = ({ document, onBack }) => {
  const { handleSubmit, register, errors } = useForm<FormData>()
  const onSubmit = handleSubmit(({ name }) => {
    console.log(name)
  })

  return (
    <form onSubmit={onSubmit}>
      <Button onClick={onBack}>Voltar</Button>
      <Title level={2} style={{ marginBottom: 20 }}>
        {document.type}
      </Title>
      {document.value}
      <FormItem label="Nome" feedback={errors.name && 'Digite um CNPJ válido'}>
        <Input
          name="name"
          autoComplete="off"
          ref={register({
            required: 'Required',
          })}
        />
      </FormItem>
      <FormItem label="Nome" feedback={errors.name && 'Digite um CNPJ válido'}>
        <Input
          name="name"
          autoComplete="off"
          ref={register({
            required: 'Required',
          })}
        />
      </FormItem>
      <FormItem label="Nome" feedback={errors.name && 'Digite um CNPJ válido'}>
        <Input
          name="name"
          autoComplete="off"
          ref={register({
            required: 'Required',
          })}
        />
      </FormItem>
      <FormItem label="Nome" feedback={errors.name && 'Digite um CNPJ válido'}>
        <Input
          name="name"
          autoComplete="off"
          ref={register({
            required: 'Required',
          })}
        />
      </FormItem>
      <FormItem label="Nome" feedback={errors.name && 'Digite um CNPJ válido'}>
        <Input
          name="name"
          autoComplete="off"
          ref={register({
            required: 'Required',
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
  )
}

export default FormRegister
