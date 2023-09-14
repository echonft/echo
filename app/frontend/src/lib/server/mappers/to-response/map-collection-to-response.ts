import type { CollectionResponse } from '@echo/api/types/responses/model/collection-response'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/firestore-nft-collection'
import { modifyUrlPropToString } from '@echo/utils/fp/modify-url-prop-to-string'
import { dissoc, modify, pick, pipe } from 'ramda'

export function mapCollectionToResponse(collection: Partial<FirestoreNftCollection>): CollectionResponse {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    modifyUrlPropToString<'bannerUrl', Partial<FirestoreNftCollection>>('bannerUrl'),
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
