import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ApproveErc721ContractArgs } from '@echo/web3-dom/types/approve-erc721-contract-args'
import { pipe } from 'ramda'

export function approveErc721Contract(_args: ApproveErc721ContractArgs): Promise<HexString> {
  return pipe(toPromise, delayPromise(800))('0xwhatever')
}
