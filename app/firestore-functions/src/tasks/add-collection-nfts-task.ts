import { CloudFunctionName } from '@echo/firestore-functions/constants/cloud-function-name'
import { cloudFunctionUrl } from '@echo/firestore-functions/helpers/cloud-function-url'
import type { Task } from '@echo/firestore-functions/types/task'
import type { CollectionDocument } from '@echo/firestore/types/model/collection-document'
import { serializeCollection } from '@echo/model/serializers/serialize-collection'
import { pick } from 'ramda'

export type AddCollectionNftsTaskData = Pick<CollectionDocument, 'contract'>

export async function addCollectionNftsTask(collection: CollectionDocument): Promise<Task<AddCollectionNftsTaskData>> {
  const name = CloudFunctionName.AddCollectionNfts
  const uri = await cloudFunctionUrl(name)
  return {
    data: pick(['contract'], collection),
    name,
    options: {
      id: `${name}-${serializeCollection(collection)}`,
      uri
    }
  }
}
