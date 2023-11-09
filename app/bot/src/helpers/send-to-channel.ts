import type { MessageCreateOptions, MessagePayload, TextChannel } from 'discord.js'

export async function sendToChannel(channel: TextChannel, payload: string | MessagePayload | MessageCreateOptions) {
  await channel.send(payload)
}
