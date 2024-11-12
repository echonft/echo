import { CloudFunctionName } from '@echo/firestore-functions/constants/cloud-function-name'
import { cloudFunctionUrl } from '@echo/firestore-functions/helpers/cloud-function-url'
import type { Task } from '@echo/firestore-functions/types/task'
import type { Address } from '@echo/model/types/address'
import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { assoc, pick, pipe } from 'ramda'

export type UpdateNftOwnerTaskData = Pick<Nft, 'tokenId'> &
  Record<'collection', Pick<Collection, 'contract'>> &
  Record<'owner', Address>

export async function updateNftOwnerTask(nft: PartialNft): Promise<Task<UpdateNftOwnerTaskData>> {
  const name = CloudFunctionName.UpdateNftOwner
  const uri = await cloudFunctionUrl(name)

  return {
    data: pipe(pick(['collection', 'tokenId']), assoc('owner', nft.owner))(nft),
    name,
    options: {
      id: `${name}-${nft.collection.contract}-${nft.tokenId}`,
      uri
    }
  }
}
