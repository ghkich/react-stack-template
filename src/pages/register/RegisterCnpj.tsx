import { cnpj as cnpjUtils } from 'cpf-cnpj-validator'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { RoutePaths } from '../../app/routes'
import Button from '../../components/Button/Button'
import FormItem from '../../components/FormItem/FormItem'
import Input from '../../components/Input/Input'
import Title from '../../components/Title/Title'
import LoginLayout from '../../layouts/LoginLayout/LoginLayout'

type FormData = {
  cnpj: string
}

const RegisterCnpj: React.FC = () => {
  const { handleSubmit, control, errors } = useForm<FormData>()
  const history = useHistory()

  const onSubmit = handleSubmit(({ cnpj }) => {
    history.push(RoutePaths.REGISTER_CNPJ + '/' + cnpjUtils.strip(cnpj, true))
  })

  return (
    <LoginLayout
      backgroundMessage={
        <>
          Crie uma conta e solicite documentos ou faça <br />
          pesquisas em cartórios <br />
          de todo o Brasil.
        </>
      }
    >
      <Title level={2} style={{ marginBottom: 20 }}>
        Qual seu CNPJ?
      </Title>
      <form onSubmit={onSubmit}>
        <FormItem label="CNPJ" feedback={errors.cnpj && 'Digite um CNPJ válido'}>
          <Controller
            as={Input}
            control={control}
            name="cnpj"
            mask="99.999.999/9999-99"
            autoComplete="off"
            autoFocus
            rules={{
              required: 'Obrigatório',
              validate: (value) => cnpjUtils.isValid(value, true),
            }}
            defaultValue=""
          />
        </FormItem>
        <FormItem>
          <Button type="link" to={RoutePaths.REGISTER_CPF} replace>
            Não tenho CNPJ
          </Button>
        </FormItem>
        <Button type="primary" htmlType="submit" block>
          Continuar
        </Button>
      </form>
      <p style={{ marginTop: 55, fontSize: 14, textAlign: 'center' }}>
        <b>Já tem uma conta?</b>{' '}
        <Button type="link" to={RoutePaths.LOGIN}>
          Faça seu login
        </Button>
      </p>
    </LoginLayout>
  )
}

export default RegisterCnpj
