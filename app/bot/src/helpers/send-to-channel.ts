import { type MessageCreateOptions, type MessagePayload, type TextChannel } from 'discord.js'

export function sendToChannel(channel: TextChannel, payload: string | MessagePayload | MessageCreateOptions) {
  return channel.send(payload)
}
