import type { AnyThreadChannel, ThreadChannel } from 'discord.js'

export async function deleteThread(thread: AnyThreadChannel | ThreadChannel) {
  await thread.delete()
}
