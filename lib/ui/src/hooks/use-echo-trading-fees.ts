import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import type { ChainName } from '@echo/utils/types/chain-name'
import { formatEther } from '@echo/web3/helpers/format-ether'
import { getEchoTradingFees } from '@echo/web3-dom/helpers/get-echo-trading-fees'
import { isNil } from 'ramda'
import useSWR from 'swr'

export function useEchoTradingFees(chain: ChainName): string | undefined {
  const { data } = useSWR<bigint, Error>({ name: SWRKeys.contract.getEchoTradingFees, chain }, getEchoTradingFees, {
    shouldRetryOnError: true,
    errorRetryCount: 3,
    errorRetryInterval: 500
  })
  if (isNil(data)) {
    return data
  }
  return formatEther(data)
}
