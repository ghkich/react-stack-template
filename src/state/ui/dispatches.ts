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

export const useAddDropdownOverlay = () => {
  const dispatch = useDispatch()

  const addDropdownOverlay = (menuItems: any[], top: number) => {
    const overlayId = uuidv4()
    dispatch(
      uiActions.addDropdown({
        id: overlayId,
        menuItems,
        top,
      }),
    )
  }
  return {
    addDropdownOverlay,
  }
}
