'use client'
import { OfferDetailsAcceptModalRow } from '@echo/ui/components/offer/details/offer-details-accept-modal-row'
import { getOwnerOfContractWagmiConfigForOfferItem } from '@echo/ui/helpers/contract/get-owner-of-contract-wagmi-config-for-offer-item'
import { OfferItem } from '@echo/ui/types/model/offer-item'
import { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { all, equals, isNil, pipe, prop } from 'ramda'
import { FunctionComponent, useEffect } from 'react'
import { getAddress } from 'viem'
import { useContractReads } from 'wagmi'

interface Props {
  title: string
  offerItems: NonEmptyArray<OfferItem>
  ownerAddress: string
  onResponse?: (ownsAllItems: boolean) => unknown
  onError?: (error: Error) => unknown
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

  useEffect(() => {
    if (!isNil(error)) {
      onError?.(error)
    } else if (!isNil(data)) {
      onResponse?.(all(pipe(prop('result'), getAddress, equals(getAddress(ownerAddress))))(data))
    }
  }, [data, error])

  return <OfferDetailsAcceptModalRow title={title} status={status} />
}
