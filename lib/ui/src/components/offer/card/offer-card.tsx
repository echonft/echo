'use client'
import { offerReceiver } from '@echo/model/helpers/offer/offer-receiver'
import { offerReceiverNftItems } from '@echo/model/helpers/offer/offer-receiver-nft-items'
import { offerSender } from '@echo/model/helpers/offer/offer-sender'
import { offerSenderNftItems } from '@echo/model/helpers/offer/offer-sender-nft-items'
import { CardFooter } from '@echo/ui/components/base/card/card-footer'
import { CardLayout } from '@echo/ui/components/base/card/layout/card-layout'
import { StackLayout } from '@echo/ui/components/base/stack/layout/stack-layout'
import { StackFooter } from '@echo/ui/components/base/stack/stack-footer'
import { OfferCardPicture } from '@echo/ui/components/offer/card/offer-card-picture'
import { OfferStackPicture } from '@echo/ui/components/offer/card/offer-stack-picture'
import { buildNftStack } from '@echo/ui/helpers/nft/build-nft-stack'
import { nftLabel } from '@echo/ui/helpers/nft/nft-label'
import { isOfferRoleSender } from '@echo/ui/helpers/offer/is-offer-role-sender'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { isNonEmptyArray } from '@echo/utils/helpers/is-non-empty-array'
import { clsx } from 'clsx'
import { head, ifElse } from 'ramda'
import { type FunctionComponent } from 'react'

export interface OfferCardProps {
  offer: OfferWithRole
  options?: {
    asLink?: boolean
    scaleDisabled?: boolean
  }
  onSelect?: (offer: OfferWithRole) => unknown
}

export const OfferCard: FunctionComponent<OfferCardProps> = ({ offer, options, onSelect }) => {
  const items = ifElse(isOfferRoleSender, offerSenderNftItems, offerReceiverNftItems)(offer)
  const owner = ifElse(isOfferRoleSender, offerSender, offerReceiver)(offer)
  if (isNonEmptyArray(items)) {
    if (items.length > 1) {
      const stack = buildNftStack(items, owner)
      return (
        <StackLayout
          className={clsx(options?.asLink && 'group-hover:border-yellow-500')}
          onClick={() => {
            onSelect?.(offer)
          }}
        >
          <OfferStackPicture
            chain={stack.collection.contract.chain}
            pictureUrl={stack.pictureUrl}
            label={stack.label}
            state={offer.state}
            scaleDisabled={options?.scaleDisabled}
          />
          <StackFooter title={stack.collection.name} subtitle={stack.label} />
        </StackLayout>
      )
    }
    const item = head(items)
    return (
      <CardLayout
        className={clsx(options?.asLink && 'group-hover:border-yellow-500')}
        onClick={() => {
          onSelect?.(offer)
        }}
      >
        <OfferCardPicture
          chain={item.token.contract.chain}
          pictureUrl={item.token.pictureUrl}
          label={nftLabel(item.token)}
          state={offer.state}
          scaleDisabled={options?.scaleDisabled}
        />
        <CardFooter title={item.token.collection.name} subtitle={nftLabel(item.token)} />
      </CardLayout>
    )
  }
  return null
}
