import { UserError } from '@echo/firestore-functions/constants/errors/user-error'
import { error } from '@echo/firestore-functions/constants/logger'
import { onDocumentWritten } from '@echo/firestore-functions/helpers/on-document-written'
import { CollectionPath } from '@echo/firestore/constants/collection-path'
import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { getCollectionByContract } from '@echo/firestore/crud/collection/get-collection-by-contract'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { eqAddress } from '@echo/model/helpers/eq-address'
import type { Address } from '@echo/model/types/address'
import type { Collection } from '@echo/model/types/collection'
import { getCollectionsByWallet } from '@echo/nft-scan/services/get-collections-by-wallet'
import type { FetchCollectionResponse } from '@echo/nft-scan/types/response/fetch-collection-response'
import type { Nullable } from '@echo/utils/types/nullable'
import { andThen, isNil, map, pipe, prop, reject } from 'ramda'

export const onUserWritten = onDocumentWritten(CollectionPath.Users, async (event) => {
  if (!isNil(event.data)) {
    const user = event.data.after.data() as Nullable<UserDocument>
    if (!isNil(user) && !isNil(user.wallet)) {
      const before = event.data.before.data() as Nullable<UserDocument>
      if (isNil(before?.wallet) || !eqAddress(user.wallet, before.wallet)) {
        const { wallet } = user
        try {
          const collections = await pipe<[Address], Promise<FetchCollectionResponse[]>, Promise<Collection[]>>(
            getCollectionsByWallet,
            andThen(
              pipe<[FetchCollectionResponse[]], FetchCollectionResponse[], Nullable<Collection>[], Collection[]>(
                reject<FetchCollectionResponse>(prop('isSpam')),
                map<FetchCollectionResponse, Nullable<Collection>>(prop('collection')),
                reject(isNil)
              )
            )
          )(wallet)

          for (const collection of collections) {
            const existingCollection = await getCollectionByContract(collection.contract)
            if (isNil(existingCollection)) {
              await addCollection(collection)
            }
          }

          // const nfts = await getNftsByWallet(wallet)
          // await updateNftsForWallet(user.wallet)
        } catch (err) {
          error({ err, user }, UserError.UpdateNfts)
        }
        return
      }
    }
  }
})
