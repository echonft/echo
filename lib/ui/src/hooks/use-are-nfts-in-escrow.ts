import type { Nft } from '@echo/model/types/nft'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { areNftsInEscrow } from '@echo/web3-dom/helpers/are-nfts-in-escrow'
import useSWR from 'swr'

export function useAreNftsInEscrow(nfts: Nft[] | undefined): boolean | undefined {
  const { data } = useSWR<boolean, Error>(
    isNilOrEmpty(nfts) ? undefined : { name: SWRKeys.contract.areNftsInEscrow, nfts },
    areNftsInEscrow,
    {
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 500
    }
  )
  return data
}
