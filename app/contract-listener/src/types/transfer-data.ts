import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'

/**
 * Cleaned data from a transfer event.
 * from and to can be undefined, if so, the users are not in our db
 */
export interface TransferData {
  from: Nullable<WalletDocumentData>
  to: Nullable<WalletDocumentData>
  tokenId: number
  contractAddress: Lowercase<HexString>
  chain: ChainName
}
