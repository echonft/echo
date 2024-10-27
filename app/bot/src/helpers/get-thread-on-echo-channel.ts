import { getEchoChannel } from '@echo/bot/helpers/get-echo-channel'
import { getThread } from '@echo/bot/helpers/get-thread'
import { type Client } from 'discord.js'
import { isNil } from 'ramda'

interface GetThreadOnEchoChannelArgs {
  readonly client: Client
  readonly threadId: string
}

export async function getThreadOnEchoChannel(args: GetThreadOnEchoChannelArgs) {
  const { client, threadId } = args
  const channel = await getEchoChannel(client)
  if (isNil(channel)) {
    return undefined
  }
  return getThread({ channel, threadId })
}
