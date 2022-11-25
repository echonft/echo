import { InteractionError } from './interaction-error'
import { InteractionReplyOptions } from 'discord.js'
import { isEmpty, isNil } from 'rambda'

export class OfferNotFoundError extends InteractionError {
  constructor(offerId: string | undefined) {
    super(isNil(offerId) || isEmpty(offerId) ? 'empty offer id' : `offer id ${offerId} not found`)
  }

  getInteractionReplyOptions(): InteractionReplyOptions {
    return {
      content: 'Offer not found',
      ephemeral: true
    }
  }
}
