import React from 'react'
import { useForm } from 'react-hook-form'

import { getUrlParam } from '../../../../_mock/utils'
import { RoutePaths } from '../../../../app/routes'
import Button from '../../../../components/Button/Button'
import FormItem from '../../../../components/FormItem/FormItem'
import Input from '../../../../components/Input/Input'
import Title from '../../../../components/Title/Title'
import { RegisterDocument } from './FormRegister'

export const COMPANY = 'empresa'

type FormData = {
  document: string
}

type FormProps = {
  document?: RegisterDocument
  onChange: (document: RegisterDocument) => void
}

const FormDocument: React.FC<FormProps> = ({ document, onChange }) => {
  const { handleSubmit, register, errors } = useForm<FormData>()
  const isCompany = getUrlParam('tipo') === COMPANY
  const documentLabel = isCompany ? 'CNPJ' : 'CPF'

  const onSubmit = handleSubmit(({ document }) => {
    const documentType = isCompany ? 'cnpj' : 'cpf'
    onChange({ type: documentType, value: document })
  })

  return (
    <form onSubmit={onSubmit}>
      <Title level={2} style={{ marginBottom: 20 }}>
        Qual seu {documentLabel}?
      </Title>
      <FormItem label={documentLabel} feedback={errors.document && `Digite um ${documentLabel} válido`}>
        <Input
          name="document"
          autoComplete="off"
          defaultValue={document?.value}
          ref={register({
            required: 'Required',
          })}
        />
      </FormItem>
      <FormItem>
        {isCompany ? (
          <Button type="link" to={RoutePaths.REGISTER_CPF}>
            Não tenho CNPJ
          </Button>
        ) : (
          <Button type="link" to={`${RoutePaths.REGISTER_CPF}?tipo=${COMPANY}`}>
            Quero cadastrar minha empresa
          </Button>
        )}
      </FormItem>
      <Button type="primary" htmlType="submit" block>
        Continuar
      </Button>
    </form>
  )
}

export default FormDocument
