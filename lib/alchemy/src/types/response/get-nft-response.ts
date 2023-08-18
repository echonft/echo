import { Nft } from '@echo/firestore'

export type GetNftResponse = Omit<Nft, 'id' | 'blurUrl' | 'collection' | 'openSeaUrl' | 'owner'> & {
  contractAddress: string
}
