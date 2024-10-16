import type { Nft, NftIndex } from '@echo/model/types/nft/nft'
import type { User } from '@echo/model/types/user/user'

export type OwnedNft = Omit<Nft, 'owner'> & Record<'owner', User>
export type OwnedNftIndex = NftIndex & Record<'owner', User>
