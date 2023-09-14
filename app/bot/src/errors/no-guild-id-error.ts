import { InteractionError } from '@echo/bot/errors/interaction-error'
import { InteractionReplyOptions } from 'discord.js'

function getErrorMessage(): string {
  return 'Trying to use echo from an wrong server'
}
export class NoGuildIdError extends InteractionError {
  constructor() {
    super(getErrorMessage())
  }

  getInteractionReplyOptions(): InteractionReplyOptions {
    return {
      content: getErrorMessage(),
      ephemeral: true
    }
  }
}
