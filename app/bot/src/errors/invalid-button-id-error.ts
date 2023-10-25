import { InteractionError } from '@echo/bot/errors/interaction-error'
import { type InteractionReplyOptions } from 'discord.js'
import i18next from 'i18next'
import { isEmpty, isNil } from 'ramda'

export class InvalidButtonIdError extends InteractionError {
  constructor(buttonId?: string | null) {
    super(isNil(buttonId) || isEmpty(buttonId) ? 'empty button id' : `invalid button id: ${buttonId}`)
  }

  getInteractionReplyOptions(): InteractionReplyOptions {
    return {
      content: i18next.t('error.invalidButtonId'),
      ephemeral: true
    }
  }
}
