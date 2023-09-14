import { InteractionError } from '@echo/bot/errors/interaction-error'
import { InteractionReplyOptions } from 'discord.js'
import { isEmpty, isNil } from 'ramda'

export class NotConfiguredError extends InteractionError {
  constructor(guildId: string | null) {
    super(
      isNil(guildId) || isEmpty(guildId) ? ' not configured (empty guild) id' : `not configured for guild ${guildId}`
    )
  }

  getInteractionReplyOptions(): InteractionReplyOptions {
    return {
      content: 'Echo is not configured properly, please advice an administrator of the server.',
      ephemeral: true
    }
  }
}
