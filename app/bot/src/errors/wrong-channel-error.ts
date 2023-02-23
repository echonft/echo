import { InteractionError } from './interaction-error'
import { InteractionReplyOptions } from 'discord.js'
import { isEmpty, isNil } from 'ramda'

function getErrorMessage(guildId: string | null, channelId: string | null): string {
  if (isNil(channelId) || isEmpty(channelId)) {
    return 'empty channel id'
  } else {
    return `wrong channel (${channelId}) for ${
      isNil(guildId) || isEmpty(guildId) ? '(empty guild) id' : `guild ${guildId}`
    }`
  }
}
export class WrongChannelError extends InteractionError {
  constructor(guildId: string | null, channelId: string | null) {
    super(getErrorMessage(guildId, channelId))
  }

  getInteractionReplyOptions(): InteractionReplyOptions {
    return {
      content: 'Cannot use Echo in this channel.',
      ephemeral: true
    }
  }
}
