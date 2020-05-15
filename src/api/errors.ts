import { ApiError, ApiStatus } from './types'

export const ERRORS: Record<string, ApiError> = {
  invalidCredentials: {
    message: 'E-mail ou senha inválidos',
    description: 'Por favor, verifique as informações enviadas',
  },
  internalServer: {
    message: 'Falha de comunicação com o servidor',
    description: 'Tente novamente mais tarde',
  },
  dataValidation: {
    message: 'Informações inválidas',
    description: 'Por favor, verifique as informações enviadas',
  },
  unexpected: {
    message: 'Algo inesperado aconteceu',
    description: 'Tente novamente mais tarde',
  },
  forbiddenAccess: {
    message: 'Sem permissão de acesso',
    description: 'Fale com o administrador',
  },
  fetchFailed: {
    message: 'Não foi possível carregar essa informação',
    description: 'Tente recarregar a página',
  },
}

export const getQueryError = (status: ApiStatus, err: unknown) => {
  let error: ApiError | undefined

  if (status === 'error') {
    error = ERRORS.fetchFailed
  }

  return error
}
