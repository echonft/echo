import { getContractMetadata, getNftsForContract } from '@echo/alchemy-v3'
import { ApiRequest, CreateNftCollectionRequest, ErrorResponse } from '@echo/api'
import { OfferResponse } from '@echo/api/dist/types'
import { errorMessage } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { NextApiResponse } from 'next'

// FIXME Temporary for testing, should probably not be a route and should be admin protected
const createNftCollection = async (
  req: ApiRequest<never, CreateNftCollectionRequest>,
  res: NextApiResponse<ErrorResponse | OfferResponse>
) => {
  try {
    const contractResult = await getContractMetadata(req.query.address)
    console.log(`will fetchg nft`)
    const nftsResult = await getNftsForContract(req.query.address)
    if (R.isOk(contractResult) && R.isOk(nftsResult)) {
      console.log(`got results`)
      const contract = R.getExn(contractResult)
      const nfts = R.getExn(nftsResult)
      return res.status(200).json({ contract, nfts })
    } else {
      res.end(res.status(400).json({ error: 'Error in results' }))
      return
    }
  } catch (error) {
    console.log(`got error ${errorMessage(error)}`)
    res.end(res.status(400).json({ error: 'Invalid body' }))
    return
  }
}

export default createNftCollection
