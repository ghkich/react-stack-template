import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { ApiError } from '../../api/types'
import { uiActions } from './slice'

export const useDispatchNotification = () => {
  const dispatch = useDispatch()

  const dispatchErrorNotification = (error: ApiError) => {
    const notificationId = uuidv4()
    dispatch(
      uiActions.addNotification({
        id: notificationId,
        type: 'error',
        message: error.message,
        description: error.tip,
      }),
    )
  }
  return {
    error: dispatchErrorNotification,
  }
}
