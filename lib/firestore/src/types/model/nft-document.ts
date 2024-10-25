import type { Nft } from '@echo/model/types/nft'

export type NftDocument = Omit<Nft, 'owner' | 'pictureUrl'> & Partial<Pick<Nft, 'owner' | 'pictureUrl'>>
