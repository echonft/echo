import { BUTTON_ACTIONS } from '@echo/bot/constants/button-actions'
import { InvalidButtonActionError } from '@echo/bot/errors/invalid-button-action-error'
import type { ButtonAction } from '@echo/bot/types/button-action'
import { isIn } from '@echo/utils/fp/is-in'
import { isNil } from 'ramda'

export function getButtonAction(splitId: string[]): ButtonAction {
  const action = splitId[0]
  if (isNil(action) || !isIn(BUTTON_ACTIONS, action)) {
    throw new InvalidButtonActionError()
  }
  return action as ButtonAction
}
