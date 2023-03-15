import {
  CommandInteraction,
  InteractionReplyOptions,
  InteractionResponse,
  MessageComponentInteraction
} from 'discord.js'

export class InteractionError extends Error {
  getInteractionReplyOptions(): InteractionReplyOptions {
    throw Error('Method getInteractionReplyOptions() has to be implemented')
  }

  reply(interaction: CommandInteraction | MessageComponentInteraction): Promise<InteractionResponse> {
    // eslint-disable-next-line no-console
    console.error(this.message)
    return interaction.reply(this.getInteractionReplyOptions())
  }
}
