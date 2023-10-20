import { InteractionError } from '@echo/bot/errors/interaction-error'
import { type InteractionReplyOptions } from 'discord.js'

export class BuyOwnListingError extends InteractionError {
  constructor(listingId: string) {
    super(`can't buy own listing: ${listingId}`)
  }

  getInteractionReplyOptions(): InteractionReplyOptions {
    return {
      content: "Can't buy own listing",
      ephemeral: true
    }
  }
}
