import { InteractionError } from '@echo/bot/errors/interaction-error'
import { InteractionReplyOptions } from 'discord.js'
import { isEmpty, isNil } from 'ramda'

export class InvalidButtonDataError extends InteractionError {
  constructor(action: string, data?: string | null) {
    super(
      isNil(data) || isEmpty(data)
        ? `empty data for button action ${action}`
        : `empty data for button action ${action}: ${data}`
    )
  }

  getInteractionReplyOptions(): InteractionReplyOptions {
    return {
      content: 'Invalid button data.',
      ephemeral: true
    }
  }
}
