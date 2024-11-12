import { CloudFunctionName } from '@echo/firestore-functions/constants/cloud-function-name'
import { cloudFunctionUrl } from '@echo/firestore-functions/helpers/cloud-function-url'
import type { Task } from '@echo/firestore-functions/types/task'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import { serializeNft } from '@echo/model/serializers/serialize-nft'
import type { NftIndex } from '@echo/model/types/nft'

export type CancelNftListingsTaskData = NftIndex

export async function cancelNftListingsTask(nft: NftDocument): Promise<Task<CancelNftListingsTaskData>> {
  const name = CloudFunctionName.CancelNftListings
  const uri = await cloudFunctionUrl(name)
  return {
    data: nftIndex(nft),
    name,
    options: {
      id: `${name}-${serializeNft(nft)}`,
      uri
    }
  }
}
