'use client'
import type { BaseOffer } from '@echo/model/types/offer'
import type { Erc20Token, TokenBalance } from '@echo/model/types/token'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'
import type { AcceptOfferArgs } from '@echo/web3-dom/services/accept-offer'
import type { ApproveErc721ContractArgs } from '@echo/web3-dom/services/approve-erc721-contract'
import type { AreNftsInEscrowArgs } from '@echo/web3-dom/services/are-nfts-in-escrow'
import type { CancelOfferArgs } from '@echo/web3-dom/services/cancel-offer'
import type { AccountResult } from '@echo/web3-dom/services/get-account'
import type { GetEchoTradingFeesArgs } from '@echo/web3-dom/services/get-echo-trading-fees'
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
  approveErc721Contract: (args: ApproveErc721ContractArgs) => Promise<HexString>
  areNftsInEscrow: (args: AreNftsInEscrowArgs) => Promise<boolean>
  cancelOffer: (args: CancelOfferArgs) => Promise<HexString>
  createOffer: (offer: BaseOffer) => Promise<HexString>
  disconnectWallet: () => Promise<void>
  getAccount: () => AccountResult
  getErc20TokenBalance: (token: Erc20Token) => Promise<TokenBalance<Erc20Token>>
  getAllErc20TokenBalances: (tokens: NonEmptyArray<Erc20Token>) => Promise<NonEmptyArray<TokenBalance<Erc20Token>>>
  getEchoTradingFees: (args: GetEchoTradingFeesArgs) => Promise<bigint>
  getErc721ContractApproval: (args: GetErc721ContractApprovalArgs) => Promise<boolean>
  login: (args: SignInArgs) => Promise<Nullable<SignInResponse>>
  logout: (options?: LogoutOptions) => Promise<Nullable<Record<'url', string>>>
  redeemOffer: (args: RedeemOfferArgs) => Promise<HexString>
  signNonce: (args: SignNonceArgs) => Promise<SignNonceResult>
  swap: (args: SwapArgs) => Promise<HexString>
  switchChain: () => Promise<void>
  watchAccount: (onChange: (account: AccountResult, prevAccount: AccountResult) => void) => VoidFunction
}

interface Props {
  dependencies: Dependencies
}

export const dependenciesContext = createContext<Nullable<StoreApi<Dependencies>>>(undefined)

export const DependenciesProvider: React.FunctionComponent<PropsWithChildren<Props>> = ({ children, dependencies }) => {
  const store = create<Dependencies>()(() => dependencies)
  return <dependenciesContext.Provider value={store}>{children}</dependenciesContext.Provider>
}
