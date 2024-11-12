import { CloudFunctionName } from '@echo/firestore-functions/constants/cloud-function-name'
import { cloudFunctionUrl } from '@echo/firestore-functions/helpers/cloud-function-url'
import type { Task } from '@echo/firestore-functions/types/task'
import { serializeNft } from '@echo/model/serializers/serialize-nft'
import type { Address } from '@echo/model/types/address'
import type { Nft } from '@echo/model/types/nft'

export type AddNftTaskData = Omit<Nft, 'owner'> & Record<'owner', Address>

export async function addNftTask(nft: AddNftTaskData): Promise<Task<AddNftTaskData>> {
  const name = CloudFunctionName.AddNft
  const uri = await cloudFunctionUrl(name)
  return {
    data: nft,
    name,
    options: {
      id: `${name}-${serializeNft(nft)}`,
      uri
    }
  }
}
