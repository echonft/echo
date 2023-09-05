import { fetcher } from '../../../../../../lib/helpers/fetcher'
import { ErrorStatus } from '../../../../../../lib/server/constants/error-status'
import { GetNftResponse } from '@echo/api'
import { nftApiUrl } from '@echo/api/src/routing/nft-api-url'
import { NftDetailsApiProvided } from '@echo/ui'
import { notFound } from 'next/navigation'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
    tokenId: string
  }
}

const NftPage: FunctionComponent<Props> = async ({ params: { slug, tokenId } }) => {
  const { data, error } = await fetcher(nftApiUrl(slug, tokenId)).revalidate(3600).fetch<GetNftResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      if (error.status === ErrorStatus.NOT_FOUND) {
        notFound()
      }
      throw Error(error.message)
    }
    throw Error()
  }

  return <NftDetailsApiProvided response={data.nft} />
}

export default NftPage
