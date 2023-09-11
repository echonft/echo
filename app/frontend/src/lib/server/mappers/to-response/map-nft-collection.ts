import type { NftCollectionResponse } from '@echo/api'
import type { NftCollection } from '@echo/firestore-types'
import { modifyUrlPropToString } from '@echo/utils'
import { dissoc, modify, pick, pipe } from 'ramda'

export function mapNftCollection(collection: Partial<NftCollection>): NftCollectionResponse {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    modifyUrlPropToString<'bannerUrl', Partial<NftCollection>>('bannerUrl'),
    modifyUrlPropToString('blurUrl'),
    modifyUrlPropToString('discordUrl'),
    modifyUrlPropToString('openSeaUrl'),
    modifyUrlPropToString('profilePictureUrl'),
    modifyUrlPropToString('websiteUrl'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('contract', pick(['address', 'chainId', 'tokenType'])),
    dissoc('discordGuild')
  )(collection)
}
