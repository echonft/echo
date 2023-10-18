import { InteractionError } from '@echo/bot/errors/interaction-error'
import { type InteractionReplyOptions } from 'discord.js'

export class UserNotFoundError extends InteractionError {
  constructor(username: string) {
    super(`user with username ${username} not found`)
  }

  getInteractionReplyOptions(): InteractionReplyOptions {
    return {
      content: 'User not found',
      ephemeral: true
    }
  }
}
