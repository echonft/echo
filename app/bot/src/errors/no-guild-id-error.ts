import { InteractionError } from './interaction-error'
import { InteractionReplyOptions } from 'discord.js'

function getErrorMessage(): string {
  return 'empty guild id'
}
export class NoGuildIdError extends InteractionError {
  constructor() {
    super(getErrorMessage())
  }

  getInteractionReplyOptions(): InteractionReplyOptions {
    return {
      content: 'Trying to use echo from an wrong server',
      ephemeral: true
    }
  }
}
