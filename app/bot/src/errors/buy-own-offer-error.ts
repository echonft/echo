import { InteractionError } from './interaction-error'
import { InteractionReplyOptions } from 'discord.js'

export class BuyOwnOfferError extends InteractionError {
  constructor(offerId: string) {
    super(`can't buy own offer: ${offerId}`)
  }

  getInteractionReplyOptions(): InteractionReplyOptions {
    return {
      content: "Can't buy own offer",
      ephemeral: true
    }
  }
}
