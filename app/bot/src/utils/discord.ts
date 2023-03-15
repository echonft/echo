import { InvalidChannelIdError } from '../errors/invalid-channel-id-error'
import { R } from '@mobily/ts-belt'
import { Client, TextChannel } from 'discord.js'
import { call, identity, invoker, isNil, pipe, prop, useWith } from 'ramda'

export const getDiscordChannel: (client: Client, channelId: string) => Promise<TextChannel> = (client, channelId) => {
  const cachedChannel = client.channels.cache.get(channelId)
  if (isNil(cachedChannel)) {
    return pipe(useWith(call, [pipe(prop('channels'), invoker(1, 'fetch')), identity]), R.fromPromise)(
      client,
      channelId
    ).then((result) => {
      const channel = R.getExn(result)
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
