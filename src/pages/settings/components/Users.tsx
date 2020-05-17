import React from 'react'

import Button from '../../../components/Button/Button'
import FormItem from '../../../components/FormItem/FormItem'
import FormSubmit from '../../../components/FormSubmit/FormSubmit'
import Input from '../../../components/Input/Input'
import Text from '../../../components/Text/Text'
import Title from '../../../components/Title/Title'
import ToggleButton from '../../../components/ToggleButton/ToggleButton'
import {useUsersQuery} from '../../../state/users/queries'

interface Props {}

const Users: React.FC<Props> = (props) => {
  const {data: users} = useUsersQuery()

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
      <form style={{display: 'flex'}}>
        <FormItem label="Novo usuário" style={{flex: 1}}>
          <Input placeholder="E-mail" />
        </FormItem>
        <FormItem label="Permissões" flex>
          <ToggleButton onToggleActive={(active) => console.log(active)}>Administrador</ToggleButton>
          <ToggleButton onToggleActive={(active) => console.log(active)}>Fazer pedidos</ToggleButton>
          <ToggleButton onToggleActive={(active) => console.log(active)}>Inserir créditos</ToggleButton>
          <ToggleButton onToggleActive={(active) => console.log(active)}>Emitir faturas</ToggleButton>
          <ToggleButton onToggleActive={(active) => console.log(active)}>Ver relatórios</ToggleButton>
        </FormItem>
        <FormSubmit status="idle" style={{width: 175}}>
          Adicionar
        </FormSubmit>
      </form>
      <hr />
      <Title level={4} as="h2" uppercase>
        Usuários cadastrados
      </Title>
      <table>
        {users?.map((user) => (
          <tr>
            <td>{user.name}</td>
            <td>
              <ToggleButton active={user.is_admin}>Administrador</ToggleButton>
              <ToggleButton active={user.can_order_document}>Fazer pedidos</ToggleButton>
              <ToggleButton active={user.can_order_document}>Inserir créditos</ToggleButton>
              <ToggleButton active={user.can_see_financial_transactions}>Emitir faturas</ToggleButton>
              <ToggleButton active={user.can_see_reports}>Ver relatórios</ToggleButton>
            </td>
            <td>
              <Button type="primary" size="small" icon="folder" ghost>
                Excluir usuário
              </Button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default Users
