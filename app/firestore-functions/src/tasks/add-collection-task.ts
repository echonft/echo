import { CloudFunctionName } from '@echo/firestore-functions/constants/cloud-function-name'
import { cloudFunctionUrl } from '@echo/firestore-functions/helpers/cloud-function-url'
import type { Task } from '@echo/firestore-functions/types/task'
import type { CollectionDocument } from '@echo/firestore/types/model/collection-document'
import { serializeCollection } from '@echo/model/serializers/serialize-collection'

export type AddCollectionTaskData = CollectionDocument

export async function addCollectionTask(collection: CollectionDocument): Promise<Task<AddCollectionTaskData>> {
  const name = CloudFunctionName.AddCollection
  const uri = await cloudFunctionUrl(name)
  return {
    data: collection,
    name,
    options: {
      id: `${name}-${serializeCollection(collection)}`,
      uri
    }
  }
}
