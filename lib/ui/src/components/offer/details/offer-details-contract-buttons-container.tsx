'use client'
import { getWagmiOwnerOfContractConfigForOfferItem } from '@echo/ui/helpers/contract/get-wagmi-owner-of-contract-config-for-offer-item'
import { OfferItem } from '@echo/ui/types/model/offer-item'
import type { OfferState } from '@echo/ui/types/model/offer-state'
import { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'
import { useContractReads } from 'wagmi'

interface Props {
  state: OfferState
  isReceiving: boolean
  nftsCount: number
  senderItems: NonEmptyArray<OfferItem>
  senderAddress: string
  receiverItems: NonEmptyArray<OfferItem>
  receiverAddress: string
}

export const OfferDetailsContractButtonsContainer: FunctionComponent<Props> = ({
  state,
  isReceiving,
  nftsCount,
  senderItems,
  senderAddress,
  receiverAddress,
  receiverItems
}) => {
  const { data: senderItemsOwnerOf } = useContractReads({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    contracts: senderItems.map(getWagmiOwnerOfContractConfigForOfferItem)
  })

  const { data: receiverItemsOwnerOf } = useContractReads({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    contracts: receiverItems.map(getWagmiOwnerOfContractConfigForOfferItem)
  })

  return (
    <div className={clsx('flex', 'flex-row', 'gap-8')}>
      <span>Sender Items owner are {JSON.stringify(senderItemsOwnerOf)}</span>
      <span>Receiver Items owner are {JSON.stringify(receiverItemsOwnerOf)}</span>
    </div>
  )
}
