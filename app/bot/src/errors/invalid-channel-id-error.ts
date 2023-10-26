import { InteractionError } from '@echo/bot/errors/interaction-error'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { type InteractionReplyOptions } from 'discord.js'
import i18next from 'i18next'

export class InvalidChannelIdError extends InteractionError {
  constructor(channelId: string | null) {
    super(isNilOrEmpty(channelId) ? 'empty channel id' : `invalid channel id: ${channelId}`)
  }

  getInteractionReplyOptions(): InteractionReplyOptions {
    return {
      content: i18next.t('error.invalidChannelId'),
      ephemeral: true
    }
  }
}
