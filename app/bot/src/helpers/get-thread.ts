import { TextChannel } from 'discord.js'
import { isNil } from 'ramda'

export async function getThread(channel: TextChannel, threadId: string) {
  const thread = await channel.threads.fetch(threadId)
  if (isNil(thread)) {
    return undefined
  }
  return thread
}
