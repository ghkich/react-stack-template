import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { RoutePaths } from '../../app/routes'
import Button from '../../components/Button/Button'
import FormItem from '../../components/FormItem/FormItem'
import Input from '../../components/Input/Input'
import Title from '../../components/Title/Title'
import LoginLayout from '../../layouts/LoginLayout/LoginLayout'
import { registerActions } from '../../state/register/slice'

type FormData = {
  cnpj: string
}

const RegisterCnpj: React.FC = () => {
  const { handleSubmit, register, errors } = useForm<FormData>()
  const history = useHistory()
  const dispatch = useDispatch()
  const onSubmit = handleSubmit(({ cnpj }) => {
    dispatch(registerActions.setCnpj(cnpj))
    history.push(RoutePaths.REGISTER_CNPJ_2)
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
      <form onSubmit={onSubmit}>
        <Title level={2} style={{ marginBottom: 20 }}>
          Qual seu CNPJ?
        </Title>
        <FormItem label="CNPJ" feedback={errors.cnpj && 'Digite um CNPJ válido'}>
          <Input
            name="cnpj"
            autoComplete="off"
            ref={register({
              required: 'Required',
            })}
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
