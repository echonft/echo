import { InteractionError } from './interaction-error'
import { InteractionReplyOptions } from 'discord.js'
import { isEmpty, isNil } from 'ramda'

export class WrongChannelError extends InteractionError {
  constructor(guildId: string | null, channelId: string | null) {
    super(
      `wrong channel (${channelId}) for ${isNil(guildId) || isEmpty(guildId) ? '(empty guild) id' : `guild ${guildId}`}`
    )
  }

  getInteractionReplyOptions(): InteractionReplyOptions {
    return {
      content: 'Cannot use Echo in this channel.',
      ephemeral: true
    }
  }
}
