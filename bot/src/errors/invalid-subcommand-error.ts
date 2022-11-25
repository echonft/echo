import { InteractionError } from './interaction-error'
import { InteractionReplyOptions } from 'discord.js'
import { isEmpty, isNil } from 'rambda'

export class InvalidSubcommandError extends InteractionError {
  constructor(subcommand: string | null) {
    super(isNil(subcommand) || isEmpty(subcommand) ? 'empty subcommand' : `invalid subcommand: ${subcommand}`)
  }

  getInteractionReplyOptions(): InteractionReplyOptions {
    return { content: 'Invalid subcommand', ephemeral: true }
  }
}
