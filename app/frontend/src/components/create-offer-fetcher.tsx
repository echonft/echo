import { FunctionComponent } from 'react'

interface Props {
  collectionId: string
}

// FIXME
export const CreateOfferFetcher: FunctionComponent<Props> = () => {
  // const [create, setCreate] = useState(false)
  // const mockRequest = useMemo(() => ({}) as CreateRequestForOfferRequest, [])
  // const { data, error } = useCreateListing(
  //   mockRequest.discordGuildId,
  //   create ? mockRequest.items : undefined,
  //   create ? mockRequest.target : undefined
  // )

  // if (error) {
  //   return <span>{`Got error ${JSON.stringify(data)}`}</span>
  // }
  //
  // if (isNil(data)) {
  //   return (
  //     <button onClick={() => setCreate(true)} disabled={create}>
  //       Create offer
  //     </button>
  //   )
  // }
  //
  // if (create) {
  //   setCreate(false)
  // }
  // return <span>{`Got data ${JSON.stringify(data)}`}</span>
  return null
}
