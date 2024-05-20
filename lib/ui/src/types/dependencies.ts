import type { AcceptOfferArgs } from '@echo/api/types/fetchers/accept-offer-args'
import type { CancelListingArgs } from '@echo/api/types/fetchers/cancel-listing-args'
import type { CancelOfferArgs } from '@echo/api/types/fetchers/cancel-offer-args'
import type { RejectOfferArgs } from '@echo/api/types/fetchers/reject-offer-args'
import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import type { SearchResult } from '@echo/model/types/search-result'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { HexString } from '@echo/utils/types/hex-string'
import type { AccountProvider } from '@echo/web3-dom/types/account-provider'
import type { ApproveErc721ContractArgs } from '@echo/web3-dom/types/approve-erc-721-contract-args'
import type { CreateOfferArgs } from '@echo/web3-dom/types/create-offer-args'
import type { GetErc721ContractApprovalArgs } from '@echo/web3-dom/types/get-erc-721-contract-approval-args'
import type { SignNonceArgs } from '@echo/web3-dom/types/sign-nonce-args'
import type { SignNonceResult } from '@echo/web3-dom/types/sign-nonce-result'
import type { SignInResponse, SignOutParams } from 'next-auth/react'

export interface Dependencies {
  acceptOffer: Fetcher<OfferResponse, AcceptOfferArgs>
  addWallet: Fetcher<WalletsResponse, AddWalletRequest>
  approveErc721Contract: Fetcher<HexString, ApproveErc721ContractArgs>
  cancelListing: Fetcher<ListingResponse, CancelListingArgs>
  cancelOffer: Fetcher<OfferResponse, CancelOfferArgs>
  createListing: Fetcher<ListingResponse, CreateListingRequest>
  createOffer: Fetcher<HexString, CreateOfferArgs>
  disconnectWallet: () => Promise<void>
  getAccount: AccountProvider
  getErc721ContractApproval: Fetcher<boolean, GetErc721ContractApprovalArgs>
  getNonce: Fetcher<NonceResponse, never>
  getWallets: Fetcher<WalletsResponse, never>
  rejectOffer: Fetcher<OfferResponse, RejectOfferArgs>
  searchCollections: (query: string) => Promise<SearchResult<string>[]>
  searchUsers: (query: string) => Promise<SearchResult<string>[]>
  signIn: () => Promise<SignInResponse | undefined>
  signNonce: Fetcher<SignNonceResult, SignNonceArgs>
  signOut: (options: SignOutParams<true> | undefined) => Promise<undefined>
  switchChain: () => Promise<void>
}
