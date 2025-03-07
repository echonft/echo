import type { Nft } from '@echo/model/types/nft'
import { SWRKeys } from '@echo/ui/constants/swr-keys'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import useSWR from 'swr'

export function useAreNftsInEscrow(nfts: Nft[] | undefined): boolean | undefined {
  const { areNftsInEscrow } = useDependencies()
  const { data } = useSWR<boolean, Error>(
    isNilOrEmpty(nfts) ? undefined : { name: SWRKeys.contract.areNftsInEscrow(nfts), nfts },
    ({ nfts }: { nfts: Nft[] }) => areNftsInEscrow(nfts),
    {
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 500,
      onError: errorCallback({
        loggerContext: { component: useAreNftsInEscrow.name, fetcher: areNftsInEscrow.name }
      })
    }
  )
  return data
}
