import { CloudFunctionName } from '@echo/firestore-functions/constants/cloud-function-name'
import { getCloudFunctionUrl } from '@echo/firestore-functions/helpers/get-cloud-function-url'
import type { Task } from '@echo/firestore-functions/types/task'
import { serializeNft } from '@echo/model/serializers/serialize-nft'
import type { Address } from '@echo/model/types/address'
import type { Nft } from '@echo/model/types/nft'

export async function addNftTask(
  nft: Omit<Nft, 'owner'> & Record<'owner', Address>
): Promise<Task<Record<'nft', Omit<Nft, 'owner'> & Record<'owner', Address>>>> {
  const name = CloudFunctionName.AddNft
  const uri = await getCloudFunctionUrl(name)
  return {
    data: { nft },
    name,
    options: {
      id: `${name}-${serializeNft(nft)}`,
      uri
    }
  }
}
