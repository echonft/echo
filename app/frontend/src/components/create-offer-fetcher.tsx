import { useCreateRequestForOffer } from '@lib/hooks/use-create-request-for-offer'
import { R } from '@mobily/ts-belt'
import { isNil } from 'ramda'
import { FunctionComponent, useState } from 'react'

interface Props {
  collectionId: string
}

export const CreateOfferFetcher: FunctionComponent<Props> = () => {
  const [create, setCreate] = useState(false)
  const { data } = useCreateRequestForOffer('1002691062374088794', create ? [] : undefined, create ? [] : undefined)
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
    if (R.isOk(data)) {
      return <span>{`Got data ${JSON.stringify(R.getExn(data))}`}</span>
    }
    return <span>{`Got error ${JSON.stringify(data)}`}</span>
  }
}
