import { InteractionError } from '@echo/bot/errors/interaction-error'
import { type InteractionReplyOptions } from 'discord.js'
import { isEmpty, isNil } from 'ramda'

export class InvalidChannelIdError extends InteractionError {
  constructor(channelId?: string | null) {
    super(isNil(channelId) || isEmpty(channelId) ? 'empty channel id' : `invalid channel id: ${channelId}`)
  }

  getInteractionReplyOptions(): InteractionReplyOptions {
    return {
      content: 'Invalid channel id.',
      ephemeral: true
    }
  }
}
