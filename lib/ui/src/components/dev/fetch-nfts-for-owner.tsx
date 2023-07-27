import { useNftsForOwner } from '../../hooks/use-nfts-for-owner'
import { R } from '@mobily/ts-belt'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

export interface FetchNftsForOwnerProps {
  owner: string
  contractAddresses: string[]
}

export const FetchNftsForOwner: FunctionComponent<FetchNftsForOwnerProps> = ({ owner, contractAddresses }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { isLoading, data, error } = useNftsForOwner(owner, contractAddresses)

  if (isLoading) {
    return <div>{'Loading'}</div>
  }
  if (!isNil(error)) {
    return <div>{`Error: ${error.message}`}</div>
  }
  return <div>{JSON.stringify(R.getExn(data!))}</div>
}
