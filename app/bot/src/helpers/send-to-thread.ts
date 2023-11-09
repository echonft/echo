import type { AnyThreadChannel, MessageCreateOptions, MessagePayload, ThreadChannel } from 'discord.js'

export async function sendToThread(
  thread: AnyThreadChannel<boolean> | ThreadChannel<boolean>,
  payload: string | MessagePayload | MessageCreateOptions
) {
  await thread.send(payload)
}
