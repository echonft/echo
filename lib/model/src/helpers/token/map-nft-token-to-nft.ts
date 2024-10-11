import type { Nft, NftCollection } from '@echo/model/types/nft'
import type { NftToken, NftTokenCollection } from '@echo/model/types/token'
import type { User } from '@echo/model/types/user'
import { assoc, dissoc, modify, pipe } from 'ramda'

export function mapNftTokenToNft(token: NftToken, owner: User): Omit<Nft, 'attributes'> {
  const { contract } = token
  return pipe(
    modify<'collection', NftTokenCollection, NftCollection>('collection', assoc('contract', contract)),
    dissoc('contract'),
    assoc('owner', owner)
  )(token)
}
