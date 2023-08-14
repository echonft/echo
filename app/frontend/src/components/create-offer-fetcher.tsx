import { CreateRequestForOfferRequest } from '@echo/api-public'
import { useCreateRequestForOffer } from '@lib/hooks/use-create-request-for-offer'
import { isNil } from 'ramda'
import { FunctionComponent, useMemo, useState } from 'react'

interface Props {
  collectionId: string
}

// FIXME This uses a mock for now, should use the user's NFT
export const CreateOfferFetcher: FunctionComponent<Props> = () => {
  const [create, setCreate] = useState(false)
  const mockRequest = useMemo(() => ({}) as CreateRequestForOfferRequest, [])
  const { data, error } = useCreateRequestForOffer(
    mockRequest.discordGuildId,
    create ? mockRequest.items : undefined,
    create ? mockRequest.target : undefined
  )

  if (error) {
    return <span>{`Got error ${JSON.stringify(data)}`}</span>
  }

  if (isNil(data)) {
    return (
      <button onClick={() => setCreate(true)} disabled={create}>
        Create offer
      </button>
    )
  }

  if (create) {
    setCreate(false)
  }
  return <span>{`Got data ${JSON.stringify(data)}`}</span>
}
