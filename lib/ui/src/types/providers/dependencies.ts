import type { Address } from '@echo/model/types/address'
import type { HexString } from '@echo/model/types/hex-string'
import type { Nft } from '@echo/model/types/nft'
import type { BaseOffer, Offer } from '@echo/model/types/offer'
import type { Erc20Token, TokenBalance } from '@echo/model/types/token'
import type { Nullable } from '@echo/utils/types/nullable'
import type { OptionalRecord } from '@echo/utils/types/optional-record'
import type { AccountResult } from '@echo/web3-dom/services/get-account'
import type { GetErc721ContractApprovalArgs } from '@echo/web3-dom/services/get-erc721-contract-approval'
import type { SignNonceArgs, SignNonceResult } from '@echo/web3-dom/services/sign-nonce'
import type { SignInResponse } from 'next-auth/react'
import type { NonEmptyArray } from 'ramda'

export interface Dependencies {
  acceptOffer: (offerId: Offer['idContract']) => Promise<HexString>
  approveErc721Contract: (contract: Address) => Promise<HexString>
  areNftsInEscrow: (nfts: Nft[]) => Promise<boolean>
  cancelOffer: (offerId: Offer['idContract']) => Promise<HexString>
  createOffer: (offer: BaseOffer) => Promise<HexString>
  disconnectWallet: () => Promise<void>
  getAccount: () => AccountResult
  getErc20TokenBalance: (token: Erc20Token) => Promise<TokenBalance<Erc20Token>>
  getAllErc20TokenBalances: (tokens: NonEmptyArray<Erc20Token>) => Promise<NonEmptyArray<TokenBalance<Erc20Token>>>
  getEchoTradingFees: () => Promise<bigint>
  getErc721ContractApproval: (args: GetErc721ContractApprovalArgs) => Promise<boolean>
  login: (
    options: Record<'message', string> & Record<'signature', string> & OptionalRecord<'code', string>
  ) => Promise<Nullable<SignInResponse>>
  logout: () => Promise<Nullable<Record<'url', string>>>
  redeemOffer: (offerId: Offer['idContract']) => Promise<HexString>
  signNonce: (args: SignNonceArgs) => Promise<SignNonceResult>
  swap: (offerId: Offer['idContract']) => Promise<HexString>
  switchChain: () => Promise<void>
  watchAccount: (onChange: (account: AccountResult, prevAccount: AccountResult) => void) => VoidFunction
}
