import type { CreateListingRequestBuilderArgs } from '@echo/api/types/request-builders/create-listing-request-builder-args'
import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { GetOfferByIdContractRequest } from '@echo/api/types/requests/get-offer-by-id-contract-request'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import type { SignInResponse } from '@echo/auth/types/sign-in-response'
import type { SearchResult } from '@echo/model/types/search/search-result'
import type { Slug } from '@echo/model/types/slug'
import type { Erc20Token } from '@echo/model/types/token/erc20-token'
import type { TokenBalance } from '@echo/model/types/token/token-balance'
import type { Username } from '@echo/model/types/username'
import type { WithSlug } from '@echo/model/types/with-slug'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Logger } from '@echo/utils/types/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import type { AreNftsInEscrowArgs } from '@echo/web3-dom/helpers/are-nfts-in-escrow'
import type { GetAllTokensBalanceArgs } from '@echo/web3-dom/helpers/get-all-erc20-token-balances'
import type { GetEchoTradingFeesArgs } from '@echo/web3-dom/helpers/get-echo-trading-fees'
import type { GetErc20TokenBalanceArgs } from '@echo/web3-dom/helpers/get-erc20-token-balance'
import type { AccountProvider } from '@echo/web3-dom/types/account-provider'
import type { ApproveErc721ContractArgs } from '@echo/web3-dom/types/approve-erc721-contract-args'
import type { ContractCreateOfferArgs } from '@echo/web3-dom/types/contract-create-offer-args'
import type { ContractUpdateOfferArgs } from '@echo/web3-dom/types/contract-update-offer-args'
import type { GetErc721ContractApprovalArgs } from '@echo/web3-dom/types/get-erc721-contract-approval-args'
import type { SignNonceArgs } from '@echo/web3-dom/types/sign-nonce-args'
import type { SignNonceResult } from '@echo/web3-dom/types/sign-nonce-result'
import type { NonEmptyArray } from 'ramda'

export interface Dependencies {
  addWallet: Fetcher<WalletsResponse, AddWalletRequest>
  approveErc721Contract: Fetcher<HexString, ApproveErc721ContractArgs>
  areNftsInEscrow: Fetcher<boolean, AreNftsInEscrowArgs>
  cancelListing: Fetcher<ListingResponse, WithSlug>
  contractAcceptOffer: Fetcher<HexString, ContractUpdateOfferArgs>
  contractCancelOffer: Fetcher<HexString, ContractUpdateOfferArgs>
  contractCreateOffer: Fetcher<HexString, ContractCreateOfferArgs>
  contractExecuteOffer: Fetcher<HexString, ContractUpdateOfferArgs>
  contractRedeemOffer: Fetcher<HexString, ContractUpdateOfferArgs>
  createListing: Fetcher<ListingResponse, CreateListingRequestBuilderArgs>
  disconnectWallet: Fetcher<void>
  getAccount: AccountProvider
  getErc20TokenBalance: Fetcher<TokenBalance<Erc20Token>, GetErc20TokenBalanceArgs>
  getAllErc20TokenBalances: Fetcher<NonEmptyArray<TokenBalance<Erc20Token>>, GetAllTokensBalanceArgs>
  getEchoTradingFees: Fetcher<bigint, GetEchoTradingFeesArgs>
  getErc721ContractApproval: Fetcher<boolean, GetErc721ContractApprovalArgs>
  getNonce: Fetcher<NonceResponse>
  getOfferByIdContract: Fetcher<OfferResponse, GetOfferByIdContractRequest>
  getWallets: Fetcher<WalletsResponse>
  logger: Nullable<Logger>
  login: Fetcher<Nullable<SignInResponse>>
  logout: Fetcher<Nullable<Record<'url', string>>>
  rejectOffer: Fetcher<OfferResponse, WithSlug>
  searchCollections: Fetcher<SearchResult<Slug>[], string>
  searchUsers: Fetcher<SearchResult<Username>[], string>
  signNonce: Fetcher<SignNonceResult, SignNonceArgs>
  switchChain: Fetcher<void>
}
