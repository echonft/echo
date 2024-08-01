import type { WithUsername } from '@echo/model/types/with-username'
import { propIsNotNil } from '@echo/utils/fp/prop-is-not-nil'
import type { LoggerSerializer } from '@echo/utils/types/logger-serializer'
import { map, modify, pick, pipe, when } from 'ramda'

function serializeCollection(collection: unknown) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pick(['id', 'contract', 'slug'], collection)
}
function serializeUserDiscordProfile(profile: WithUsername) {
  return pick(['username'], profile)
}
function serializeUser(user: unknown) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return when(propIsNotNil('discord'), modify('discord', serializeUserDiscordProfile))(user)
}
function serializeNft(nft: unknown) {
  // sometimes we might not have all the data needed to build the index, so lets clean the extra data that is
  // actually there, and keep the rest
  return pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    when(propIsNotNil('collection'), modify('collection', serializeCollection)),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    when(propIsNotNil('owner'), serializeUser),
    // just keep whatever is important, if it's there
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pick(['id', 'collection', 'owner', 'tokenId'])
  )(nft)
}
function serializeListing(listing: unknown) {
  return pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    when(propIsNotNil('creator'), modify('creator', serializeUser)),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    when(propIsNotNil('items'), modify('items', map(serializeNft))),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    when(propIsNotNil('target'), modify('target', serializeListingTarget))
  )(listing)
}
function serializeListingTarget(target: unknown) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return when(propIsNotNil('collection'), modify('collection', serializeCollection))(target)
}

function serializeOffer(offer: unknown) {
  return pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    when(propIsNotNil('receiverItems'), modify('items', map(serializeNft))),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    when(propIsNotNil('senderItems'), modify('items', map(serializeNft))),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    when(propIsNotNil('receiver'), modify('creator', serializeUser)),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    when(propIsNotNil('sender'), modify('creator', serializeUser))
  )(offer)
}
export const modelLoggerSerializers: LoggerSerializer = {
  collection: serializeCollection,
  listing: serializeListing,
  offer: serializeOffer,
  nft: serializeNft,
  user: serializeUser
}
