import { CloudFunctionName } from '@echo/firestore-functions/constants/cloud-function-name'
import { getCloudFunctionUrl } from '@echo/firestore-functions/helpers/get-cloud-function-url'
import type { Task } from '@echo/firestore-functions/types/task'
import type { CollectionDocument } from '@echo/firestore/types/model/collection-document'
import { serializeCollection } from '@echo/model/serializers/serialize-collection'

export async function addCollectionNftsTask(
  collection: CollectionDocument
): Promise<Task<Record<'collection', CollectionDocument>>> {
  const name = CloudFunctionName.AddCollectionNfts
  const uri = await getCloudFunctionUrl(name)
  return {
    data: { collection },
    name,
    options: {
      id: `${name}-${serializeCollection(collection)}`,
      uri
    }
  }
}
