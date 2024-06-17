import { isEscrowing } from '@echo/frontend/lib/helpers/webhook/is-escrowing'
import { userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { getWalletMockByUsername } from '@echo/model/mocks/wallet/wallet-mock'
import type { Wallet } from '@echo/model/types/wallet'
import type { ChainName } from '@echo/utils/types/chain-name'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { assoc, pipe } from 'ramda'

describe('helpers - isEscrowing', () => {
  const chain: ChainName = 'blast'
  const wallet: Wallet = pipe(userMockJohnnyUsername, getWalletMockByUsername, assoc('chain', chain))()
  const otherWallet: Wallet = pipe(userMockCrewUsername, getWalletMockByUsername, assoc('chain', chain))()
  const echoWallet: Wallet = { address: getEchoAddress(chain), chain }

  it('returns true if TO is Echo', () => {
    expect(isEscrowing({ transfer: { from: echoWallet, to: wallet } })).toBeTruthy()
  })
  it('returns true if FROM is Echo', () => {
    expect(isEscrowing({ transfer: { from: wallet, to: echoWallet } })).toBeTruthy()
  })
  it('returns false if nothing is from Echo', () => {
    expect(isEscrowing({ transfer: { from: wallet, to: otherWallet } })).toBeFalsy()
  })
})
