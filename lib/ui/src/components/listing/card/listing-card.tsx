'use client'
import { listingItems } from '@echo/model/helpers/listing/listing-items'
import type { Listing } from '@echo/model/types/listing'
import { CardFooter } from '@echo/ui/components/base/card/card-footer'
import { CardLayout } from '@echo/ui/components/base/card/layout/card-layout'
import { StackLayout } from '@echo/ui/components/base/stack/layout/stack-layout'
import { StackFooter } from '@echo/ui/components/base/stack/stack-footer'
import { ListingCardPicture } from '@echo/ui/components/listing/card/listing-card-picture'
import { ListingStackPicture } from '@echo/ui/components/listing/card/listing-stack-picture'
import { buildNftStack } from '@echo/ui/helpers/nft/build-nft-stack'
import { nftLabel } from '@echo/ui/helpers/nft/nft-label'
import { head } from 'ramda'

export interface ListingCardProps<T extends Listing> {
  listing: T
  options?: {
    scaleDisabled?: boolean
  }
  onSelect?: (listing: T) => unknown
}

export const ListingCard = <T extends Listing>({ listing, options, onSelect }: ListingCardProps<T>) => {
  const items = listingItems(listing)
  if (items.length > 1) {
    const stack = buildNftStack(items, listing.creator)
    return (
      <StackLayout
        onClick={() => {
          onSelect?.(listing)
        }}
      >
        <ListingStackPicture
          chain={stack.collection.contract.chain}
          pictureUrl={stack.pictureUrl}
          state={listing.state}
          label={stack.label}
          scaleDisabled={options?.scaleDisabled}
        />
        <StackFooter title={stack.collection.name} subtitle={stack.label} />
      </StackLayout>
    )
  }
  const item = head(items)
  return (
    <CardLayout
      onClick={() => {
        onSelect?.(listing)
      }}
    >
      <ListingCardPicture
        chain={item.token.contract.chain}
        pictureUrl={item.token.pictureUrl}
        state={listing.state}
        label={nftLabel(item.token)}
        scaleDisabled={options?.scaleDisabled}
      />
      <CardFooter title={item.token.collection.name} subtitle={nftLabel(item.token)} />
    </CardLayout>
  )
}
