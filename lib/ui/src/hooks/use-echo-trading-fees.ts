import { SWRKeys } from '@echo/ui/constants/swr-keys'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import { formatEther } from '@echo/web3-dom/helpers/format-ether'
import { isNil } from 'ramda'
import useSWR from 'swr'

export function useEchoTradingFees(): string | undefined {
  const { getEchoTradingFees } = useDependencies()
  const { data } = useSWR<bigint, Error>({ name: SWRKeys.contract.getEchoTradingFees }, getEchoTradingFees, {
    shouldRetryOnError: true,
    errorRetryCount: 3,
    errorRetryInterval: 500,
    onError: errorCallback()
  })
  if (isNil(data)) {
    return data
  }
  return formatEther(data)
}
