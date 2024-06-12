import { botLogger } from '@echo/bot/index'
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
    botLogger.error({ err, channel }, `could not get thread ${threadId}`)
    return undefined
  }
}
