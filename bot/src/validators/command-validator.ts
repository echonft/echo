import { getCollection } from '@echo/firebase/getters/get-collection'
import { DiscordErrors, interactionReplyForError } from '@errors/errors'
import { ChatInputCommandInteraction } from 'discord.js'
import { isNil } from 'ramda'

export async function validateCommand(command: ChatInputCommandInteraction): Promise<boolean> {
  const collection = await getCollection(command.guildId || '')
  // Check if collection exist in DB
  if (isNil(collection)) {
    await command.reply(interactionReplyForError(DiscordErrors.NOT_CONFIGURED))
    return false
  }
  // Check if proper channel is used
  if (command.channelId !== collection.channelId) {
    await command.reply(interactionReplyForError(DiscordErrors.WRONG_CHANNEL))
    return false
  }
  return true
}
