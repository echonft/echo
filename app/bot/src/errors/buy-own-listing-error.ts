import { InteractionError } from './interaction-error'
import { InteractionReplyOptions } from 'discord.js'

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
