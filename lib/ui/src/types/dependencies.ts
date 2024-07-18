import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import type { SignInResponse } from '@echo/auth/types/sign-in-response'
import type { Offer } from '@echo/model/types/offer'
import type { SearchResult } from '@echo/model/types/search-result'
import type { Slug } from '@echo/model/types/slug'
import type { Username } from '@echo/model/types/username'
import type { WithSlug } from '@echo/model/types/with-slug'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Logger } from '@echo/utils/types/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import type { AreNftsInEscrowArgs } from '@echo/web3-dom/helpers/are-nfts-in-escrow'
import type { GetEchoTradingFeesArgs } from '@echo/web3-dom/helpers/get-echo-trading-fees'
import type { AccountProvider } from '@echo/web3-dom/types/account-provider'
import type { ApproveErc721ContractArgs } from '@echo/web3-dom/types/approve-erc-721-contract-args'
import type { ContractCreateOfferArgs } from '@echo/web3-dom/types/contract-create-offer-args'
import type { ContractUpdateOfferArgs } from '@echo/web3-dom/types/contract-update-offer-args'
import type { GetErc721ContractApprovalArgs } from '@echo/web3-dom/types/get-erc-721-contract-approval-args'
import type { SignNonceArgs } from '@echo/web3-dom/types/sign-nonce-args'
import type { SignNonceResult } from '@echo/web3-dom/types/sign-nonce-result'

export interface Dependencies {
  addWallet: Fetcher<WalletsResponse, AddWalletRequest>
  approveErc721Contract: Fetcher<HexString, ApproveErc721ContractArgs>
  areNftsInEscrow: (args: AreNftsInEscrowArgs) => Promise<boolean>
  cancelListing: Fetcher<ListingResponse, WithSlug>
  contractAcceptOffer: Fetcher<HexString, ContractUpdateOfferArgs>
  contractCancelOffer: Fetcher<HexString, ContractUpdateOfferArgs>
  contractCreateOffer: Fetcher<HexString, ContractCreateOfferArgs>
  contractExecuteOffer: Fetcher<HexString, ContractUpdateOfferArgs>
  contractRedeemOffer: Fetcher<HexString, ContractUpdateOfferArgs>
  createListing: Fetcher<ListingResponse, CreateListingRequest>
  disconnectWallet: () => Promise<void>
  getAccount: AccountProvider
  getEchoTradingFees: (args: GetEchoTradingFeesArgs) => Promise<bigint>
  getErc721ContractApproval: Fetcher<boolean, GetErc721ContractApprovalArgs>
  getNonce: Fetcher<NonceResponse, never>
  getOfferByIdContract: Fetcher<OfferResponse, Pick<Offer, 'idContract'>>
  getWallets: Fetcher<WalletsResponse, never>
  logger?: Nullable<Logger>
  login: () => Promise<SignInResponse | undefined>
  logout: () => Promise<Record<'url', string> | undefined>
  rejectOffer: Fetcher<OfferResponse, WithSlug>
  searchCollections: (query: string) => Promise<SearchResult<Slug>[]>
  searchUsers: (query: string) => Promise<SearchResult<Username>[]>
  signNonce: Fetcher<SignNonceResult, SignNonceArgs>
  switchChain: () => Promise<void>
}
