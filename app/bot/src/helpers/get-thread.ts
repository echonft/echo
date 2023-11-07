import { TextChannel } from 'discord.js'
import { isNil } from 'ramda'

export async function getThread(channel: TextChannel, threadId: string) {
  const thread = await channel.threads.fetch(threadId)
  if (isNil(thread)) {
    throw Error(`thread ${threadId} not found in channel ${channel.id}`)
  }
  return thread
}
