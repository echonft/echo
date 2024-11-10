import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { frontendRouteMatch } from '@echo/routing/helpers/frontend/frontend-route-match'
import type { Path } from '@echo/routing/types/path'

import type { Dependencies } from '@echo/ui/types/providers/dependencies'
import { acceptOffer } from '@echo/web3-dom/services/accept-offer'
import { approveErc721Contract } from '@echo/web3-dom/services/approve-erc721-contract'
import { areNftsInEscrow } from '@echo/web3-dom/services/are-nfts-in-escrow'
import { cancelOffer } from '@echo/web3-dom/services/cancel-offer'
import { createOffer } from '@echo/web3-dom/services/create-offer'
import { disconnectWallet } from '@echo/web3-dom/services/disconnect-wallet'
import { getAccount, watchAccount } from '@echo/web3-dom/services/get-account'
import { getAllErc20TokenBalances } from '@echo/web3-dom/services/get-all-erc20-token-balances'
import { getEchoTradingFees } from '@echo/web3-dom/services/get-echo-trading-fees'
import { getErc20TokenBalance } from '@echo/web3-dom/services/get-erc20-token-balance'
import { getErc721ContractApproval } from '@echo/web3-dom/services/get-erc721-contract-approval'
import { redeemOffer } from '@echo/web3-dom/services/redeem-offer'
import { signNonce } from '@echo/web3-dom/services/sign-nonce'
import { swap } from '@echo/web3-dom/services/swap'
import { switchChain } from '@echo/web3-dom/services/switch-chain'
import { signIn, type SignInResponse, signOut } from 'next-auth/react'
import { isNil } from 'ramda'

function login(): Promise<SignInResponse | undefined> {
  return signIn('discord')
}

function logout(path: Path): Promise<Record<'url', string> | undefined> {
  const route = frontendRouteMatch(path)
  if (!isNil(route) && route.secure) {
    return signOut({ redirectTo: frontendRoutes.base.home.getUrl() })
  }
  return signOut()
}

export const dependencies: Dependencies = {
  acceptOffer,
  approveErc721Contract,
  areNftsInEscrow,
  cancelOffer,
  createOffer,
  disconnectWallet,
  getAccount: getAccount,
  getAllErc20TokenBalances,
  getEchoTradingFees,
  getErc20TokenBalance,
  getErc721ContractApproval,
  login,
  logout,
  redeemOffer,
  signNonce,
  swap,
  switchChain,
  watchAccount
}
