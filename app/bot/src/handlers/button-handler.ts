import { executeBuy } from '@echo/bot/commands/buy'
import { InvalidButtonActionError } from '@echo/bot/errors/invalid-button-action-error'
import { InvalidButtonDataError } from '@echo/bot/errors/invalid-button-data-error'
import { InvalidButtonIdError } from '@echo/bot/errors/invalid-button-id-error'
import { OfferNotFoundError } from '@echo/bot/errors/offer-not-found-error'
import { ButtonAction, buttonIdPrefixes } from '@echo/bot/types/models/button-action'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { ButtonComponent, ButtonInteraction } from 'discord.js'
import { andThen, curry, drop, isEmpty, isNil, pipe } from 'ramda'

function getSplitId(customId: string): string[] {
  try {
    return customId.split('-')
  } catch {
    throw new InvalidButtonIdError(customId)
  }
}

function getAction(splitId: string[]): ButtonAction {
  try {
    return splitId[0] as ButtonAction
  } catch {
    throw new InvalidButtonActionError()
  }
}

function getData(action: ButtonAction, splitId: string[]): string[] {
  let data: string[]
  try {
    data = drop(1, splitId)
  } catch {
    throw new InvalidButtonDataError(action)
  }
  if (isEmpty(data)) {
    throw new InvalidButtonDataError(action)
  }
  return data
}

export function executeForButton(interaction: ButtonInteraction) {
  const customId = (interaction.component as ButtonComponent).customId
  if (isNil(customId)) {
    throw new InvalidButtonIdError()
  }
  if (!buttonIdPrefixes.some((prefix) => customId.startsWith(prefix))) {
    throw new InvalidButtonIdError(customId)
  }

  const splitId = getSplitId(customId)
  const action = getAction(splitId)
  switch (action) {
    case ButtonAction.BUY:
      const data = getData(action, splitId)
      const offerId = data[0]
      if (isNil(offerId) || isEmpty(offerId)) {
        throw new OfferNotFoundError(offerId)
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return pipe(findOfferById, andThen(curry(executeBuy)(interaction)))(offerId)
    case ButtonAction.REJECT:
      // TODO
      throw new InvalidButtonActionError(action)
    default:
      throw new InvalidButtonActionError(action)
  }
}
