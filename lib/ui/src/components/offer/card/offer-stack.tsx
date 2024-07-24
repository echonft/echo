'use client'
import type { Nft } from '@echo/model/types/nft'
import { StackLayout } from '@echo/ui/components/base/stack/layout/stack-layout'
import { StackFooter } from '@echo/ui/components/base/stack/stack-footer'
import type { OfferCardProps } from '@echo/ui/components/offer/card/offer-card'
import { OfferStackPicture } from '@echo/ui/components/offer/card/offer-stack-picture'
import { getNftStack } from '@echo/ui/helpers/nft/get-nft-stack'
import { getTokenIdString } from '@echo/ui/helpers/nft/get-token-id-string'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props extends OfferCardProps {
  items: Nft[]
  onSelect?: (offer: OfferWithRole) => unknown
}

export const OfferStack: FunctionComponent<Props> = ({ offer, options, items, onSelect }) => {
  const stack = getNftStack(items)
  return (
    <StackLayout
      className={clsx(options?.asLink && 'group-hover:border-yellow-500')}
      onClick={() => {
        onSelect?.(offer)
      }}
    >
      <OfferStackPicture stack={stack} offer={offer} scaleDisabled={options?.scaleDisabled} />
      <StackFooter
        title={stack.collection.name}
        subtitle={getTokenIdString(stack.tokenId, stack.collection.totalSupply)}
      />
    </StackLayout>
  )
}
