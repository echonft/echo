import { InteractionError } from '@echo/bot/errors/interaction-error'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { type InteractionReplyOptions } from 'discord.js'
import i18next from 'i18next'

export class InvalidGuildIdError extends InteractionError {
  constructor(guildId: string | null) {
    super(isNilOrEmpty(guildId) ? 'empty guild id' : `invalid guild id: ${guildId}`)
  }

  getInteractionReplyOptions(): InteractionReplyOptions {
    return {
      content: i18next.t('error.invalidGuildId'),
      ephemeral: true
    }
  }
}
