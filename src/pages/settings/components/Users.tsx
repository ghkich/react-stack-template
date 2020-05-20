import React, {useState} from 'react'
import {useForm} from 'react-hook-form'

import Alert from '../../../components/Alert/Alert'
import Avatar from '../../../components/Avatar/Avatar'
import Button from '../../../components/Button/Button'
import Form from '../../../components/Form/Form'
import FormError from '../../../components/FormError/FormError'
import FormItem from '../../../components/FormItem/FormItem'
import FormSubmit from '../../../components/FormSubmit/FormSubmit'
import Input from '../../../components/Input/Input'
import Text from '../../../components/Text/Text'
import Title from '../../../components/Title/Title'
import ToggleButton from '../../../components/ToggleButton/ToggleButton'
import {useAddUser, useDeleteUser, useUpdateUser, useUsersQuery} from '../../../state/users/queries'
import styles from './Users.module.scss'

interface Props {}

type FormData = {
  email: string
  name: string
  password: string
}

const Users: React.FC<Props> = (props) => {
  const [canOrderServices, setCanOrderServices] = useState(0)
  const [canInsertCredits, setCanInsertCredits] = useState(0)
  const [canSeeInvoices, setCanSeeInvoices] = useState(0)
  const [canSeeReports, setCanSeeReports] = useState(0)
  const [isAdmin, setIsAdmin] = useState(0)
  const {handleSubmit, register, errors} = useForm<FormData>()
  const {data: users, status, fetching, error} = useUsersQuery()
  const addUser = useAddUser()
  const updateUser = useUpdateUser()
  const deleteUser = useDeleteUser()

  const onSubmit = handleSubmit(({email, name, password}) => {
    if (canInsertCredits) {
      console.log('teste')
    }
    addUser.call({
      email,
      name,
      password,
      phone: '',
      can_insert_credits: canInsertCredits,
      can_see_reports: canSeeReports,
      can_see_invoices: canSeeInvoices,
      can_order_services: canOrderServices,
      is_admin: isAdmin,
    })
  })

  return (
    <div>
      <Title level={4} as="h2" uppercase>
        Adicionar usuários
      </Title>
      <Text style={{maxWidth: 580}}>
        Você pode adicionar até 10 usuários. Caso necessite de mais,{' '}
        <Button type="link" href="/contato">
          entre em contato
        </Button>{' '}
        para conhecer nosso atendimento exclusivo para empresas.
      </Text>
      {addUser.error && <FormError error={addUser.error} />}
      {addUser.status === 'success' && (
        <Alert type="success" message="Usuário adicionado com sucesso" description="Ele já pode fazer o login" />
      )}
      <Form orientation="horizontal" onSubmit={onSubmit}>
        <FormItem label="Email" feedback={errors.email && 'Informe um e-mail válido'}>
          <Input
            name="email"
            ref={register({
              required: 'Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'invalid email address',
              },
            })}
            placeholder="E-mail"
          />
        </FormItem>
        <FormItem label="Nome" feedback={errors.name && 'Informe o nome do novo usuário'}>
          <Input
            name="name"
            ref={register({
              required: 'Required',
            })}
            placeholder="Nome"
          />
        </FormItem>
        <FormItem label="Senha" feedback={errors.password && 'Informe uma senha para o usuário'}>
          <Input
            name="password"
            ref={register({
              required: 'Required',
            })}
            placeholder="Senha"
          />
        </FormItem>
        <FormItem label="Permissões" flex>
          <ToggleButton onToggleActive={(active) => setIsAdmin(active ? 1 : 0)}>Administrador</ToggleButton>
          <ToggleButton onToggleActive={(active) => setCanOrderServices(active ? 1 : 0)}>Fazer pedidos</ToggleButton>
          <ToggleButton onToggleActive={(active) => setCanInsertCredits(active ? 1 : 0)}>Inserir créditos</ToggleButton>
          <ToggleButton onToggleActive={(active) => setCanSeeInvoices(active ? 1 : 0)}>Emitir faturas</ToggleButton>
          <ToggleButton onToggleActive={(active) => setCanSeeReports(active ? 1 : 0)}>Ver relatórios</ToggleButton>
        </FormItem>
        <FormSubmit status={addUser.status} style={{minWidth: 175}}>
          Adicionar
        </FormSubmit>
      </Form>
      <hr style={{marginBottom: 20}} />
      <Title level={4} as="h2" style={{marginBottom: 20}} uppercase>
        Usuários cadastrados
      </Title>
      {status === 'loading' && <div>Carregando usuários...</div>}
      {error && (
        <div>
          <h4>{error.message}</h4>
          {error.description && <p>{error.description}</p>}
        </div>
      )}
      <div className={styles.usersListContainer}>
        {users?.map((user) => (
          <div key={user.id} className={styles.usersListRow}>
            <div className={styles.usersListCol} style={{marginRight: 10}}>
              <Avatar username={user.name} />
            </div>
            <div className={styles.usersListCol} style={{width: 220}}>
              {user.name}
            </div>
            <div className={styles.usersListCol} style={{flex: 1}}>
              <ToggleButton
                active={user.is_admin}
                onToggleActive={(active) => updateUser.call(user.id, {is_admin: active ? 1 : 0})}
              >
                Administrador
              </ToggleButton>
              <ToggleButton
                active={user.can_order_services}
                onToggleActive={(active) => updateUser.call(user.id, {can_order_services: active ? 1 : 0})}
              >
                Fazer pedidos
              </ToggleButton>
              <ToggleButton
                active={user.can_insert_credits}
                onToggleActive={(active) => updateUser.call(user.id, {can_insert_credits: active ? 1 : 0})}
              >
                Inserir créditos
              </ToggleButton>
              <ToggleButton
                active={user.can_see_invoices}
                onToggleActive={(active) => updateUser.call(user.id, {can_see_invoices: active ? 1 : 0})}
              >
                Emitir faturas
              </ToggleButton>
              <ToggleButton
                active={user.can_see_reports}
                onToggleActive={(active) => updateUser.call(user.id, {can_see_reports: active ? 1 : 0})}
              >
                Ver relatórios
              </ToggleButton>
            </div>
            <div className={styles.usersListCol}>
              <Button
                type="primary"
                size="small"
                icon="trash"
                ghost
                onClick={() => {
                  if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
                    deleteUser.call(user.id)
                  }
                }}
              >
                Excluir usuário
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Users
