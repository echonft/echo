'use client'
import type { OfferItem } from '@echo/model/types/offer-item'
import { OfferDetailsAcceptModalRow } from '@echo/ui/components/offer/details/action/offer-details-accept-modal-row'
import type { HexString } from '@echo/utils/types/hex-string'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { getErc721OwnerOfContractReadConfig } from '@echo/web3/src/helpers/get-erc721-owner-of-contract-read-config'
import { all, equals, F, ifElse, isNil, pipe, prop, toLower } from 'ramda'
import { type FunctionComponent, useEffect, useMemo } from 'react'
import { useContractReads } from 'wagmi'

interface Props {
  title: string
  offerItems: NonEmptyArray<OfferItem>
  ownerAddress: HexString
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
    contracts: offerItems.map(getErc721OwnerOfContractReadConfig)
  })

  const ownsAllTokens = useMemo(
    () => ifElse(isNil, F, all(pipe(prop('result'), toLower, equals(toLower(ownerAddress as string)))))(data),
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
