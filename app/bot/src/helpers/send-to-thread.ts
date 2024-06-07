import type { AnyThreadChannel, MessageCreateOptions, MessagePayload, ThreadChannel } from 'discord.js'

export async function sendToThread(
  thread: AnyThreadChannel | ThreadChannel,
  payload: string | MessagePayload | MessageCreateOptions
) {
  await thread.send(payload)
}
