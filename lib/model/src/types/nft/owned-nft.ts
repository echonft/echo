import { User } from '../user'
import { Nft } from './nft'

export interface OwnedNft extends Nft {
  balance: number
  owner: User
}
