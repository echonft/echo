import { CardFooter } from '@echo/ui/components/base/card/card-footer'
import { CardLayout } from '@echo/ui/components/base/card/layout/card-layout'
import { StackLayout } from '@echo/ui/components/base/stack/layout/stack-layout'
import { StackFooter } from '@echo/ui/components/base/stack/stack-footer'
import type { OfferCardProps } from '@echo/ui/components/offer/card/offer-card'
import { OfferCardPicture } from '@echo/ui/components/offer/card/offer-card-picture'
import { OfferStackPicture } from '@echo/ui/components/offer/card/offer-stack-picture'
import { getNftStack } from '@echo/ui/helpers/nft/get-nft-stack'
import { getTokenIdString } from '@echo/ui/helpers/nft/get-token-id-string'
import { getCounterpartyOfferItemsFromRole } from '@echo/ui/helpers/offer/get-counterparty-offer-items-from-role'
import { clsx } from 'clsx'
import { head } from 'ramda'
import type { FunctionComponent } from 'react'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'

export const OfferCardSwitch: FunctionComponent<OfferCardProps> = ({ offer, options }) => {
  const nfts = getCounterpartyOfferItemsFromRole(offer)
  if (isNonEmptyArray(nfts)) {
    if (nfts.length > 1) {
      const stack = getNftStack(nfts)
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
    const nft = head(nfts)
    return (
      <CardLayout className={clsx(options?.asLink && 'group-hover:border-yellow-500')}>
        <OfferCardPicture offer={offer} scaleDisabled={options?.scaleDisabled} />
        <CardFooter title={nft.collection.name} subtitle={getTokenIdString(nft.tokenId, nft.collection.totalSupply)} />
      </CardLayout>
    )
  }
  return null
}
