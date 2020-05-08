import React, { useState } from 'react'

import { RoutePaths } from '../../../app/routes'
import Button from '../../../components/Button/Button'
import LoginLayout from '../../../layouts/LoginLayout/LoginLayout'
import FormDocument from './components/FormDocument'
import FormRegister, { RegisterDocument } from './components/FormRegister'

const Register: React.FC = () => {
  const [document, setDocument] = useState<RegisterDocument>()
  const [editingDocument, setEditingDocument] = useState(false)

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
      {document && !editingDocument ? (
        <FormRegister document={document} onBack={() => setEditingDocument(true)} />
      ) : (
        <>
          <FormDocument
            document={document}
            onChange={(document) => {
              setEditingDocument(false)
              setDocument(document)
            }}
          />
          <p style={{ marginTop: 55, fontSize: 14, textAlign: 'center' }}>
            <b>Já tem uma conta?</b>{' '}
            <Button type="link" to={RoutePaths.LOGIN}>
              Faça seu login
            </Button>
          </p>
        </>
      )}
    </LoginLayout>
  )
}

export default Register
