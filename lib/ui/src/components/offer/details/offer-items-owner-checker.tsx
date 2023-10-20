'use client'
import type { OfferItem } from '@echo/model/types/offer-item'
import { OfferDetailsAcceptModalRow } from '@echo/ui/components/offer/details/action/offer-details-accept-modal-row'
import { getOwnerOfContractWagmiConfigForOfferItem } from '@echo/ui/helpers/contract/get-owner-of-contract-wagmi-config-for-offer-item'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { all, equals, F, ifElse, isNil, pipe, prop } from 'ramda'
import { type FunctionComponent, useEffect, useMemo } from 'react'
import { getAddress } from 'viem'
import { useContractReads } from 'wagmi'

interface Props {
  title: string
  offerItems: NonEmptyArray<OfferItem>
  ownerAddress: string
  onResponse?: (ownsAllItems: boolean) => unknown
  onError?: (error: Error) => unknown
}

function getStatus(status: 'error' | 'idle' | 'loading' | 'success', ownsAllTokens: boolean) {
  if (status === 'idle') {
    return 'loading'
  }
  if (status === 'success' && !ownsAllTokens) {
    return 'loading'
  }
  return status
}

export const OfferItemsOwnerChecker: FunctionComponent<Props> = ({
  title,
  offerItems,
  ownerAddress,
  onResponse,
  onError
}) => {
  const { data, error, status } = useContractReads({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    contracts: offerItems.map(getOwnerOfContractWagmiConfigForOfferItem)
  })

  const ownsAllTokens = useMemo(
    () => ifElse(isNil, F, all(pipe(prop('result'), getAddress, equals(getAddress(ownerAddress)))))(data),
    [data, ownerAddress]
  )

  useEffect(() => {
    if (!isNil(data)) {
      onResponse?.(ownsAllTokens)
    }
  }, [data, onResponse, ownsAllTokens])

  useEffect(() => {
    if (!isNil(error)) {
      onError?.(error)
    }
  }, [error, onError])

  return <OfferDetailsAcceptModalRow title={title} status={getStatus(status, ownsAllTokens)} />
}
