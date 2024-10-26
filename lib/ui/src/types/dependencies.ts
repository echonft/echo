import type { CreateListingRequestBuilderArgs } from '@echo/api/types/request-builders/create-listing-request-builder-args'
import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import type { SignInResponse } from '@echo/auth/types/sign-in-response'
import type { Erc20Token } from '@echo/model/types/erc20-token'
import type { SearchResult } from '@echo/model/types/search-result'
import type { Slug } from '@echo/model/types/slug'
import type { TokenBalance } from '@echo/model/types/token-balance'
import type { Username } from '@echo/model/types/username'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Logger } from '@echo/utils/types/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import type { AcceptOfferArgs } from '@echo/web3-dom/services/accept-offer'
import type { ApproveErc721ContractArgs } from '@echo/web3-dom/services/approve-erc721-contract'
import type { AreNftsInEscrowArgs } from '@echo/web3-dom/services/are-nfts-in-escrow'
import type { CancelOfferArgs } from '@echo/web3-dom/services/cancel-offer'
import type { CreateEchoOfferArgs } from '@echo/web3-dom/services/create-offer'
import type { AccountProvider } from '@echo/web3-dom/services/get-account'
import type { GetAllTokensBalanceArgs } from '@echo/web3-dom/services/get-all-erc20-token-balances'
import type { GetEchoTradingFeesArgs } from '@echo/web3-dom/services/get-echo-trading-fees'
import type { GetErc20TokenBalanceArgs } from '@echo/web3-dom/services/get-erc20-token-balance'
import type { GetErc721ContractApprovalArgs } from '@echo/web3-dom/services/get-erc721-contract-approval'
import type { RedeemOfferArgs } from '@echo/web3-dom/services/redeem-offer'
import type { SignNonceArgs, SignNonceResult } from '@echo/web3-dom/services/sign-nonce'
import type { SwapArgs } from '@echo/web3-dom/services/swap'
import type { NonEmptyArray } from 'ramda'

export interface Dependencies {
  acceptOffer: Fetcher<HexString, AcceptOfferArgs>
  addWallet: Fetcher<WalletsResponse, AddWalletRequest>
  approveErc721Contract: Fetcher<HexString, ApproveErc721ContractArgs>
  areNftsInEscrow: Fetcher<boolean, AreNftsInEscrowArgs>
  cancelListing: Fetcher<ListingResponse, Record<'slug', Slug>>
  cancelOffer: Fetcher<HexString, CancelOfferArgs>
  createListing: Fetcher<ListingResponse, CreateListingRequestBuilderArgs>
  createOffer: Fetcher<HexString, CreateEchoOfferArgs>
  disconnectWallet: Fetcher<void>
  getAccount: AccountProvider
  getErc20TokenBalance: Fetcher<TokenBalance<Erc20Token>, GetErc20TokenBalanceArgs>
  getAllErc20TokenBalances: Fetcher<NonEmptyArray<TokenBalance<Erc20Token>>, GetAllTokensBalanceArgs>
  getEchoTradingFees: Fetcher<bigint, GetEchoTradingFeesArgs>
  getErc721ContractApproval: Fetcher<boolean, GetErc721ContractApprovalArgs>
  getNonce: Fetcher<NonceResponse>
  getOfferByIdContract: Fetcher<OfferResponse, Record<'idContract', HexString>>
  getWallets: Fetcher<WalletsResponse>
  logger: Nullable<Logger>
  login: Fetcher<Nullable<SignInResponse>>
  logout: Fetcher<Nullable<Record<'url', string>>>
  redeemOffer: Fetcher<HexString, RedeemOfferArgs>
  rejectOffer: Fetcher<OfferResponse, Record<'slug', Slug>>
  searchCollections: Fetcher<SearchResult<Slug>[], string>
  searchUsers: Fetcher<SearchResult<Username>[], string>
  signNonce: Fetcher<SignNonceResult, SignNonceArgs>
  swap: Fetcher<HexString, SwapArgs>
  switchChain: Fetcher<void>
}
