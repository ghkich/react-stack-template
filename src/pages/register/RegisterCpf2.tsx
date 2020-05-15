import { cpf as cpfUtils } from 'cpf-cnpj-validator'
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RoutePaths } from '../../app/routes'
import LogoMessage from '../../components/LogoMessage/LogoMessage'
import Title from '../../components/Title/Title'
import LoginLayout from '../../layouts/LoginLayout/LoginLayout'
import RegisterForm from './components/RegisterForm'

const RegisterCpf2: React.FC = () => {
  const { cpf } = useParams()
  const history = useHistory()

  useEffect(() => {
    if (!cpfUtils.isValid(cpf, true)) {
      history.push(RoutePaths.REGISTER_CPF)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cpf])

  return (
    <LoginLayout
      customHeader={<LogoMessage message={`CPF: ${cpfUtils.format(cpf)}`} />}
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
      <RegisterForm document={{ type: 'cpf', number: cpf }} />
    </LoginLayout>
  )
}

export default RegisterCpf2
