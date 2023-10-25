import { InvalidButtonDataError } from '@echo/bot/errors/invalid-button-data-error'
import type { ButtonAction } from '@echo/bot/types/button-action'
import { drop, isEmpty } from 'ramda'

export function getButtonData(action: ButtonAction, splitId: string[]): string[] {
  if (splitId.length < 2) {
    throw new InvalidButtonDataError(action)
  }
  const data = drop(1, splitId)
  if (isEmpty(data)) {
    throw new InvalidButtonDataError(action)
  }
  return data
}
