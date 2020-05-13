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
  cpf: string
}

const RegisterCpf: React.FC = () => {
  const { handleSubmit, register, errors } = useForm<FormData>()
  const history = useHistory()
  const dispatch = useDispatch()
  const onSubmit = handleSubmit(({ cpf }) => {
    dispatch(registerActions.setCpf(cpf))
    history.push(RoutePaths.REGISTER_CPF_2)
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
          Qual seu CPF?
        </Title>
        <FormItem label="CPF" feedback={errors.cpf && 'Digite um CPF válido'}>
          <Input
            name="cpf"
            autoComplete="off"
            ref={register({
              required: 'Required',
            })}
          />
        </FormItem>
        <FormItem>
          <Button type="link" to={RoutePaths.REGISTER_CNPJ} replace>
            Quero cadastrar minha empresa
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

export default RegisterCpf
