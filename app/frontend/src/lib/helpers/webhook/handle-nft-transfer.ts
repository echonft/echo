import { getWalletByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { processInEscrowTransfer } from '@echo/frontend/lib/helpers/webhook/process-in-escrow-transfer'
import { processInTransfer } from '@echo/frontend/lib/helpers/webhook/process-in-transfer'
import { processOutEscrowTransfer } from '@echo/frontend/lib/helpers/webhook/process-out-escrow-transfer'
import { processOutTransfer } from '@echo/frontend/lib/helpers/webhook/process-out-transfer'
import type { NftTransfer } from '@echo/frontend/lib/types/webhook/nft-transfer'
import type { Wallet } from '@echo/model/types/wallet'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { isEcho } from '@echo/web3/helpers/is-echo'
import { assoc, isNil, modify, otherwise, pipe } from 'ramda'

export type HandleNftTransferArgs = WithLoggerType<Record<'transfer', NftTransfer>>
function getWalletFromFirestore(wallet: Wallet) {
  return pipe(
    getWalletByAddress,
    otherwise((err) => {
      captureAndLogError(err, { logObject: { wallet }, message: 'could not get wallet from Firestore' })
      return undefined
    })
  )(wallet)
}
export async function handleNftTransfer(args: HandleNftTransferArgs): Promise<void> {
  const {
    transfer: { from, to }
  } = args
  if (isEcho(from)) {
    return processOutEscrowTransfer(args)
  }
  if (isEcho(to)) {
    return processInEscrowTransfer(args)
  }
  const fromWallet = await getWalletFromFirestore(from)
  const toWallet = await getWalletFromFirestore(to)
  if (!isNil(toWallet)) {
    return pipe(
      modify<'transfer', NftTransfer, Omit<NftTransfer, 'to'> & Record<'to', WalletDocumentData>>(
        'transfer',
        assoc('to', toWallet)
      ),
      processInTransfer
    )(args)
  }
  if (!isNil(fromWallet)) {
    return processOutTransfer(args)
  }
  return
}
