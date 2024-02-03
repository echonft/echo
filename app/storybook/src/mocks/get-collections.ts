import { getAllCollectionMocks } from '@echo/model-mocks/collection/get-all-collection-mocks'
import { delayPromise } from '@echo/utils/helpers/delay-promise'

export function getCollections() {
  return delayPromise(Promise.resolve(getAllCollectionMocks()), 800)
}
