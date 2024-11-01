import { cancelListing } from '@echo/api/fetchers/cancel-listing'
import { createListing } from '@echo/api/fetchers/create-listing'
import { getOfferByIdContract } from '@echo/api/fetchers/get-offer-by-id-contract'
import { rejectOffer } from '@echo/api/fetchers/reject-offer'
import { searchCollections } from '@echo/api/fetchers/search-collections'
import { searchUsers } from '@echo/api/fetchers/search-users'
import type { Dependencies, LogoutOptions, SignInArgs } from '@echo/ui/components/providers/dependencies-provider'
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

function login(args: SignInArgs): Promise<SignInResponse | undefined> {
  if (args.provider === 'credentials') {
    return signIn('credentials', { redirect: false, ...args.params })
  }
  return signIn('discord')
}

function logout(options?: LogoutOptions): Promise<Record<'url', string> | undefined> {
  return signOut(options)
}

export const dependencies: Dependencies = {
  acceptOffer,
  approveErc721Contract,
  areNftsInEscrow,
  cancelListing,
  cancelOffer,
  createListing,
  createOffer,
  disconnectWallet,
  getAccount: getAccount,
  getAllErc20TokenBalances,
  getEchoTradingFees,
  getErc20TokenBalance,
  getErc721ContractApproval,
  getOfferByIdContract,
  login,
  logout,
  redeemOffer,
  rejectOffer,
  searchCollections,
  searchUsers,
  signNonce,
  swap,
  switchChain,
  watchAccount
}
