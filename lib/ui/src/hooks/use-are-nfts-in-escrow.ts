import type { Nft } from '@echo/model/types/nft/nft'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useDependencies } from '@echo/ui/components/base/dependencies-provider'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import useSWR from 'swr'

export function useAreNftsInEscrow(nfts: Nft[] | undefined): boolean | undefined {
  const { areNftsInEscrow, logger } = useDependencies()
  const { data } = useSWR<boolean, Error>(
    isNilOrEmpty(nfts) ? undefined : { name: SWRKeys.contract.areNftsInEscrow(nfts), nfts },
    areNftsInEscrow,
    {
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 500,
      onError: errorCallback({
        logger,
        loggerContext: { component: useAreNftsInEscrow.name, fetcher: areNftsInEscrow.name }
      })
    }
  )
  return data
}
