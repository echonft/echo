import { NftCollectionResponse } from '@echo/api'
import { NftCollection } from '@echo/firestore'
import { modifyUrlPropToString, removeUndefinedProps } from '@echo/utils'
import { dissoc, modify, pick, pipe } from 'ramda'

export function mapNftCollection(collection: NftCollection): NftCollectionResponse {
  return pipe(
    removeUndefinedProps,
    modifyUrlPropToString('bannerUrl'),
    modifyUrlPropToString('blurUrl'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('contract', pick(['address', 'chainId', 'tokenType'])),
    dissoc('discordGuild'),
    modifyUrlPropToString('discordUrl'),
    modifyUrlPropToString('openSeaUrl'),
    modifyUrlPropToString('profilePictureUrl'),
    modifyUrlPropToString('websiteUrl')
  )(collection) as NftCollectionResponse
}
