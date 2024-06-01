import type { Wallet } from '@echo/model/types/wallet'
import type { HexString } from '@echo/utils/types/hex-string'

export interface GetErc721ContractApprovalArgs {
  contract: Wallet
  owner: HexString
}
