import type { NftIndex } from '@echo/model/types/nft-index'
import type { Wallet } from '@echo/model/types/wallet'
import type { Nullable } from '@echo/utils/types/nullable'

/**
 * Cleaned data from a transfer event.
 * from and to can be undefined, if so, the users are not in our db
 */
export interface TransferData {
  from: Nullable<Wallet>
  to: Nullable<Wallet>
  nftIndex: NftIndex
}
