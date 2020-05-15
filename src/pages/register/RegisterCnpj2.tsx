import { cnpj as cnpjUtils } from 'cpf-cnpj-validator'
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RoutePaths } from '../../app/routes'
import LogoMessage from '../../components/LogoMessage/LogoMessage'
import Title from '../../components/Title/Title'
import LoginLayout from '../../layouts/LoginLayout/LoginLayout'
import RegisterForm from './components/RegisterForm'

const RegisterCnpj2: React.FC = () => {
  const history = useHistory()
  const { cnpj } = useParams()

  useEffect(() => {
    if (!cnpjUtils.isValid(cnpj, true)) {
      history.push(RoutePaths.REGISTER_CNPJ)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cnpj])

  return (
    <LoginLayout
      customHeader={<LogoMessage message={`CNPJ: ${cnpjUtils.format(cnpj)}`} />}
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
      <RegisterForm document={{ type: 'cnpj', number: cnpj }} />
    </LoginLayout>
  )
}

export default RegisterCnpj2
