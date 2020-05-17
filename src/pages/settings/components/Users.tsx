import React, {useState} from 'react'
import {useForm} from 'react-hook-form'

import Button from '../../../components/Button/Button'
import FormItem from '../../../components/FormItem/FormItem'
import FormSubmit from '../../../components/FormSubmit/FormSubmit'
import Input from '../../../components/Input/Input'
import Text from '../../../components/Text/Text'
import Title from '../../../components/Title/Title'
import ToggleButton from '../../../components/ToggleButton/ToggleButton'
import {useAddUser, useDeleteUser, useUpdateUser, useUsersQuery} from '../../../state/users/queries'

interface Props {}

type FormData = {
  email: string
}

const Users: React.FC<Props> = (props) => {
  const [canOrderServices, setCanOrderServices] = useState(0)
  const [canInsertCredits, setCanInsertCredits] = useState(0)
  const [canSeeInvoices, setCanSeeInvoices] = useState(0)
  const [canSeeReports, setCanSeeReports] = useState(0)
  const [isAdmin, setIsAdmin] = useState(0)
  const {handleSubmit, register} = useForm<FormData>()
  const {data: users, status, fetching, error} = useUsersQuery()
  const addUser = useAddUser()
  const updateUser = useUpdateUser()
  const deleteUser = useDeleteUser()

  const onSubmit = handleSubmit(({email}) => {
    addUser.call({
      email,
      password: '123',
      phone: '229999293929',
      name: 'sem nome',
      can_insert_credits: canInsertCredits,
      can_see_reports: canSeeReports,
      can_see_invoices: canSeeInvoices,
      can_order_services: canOrderServices,
      is_admin: isAdmin,
    })
  })

  return (
    <div>
      {addUser.error && <p>{addUser.error.description}</p>}
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
      <form style={{display: 'flex'}} onSubmit={onSubmit}>
        <FormItem label="Novo usuário" style={{flex: 1}}>
          <Input name="email" ref={register()} placeholder="E-mail" />
        </FormItem>
        <FormItem label="Permissões" flex>
          <ToggleButton onToggleActive={(active) => setIsAdmin(active ? 1 : 0)}>Administrador</ToggleButton>
          <ToggleButton onToggleActive={(active) => setCanOrderServices(active ? 1 : 0)}>Fazer pedidos</ToggleButton>
          <ToggleButton onToggleActive={(active) => setCanInsertCredits(active ? 1 : 0)}>Inserir créditos</ToggleButton>
          <ToggleButton onToggleActive={(active) => setCanSeeInvoices(active ? 1 : 0)}>Emitir faturas</ToggleButton>
          <ToggleButton onToggleActive={(active) => setCanSeeReports(active ? 1 : 0)}>Ver relatórios</ToggleButton>
        </FormItem>
        <FormSubmit status={addUser.status} style={{width: 175}}>
          Adicionar
        </FormSubmit>
      </form>
      <hr />
      <Title level={4} as="h2" uppercase>
        Usuários cadastrados
      </Title>
      {status === 'loading' && <div>Carregando usuários...</div>}
      {error && (
        <div>
          <h4>{error.message}</h4>
          {error.description && <p>{error.description}</p>}
        </div>
      )}
      <table>
        {users?.map((user) => (
          <tr>
            <td>{user.name}</td>
            <td>
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
            </td>
            <td>
              <Button
                type="primary"
                size="small"
                icon="folder"
                ghost
                onClick={() => {
                  if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
                    deleteUser.call(user.id)
                  }
                }}
              >
                Excluir usuário
              </Button>
            </td>
          </tr>
        ))}
      </table>
      {fetching ? <span> Fetching...</span> : null}
    </div>
  )
}

export default Users
