import { InvalidButtonIdError } from '@echo/bot/errors/invalid-button-id-error'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { isEmpty, split } from 'ramda'

export function splitButtonId(customId: Nullable<string>): string[] {
  if (isNilOrEmpty(customId)) {
    throw new InvalidButtonIdError()
  }
  const buttonParts = split('-', customId)
  if (isEmpty(buttonParts)) {
    throw new InvalidButtonIdError(customId)
  }
  return buttonParts
}
