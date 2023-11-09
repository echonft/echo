import type { AnyThreadChannel, ThreadChannel } from 'discord.js'

export async function archiveThread(thread: AnyThreadChannel<boolean> | ThreadChannel<boolean>) {
  await thread.setArchived(true)
}
