import { InteractionError } from '@echo/bot/errors/interaction-error'
import { type InteractionReplyOptions } from 'discord.js'
import i18next from 'i18next'
import { isEmpty, isNil } from 'ramda'

export class InvalidButtonActionError extends InteractionError {
  constructor(action?: string | null) {
    super(isNil(action) || isEmpty(action) ? 'empty button action' : `invalid button action: ${action}`)
  }

  getInteractionReplyOptions(): InteractionReplyOptions {
    return {
      content: i18next.t('error.invalidButtonAction'),
      ephemeral: true
    }
  }
}
