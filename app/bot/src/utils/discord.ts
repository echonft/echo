import { InvalidChannelIdError } from '../errors/invalid-channel-id-error'
import { Client, TextChannel } from 'discord.js'
import { isNil } from 'ramda'

export const getDiscordChannel: (client: Client, channelId: string) => Promise<TextChannel> = (client, channelId) => {
  const cachedChannel = client.channels.cache.get(channelId)
  if (isNil(cachedChannel)) {
    return client.channels.fetch(channelId).then((channel) => {
      if (isNil(channel)) {
        throw new InvalidChannelIdError(channelId)
      }
      return channel as TextChannel
    })
  }
  return Promise.resolve(cachedChannel as TextChannel)
}

//         ifElse(
//   pipe(useWith(call, [pipe(path(['channels', 'cache']), invoker(1, 'get')), identity]), isNil),
//   pipe(
//     applySpec({channelId: , channel: }),
//     andThen(when(pipe(prop('channel'), isNil), always(Promise.reject(new InvalidChannelIdError(channelId)))))),
//     R.fromPromise
//   ),
//   pipe(useWith(call, [pipe(path(['channels', 'cache']), invoker(1, 'get')), identity]), toPromise, R.fromPromise)
// )
