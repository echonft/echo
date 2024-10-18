import { useDependencies } from '@echo/ui/components/base/dependencies-provider'
import { SWRKeys } from '@echo/ui/constants/swr-keys'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import type { Chain } from '@echo/utils/constants/chain'
import { formatEther } from '@echo/web3/utils/format-ether'
import { isNil } from 'ramda'
import useSWR from 'swr'

export function useEchoTradingFees(chain: Chain): string | undefined {
  const { getEchoTradingFees, logger } = useDependencies()
  const { data } = useSWR<bigint, Error>({ name: SWRKeys.contract.getEchoTradingFees, chain }, getEchoTradingFees, {
    shouldRetryOnError: true,
    errorRetryCount: 3,
    errorRetryInterval: 500,
    onError: errorCallback({
      logger,
      loggerContext: { component: useEchoTradingFees.name, fetcher: getEchoTradingFees.name }
    })
  })
  if (isNil(data)) {
    return data
  }
  return formatEther(data)
}
