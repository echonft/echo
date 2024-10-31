'use client'
import type { CreateListingRequestBuilderArgs } from '@echo/api/types/request-builders/create-listing-request-builder-args'
import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import type { Erc20Token } from '@echo/model/types/erc20-token'
import type { SearchResult } from '@echo/model/types/search-result'
import type { Slug } from '@echo/model/types/slug'
import type { TokenBalance } from '@echo/model/types/token-balance'
import type { Username } from '@echo/model/types/username'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'
import type { AcceptOfferArgs } from '@echo/web3-dom/services/accept-offer'
import type { ApproveErc721ContractArgs } from '@echo/web3-dom/services/approve-erc721-contract'
import type { AreNftsInEscrowArgs } from '@echo/web3-dom/services/are-nfts-in-escrow'
import type { CancelOfferArgs } from '@echo/web3-dom/services/cancel-offer'
import type { CreateEchoOfferArgs } from '@echo/web3-dom/services/create-offer'
import type { AccountResult } from '@echo/web3-dom/services/get-account'
import type { GetAllTokensBalanceArgs } from '@echo/web3-dom/services/get-all-erc20-token-balances'
import type { GetEchoTradingFeesArgs } from '@echo/web3-dom/services/get-echo-trading-fees'
import type { GetErc20TokenBalanceArgs } from '@echo/web3-dom/services/get-erc20-token-balance'
import type { GetErc721ContractApprovalArgs } from '@echo/web3-dom/services/get-erc721-contract-approval'
import type { RedeemOfferArgs } from '@echo/web3-dom/services/redeem-offer'
import type { SignNonceArgs, SignNonceResult } from '@echo/web3-dom/services/sign-nonce'
import type { SwapArgs } from '@echo/web3-dom/services/swap'
import type { SignInResponse } from 'next-auth/react'
import type { NonEmptyArray } from 'ramda'
import React, { createContext, type PropsWithChildren } from 'react'
import { create, type StoreApi } from 'zustand'

export type SignInArgs =
  | {
      provider: 'credentials'
      params: {
        message: string
        signature: HexString
      }
    }
  | {
      provider: 'discord'
    }

export interface LogoutOptions {
  redirectTo?: string
  redirect?: boolean
}

export interface Dependencies {
  acceptOffer: (args: AcceptOfferArgs) => Promise<HexString>
  addWallet: (args: AddWalletRequest) => Promise<WalletsResponse>
  approveErc721Contract: (args: ApproveErc721ContractArgs) => Promise<HexString>
  areNftsInEscrow: (args: AreNftsInEscrowArgs) => Promise<boolean>
  cancelListing: (args: Record<'slug', Slug>) => Promise<ListingResponse>
  cancelOffer: (args: CancelOfferArgs) => Promise<HexString>
  createListing: (args: CreateListingRequestBuilderArgs) => Promise<ListingResponse>
  createOffer: (args: CreateEchoOfferArgs) => Promise<HexString>
  disconnectWallet: () => Promise<void>
  getAccount: () => AccountResult
  getErc20TokenBalance: (args: GetErc20TokenBalanceArgs) => Promise<TokenBalance<Erc20Token>>
  getAllErc20TokenBalances: (args: GetAllTokensBalanceArgs) => Promise<NonEmptyArray<TokenBalance<Erc20Token>>>
  getEchoTradingFees: (args: GetEchoTradingFeesArgs) => Promise<bigint>
  getErc721ContractApproval: (args: GetErc721ContractApprovalArgs) => Promise<boolean>
  getNonce: () => Promise<NonceResponse>
  getOfferByIdContract: (args: Record<'idContract', HexString>) => Promise<OfferResponse>
  getWallets: () => Promise<WalletsResponse>
  login: (args: SignInArgs) => Promise<Nullable<SignInResponse>>
  logout: (options?: LogoutOptions) => Promise<Nullable<Record<'url', string>>>
  redeemOffer: (args: RedeemOfferArgs) => Promise<HexString>
  rejectOffer: (args: Record<'slug', Slug>) => Promise<OfferResponse>
  searchCollections: (args: string) => Promise<SearchResult<Slug>[]>
  searchUsers: (args: string) => Promise<SearchResult<Username>[]>
  signNonce: (args: SignNonceArgs) => Promise<SignNonceResult>
  swap: (args: SwapArgs) => Promise<HexString>
  switchChain: () => Promise<void>
  watchAccount: (onChange: (account: AccountResult, prevAccount: AccountResult) => void) => void
}

interface Props {
  dependencies: Dependencies
}

export const dependenciesContext = createContext<Nullable<StoreApi<Dependencies>>>(undefined)

export const DependenciesProvider: React.FunctionComponent<PropsWithChildren<Props>> = ({ children, dependencies }) => {
  const store = create<Dependencies>()(() => dependencies)
  return <dependenciesContext.Provider value={store}>{children}</dependenciesContext.Provider>
}
