import {
  CommandInteraction,
  type InteractionReplyOptions,
  InteractionResponse,
  MessageComponentInteraction
} from 'discord.js'

export class InteractionError extends Error {
  getInteractionReplyOptions(): InteractionReplyOptions {
    throw Error('Method getInteractionReplyOptions() has to be implemented')
  }

  reply(interaction: CommandInteraction | MessageComponentInteraction): Promise<InteractionResponse> {
    return interaction.reply(this.getInteractionReplyOptions())
  }
}
