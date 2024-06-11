import { botLogger } from '@echo/bot/constants/bot-logger'
import { TextChannel } from 'discord.js'
import { isNil } from 'ramda'

export async function getThread(channel: TextChannel, threadId: string) {
  try {
    const thread = await channel.threads.fetch(threadId)
    if (isNil(thread)) {
      return undefined
    }
    return thread
  } catch (err) {
    botLogger.error({ msg: `could not get thread ${threadId} in channel ${channel.id}`, error: err })
    return undefined
  }
}
