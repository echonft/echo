import { getAllCollectionMocks } from '@echo/model-mocks/collection/get-all-collection-mocks'
import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { pipe } from 'ramda'

export function getCollections() {
  return delayPromise(pipe(getAllCollectionMocks, toPromise), 800)()
}
