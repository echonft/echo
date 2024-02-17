import type { AnyThreadChannel, ThreadChannel } from 'discord.js'

export async function deleteThread(thread: AnyThreadChannel<boolean> | ThreadChannel<boolean>) {
  await thread.delete()
}
