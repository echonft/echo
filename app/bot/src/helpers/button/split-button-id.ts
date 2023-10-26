import { InvalidButtonIdError } from '@echo/bot/errors/invalid-button-id-error'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { isEmpty, split } from 'ramda'

export function splitButtonId(customId: string | null): string[] {
  if (isNilOrEmpty(customId)) {
    throw new InvalidButtonIdError()
  }
  const buttonParts = split('-', customId)
  if (isEmpty(buttonParts)) {
    throw new InvalidButtonIdError(customId)
  }
  return buttonParts
}
