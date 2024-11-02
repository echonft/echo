'use server'
import { AuthError } from '@echo/backend/errors/messages/auth-error'
import { getAuthUser } from '@echo/backend/helpers/auth/get-auth-user'
import { assertItemsChain } from '@echo/backend/helpers/item/assert-items-chain'
import { assertUniqErc1155Items } from '@echo/backend/helpers/item/assert-uniq-erc1155-items'
import { assertUniqErc721Items } from '@echo/backend/helpers/item/assert-uniq-erc721-items'
import { createListingArgsSchema } from '@echo/backend/validators/create-listing-args-schema'
import { listingDocumentToModel } from '@echo/firestore/converters/listing-document-to-model'
import { userDocumentToModel } from '@echo/firestore/converters/user-document-to-model'
import { addListing, type AddListingArgs } from '@echo/firestore/crud/listing/add-listing'
import { getListingBySignature } from '@echo/firestore/crud/listing/get-listing-by-signature'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { ItemError } from '@echo/model/constants/errors/item-error'
import { ListingError } from '@echo/model/constants/errors/listing-error'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { UserError } from '@echo/model/constants/errors/user-error'
import { WalletError } from '@echo/model/constants/errors/wallet-error'
import { isErc1155Item } from '@echo/model/helpers/item/is-erc1155-item'
import { listingSignature } from '@echo/model/helpers/listing/listing-signature'
import type { Listing } from '@echo/model/types/listing'
import type { UserWithWallet } from '@echo/model/types/user'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import { getTokenBalance } from '@echo/web3/services/get-token-balance'
import { andThen, equals, filter, isNil, pipe, prop } from 'ramda'

export async function createListing(args: Omit<AddListingArgs, 'creator'>): Promise<Listing> {
  const { expiration, items, target } = createListingArgsSchema.parse(args)
  const authUser = await getAuthUser()
  if (isNil(authUser)) {
    return Promise.reject(Error(AuthError.Unauthorized))
  }
  await initializeFirebase()
  const owner = await pipe(getUserByUsername, andThen(unlessNil(userDocumentToModel)))(authUser.username)
  if (isNil(owner)) {
    return Promise.reject(Error(UserError.NotFound))
  }
  if (isNil(owner.wallet)) {
    return Promise.reject(Error(WalletError.NotFound))
  }
  // Ensure all items are unique and on the same chain
  pipe(assertUniqErc721Items, assertUniqErc1155Items, assertItemsChain)(items)
  for (const item of items) {
    const nft = await getNftByIndex(item.token)
    // Ensure the NFT exists
    if (isNil(nft)) {
      return Promise.reject(Error(NftError.NotFound))
    }
    // Ensure the token type matches the NFT type
    if (!equals(item.token.type, nft.type)) {
      return Promise.reject(Error(ItemError.Type))
    }
    // ensure the NFT has the right owner
    if (!equals(nft.owner?.username, owner.username)) {
      return Promise.reject(Error(AuthError.Forbidden))
    }
  }
  // Ensure the ERC1155 items quantity <= owner wallet's balance
  const erc1155Items = filter(isErc1155Item, items)
  for (const item of erc1155Items) {
    const balance = await getTokenBalance({
      owner: owner.wallet.address,
      token: item.token
    })
    if (item.quantity > balance) {
      return Promise.reject(Error(ItemError.Quantity))
    }
  }
  // Ensure listing is not a duplicate
  const signature = listingSignature({ creator: owner as UserWithWallet, items, target })
  const existingListing = await getListingBySignature(signature)
  if (!isNil(existingListing)) {
    return Promise.reject(Error(ListingError.Exists))
  }
  return pipe(
    addListing,
    andThen(pipe(prop('data'), listingDocumentToModel))
  )({ creator: owner as UserWithWallet, expiration, items, target })
}
