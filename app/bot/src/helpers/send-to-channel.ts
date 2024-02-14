import { getChannel } from '@echo/bot/helpers/get-channel'
import { Client, type MessageCreateOptions, type MessagePayload } from 'discord.js'

export async function sendToChannel(
  client: Client,
  channelId: string,
  payload: string | MessagePayload | MessageCreateOptions
) {
  const channel = await getChannel(client, channelId)
  await channel.send(payload)
}
