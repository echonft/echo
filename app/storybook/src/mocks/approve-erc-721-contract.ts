import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ApproveErc721ContractArgs } from '@echo/web3-dom/types/approve-erc-721-contract-args'

export function approveErc721Contract(_args: ApproveErc721ContractArgs): Promise<HexString> {
  return delayPromise(Promise.resolve('0xwhatever'), 800)
}
