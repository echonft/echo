import { InteractionError } from '@echo/bot/errors/interaction-error'
import { InteractionReplyOptions } from 'discord.js'
import { isEmpty, isNil } from 'ramda'

export class InvalidButtonActionError extends InteractionError {
  constructor(action?: string | null) {
    super(isNil(action) || isEmpty(action) ? 'empty button action' : `invalid button action: ${action}`)
  }

  getInteractionReplyOptions(): InteractionReplyOptions {
    return {
      content: 'Invalid button action.',
      ephemeral: true
    }
  }
}
