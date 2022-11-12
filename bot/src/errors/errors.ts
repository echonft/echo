import { InteractionReplyOptions } from 'discord.js'

export enum DiscordErrors {
  NOT_CONFIGURED,
  WRONG_CHANNEL,
  INVALID_COMMAND,
  INVALID_BUTTON,
  BUY_OWN,
  OFFER_NOT_FOUND,
}

export function interactionReplyForError(error: DiscordErrors): InteractionReplyOptions {
  switch (error) {
    case DiscordErrors.INVALID_COMMAND:
      return { content: 'Invalid subcommand', ephemeral: true }
    case DiscordErrors.NOT_CONFIGURED:
      return {
        content: 'Echo is not configured properly, please advice an administrator of the server.',
        ephemeral: true,
      }
    case DiscordErrors.WRONG_CHANNEL:
      return {
        content: 'Cannot use Echo in this channel.',
        ephemeral: true,
      }
    case DiscordErrors.INVALID_BUTTON:
      return {
        content: 'Invalid button interaction.',
        ephemeral: true,
      }
    case DiscordErrors.BUY_OWN:
      return {
        content: "Can't buy own offer",
        ephemeral: true,
      }
    case DiscordErrors.OFFER_NOT_FOUND:
      return {
        content: 'Offer not found',
        ephemeral: true,
      }
  }
}
