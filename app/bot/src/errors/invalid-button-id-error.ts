import { InteractionError } from './interaction-error'
import { InteractionReplyOptions } from 'discord.js'
import { isEmpty, isNil } from 'ramda'

export class InvalidButtonIdError extends InteractionError {
  constructor(buttonId?: string | null) {
    super(isNil(buttonId) || isEmpty(buttonId) ? 'empty button id' : `invalid button id: ${buttonId}`)
  }

  getInteractionReplyOptions(): InteractionReplyOptions {
    return {
      content: 'Invalid button interaction.',
      ephemeral: true
    }
  }
}
