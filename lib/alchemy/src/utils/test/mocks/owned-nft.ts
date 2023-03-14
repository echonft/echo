import { AlchemyOwnedNft } from '../../../types'
import { mockedNft } from './nft'

export const mockedOwnedNft: AlchemyOwnedNft = {
  ...mockedNft,
  balance: 1
}
