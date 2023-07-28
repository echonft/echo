import { mockCreateRequestForOfferRequest } from '@echo/api-public'
import { useCreateRequestForOffer } from '@lib/hooks/use-create-request-for-offer'
import { R } from '@mobily/ts-belt'
import { isNil } from 'ramda'
import { FunctionComponent, useMemo, useState } from 'react'

interface Props {
  collectionId: string
}

// FIXME This uses a mock for now, should use the user's NFT
export const CreateOfferFetcher: FunctionComponent<Props> = () => {
  const [create, setCreate] = useState(false)
  const mockRequest = useMemo(() => mockCreateRequestForOfferRequest, [])
  const { data } = useCreateRequestForOffer(
    mockRequest.discordGuildId,
    create ? mockRequest.items : undefined,
    create ? mockRequest.target : undefined
  )

  if (isNil(data)) {
    return (
      <button onClick={() => setCreate(true)} disabled={create}>
        Create offer
      </button>
    )
  } else {
    if (create) {
      setCreate(false)
    }
    if (data && R.isOk(data)) {
      return <span>{`Got data ${JSON.stringify(R.getExn(data))}`}</span>
    }
    return <span>{`Got error ${JSON.stringify(data)}`}</span>
  }
}
