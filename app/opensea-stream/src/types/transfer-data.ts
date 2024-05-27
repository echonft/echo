import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { NftIndex } from '@echo/model/types/nft-index'
import type { Nullable } from '@echo/utils/types/nullable'

/**
 * Cleaned data from a transfer event.
 * from and to can be undefined, if so, the users are not in our db
 */
export interface TransferData {
  from: Nullable<WalletDocumentData>
  to: Nullable<WalletDocumentData>
  nftIndex: NftIndex
}
