import { ButtonType } from '../Button/Button'
import { IconType } from '../Icon/Icon'
import { FormSubmitStatus } from './FormSubmit'

export function getPropsByStatus(status: FormSubmitStatus) {
  let iconType: IconType | null = null
  let buttonType: ButtonType = 'primary'

  if (status === 'loading') {
    iconType = 'loading'
    buttonType = 'default'
  }

  if (status === 'success') {
    iconType = 'checkmark-circle'
    buttonType = 'success'
  }

  if (status === 'error') {
    iconType = 'cross-circle'
    buttonType = 'danger'
  }

  return {
    iconType,
    buttonType,
  }
}
