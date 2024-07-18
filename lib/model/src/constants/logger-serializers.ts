import type { PartialCollection } from '@echo/model/types/collection'
import type { Listing } from '@echo/model/types/listing'
import type { ListingTarget } from '@echo/model/types/listing-target'
import type { PartialNft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import type { PartialUser, User, UserDiscordProfile } from '@echo/model/types/user'
import type { WithId } from '@echo/model/types/with-id'
import { propIsNotNil } from '@echo/utils/fp/prop-is-not-nil'
import type { DeepPartial } from '@echo/utils/types/deep-partial'
import type { LoggerSerializer } from '@echo/utils/types/logger-serializer'
import { map, modify, pick, pipe, when } from 'ramda'

function serializeCollection<T extends PartialCollection & Partial<WithId>>(collection: T): T {
  return pick(['id', 'contract', 'slug'], collection) as T
}
function serializeUserDiscordProfile(profile: Partial<UserDiscordProfile>): Partial<UserDiscordProfile> {
  return pick(['username'], profile)
}
function serializeUser<T extends PartialUser>(user: T): DeepPartial<User> {
  return when<T, T & Record<'discord', NonNullable<DeepPartial<UserDiscordProfile>>>, DeepPartial<User>>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    propIsNotNil('discord'),
    modify<'discord', NonNullable<DeepPartial<UserDiscordProfile>>, Partial<UserDiscordProfile>>(
      'discord',
      serializeUserDiscordProfile
    )
  )(user)
}
function serializeNft<T extends PartialNft & Partial<WithId>>(nft: T) {
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
  )(nft) as T
}
function serializeListing<T extends DeepPartial<Listing> & Partial<WithId>>(listing: T): T {
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
  )(listing) as T
}
function serializeListingTarget<T extends DeepPartial<ListingTarget>>(target: T): T {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return when(propIsNotNil('collection'), modify('collection', serializeCollection))(target) as T
}

function serializeOffer<T extends DeepPartial<Offer> & Partial<WithId>>(offer: T): T {
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
  )(offer) as T
}
export const modelLoggerSerializers: LoggerSerializer = {
  collection: serializeCollection,
  listing: serializeListing,
  offer: serializeOffer,
  nft: serializeNft,
  user: serializeUser
}
