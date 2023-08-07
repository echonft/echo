/* eslint-disable @typescript-eslint/ban-ts-comment */
import { RequestHandler } from '../../types/handlers/request-handler'
import { populateNftCollection } from '../../utils/handler/populate-nft-collection'
import { ApiRequest } from '@echo/api-public'
import { findCollectionById } from '@echo/firebase-admin'
import { FirestoreNftCollectionData } from '@echo/firestore'
import { errorMessage } from '@echo/utils'
import { R } from '@mobily/ts-belt'

// @ts-ignore
export const syncCollectionHandler: RequestHandler<
  ApiRequest<{ collectionId: string }, never>,
  FirestoreNftCollectionData
> = async (req, res) =>
  // @ts-ignore
  findCollectionById(req.body.collectionId)
    // @ts-ignore
    .then((collectionResult) => {
      if (R.isError(collectionResult)) {
        return res.end(res.status(400).json({ error: 'Invalid collection Id' }))
      }
      const collection = R.getExn(collectionResult)
      return populateNftCollection(collection, collection.contract.address)
        .then((collection) => res.status(200).json(collection))
        .catch((e) => {
          res.end(res.status(500).json({ error: errorMessage(e) }))
          return
        })
    })
    .catch((e) => {
      res.end(res.status(500).json({ error: errorMessage(e) }))
      return
    })
