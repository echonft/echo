import type { Nft } from '@echo/model/types/nft'
import { StackLayout } from '@echo/ui/components/base/stack/layout/stack-layout'
import { StackFooter } from '@echo/ui/components/base/stack/stack-footer'
import type { OfferCardProps } from '@echo/ui/components/offer/card/offer-card'
import { OfferStackPicture } from '@echo/ui/components/offer/card/offer-stack-picture'
import { getNftStack } from '@echo/ui/helpers/nft/get-nft-stack'
import { getTokenIdString } from '@echo/ui/helpers/nft/get-token-id-string'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const OfferStack: FunctionComponent<OfferCardProps & Record<'items', Nft[]>> = ({ offer, options, items }) => {
  const stack = getNftStack(items)
  return (
    <StackLayout className={clsx(options?.asLink && 'group-hover:border-yellow-500')}>
      <OfferStackPicture stack={stack} offer={offer} scaleDisabled={options?.scaleDisabled} />
      <StackFooter
        title={stack.collection.name}
        subtitle={getTokenIdString(stack.tokenId, stack.collection.totalSupply)}
      />
    </StackLayout>
  )
}
