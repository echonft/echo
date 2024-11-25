'use client'
import { listingItems } from '@echo/model/helpers/listing/listing-items'
import type { Listing } from '@echo/model/types/listing'
import { CardFooter } from '@echo/ui/components/base/card/card-footer'
import { CardLayout } from '@echo/ui/components/base/card/layout/card-layout'
import { StackLayout } from '@echo/ui/components/base/stack/layout/stack-layout'
import { ListingCardPicture } from '@echo/ui/components/listing/card/listing-card-picture'
import { ListingStackPicture } from '@echo/ui/components/listing/card/listing-stack-picture'
import { buildNftStack } from '@echo/ui/helpers/nft/build-nft-stack'
import { nftLabel } from '@echo/ui/helpers/nft/nft-label'
import { head } from 'ramda'
import { type FunctionComponent, useCallback } from 'react'

interface Props {
  listing: Listing
  onSelect?: (slug: Lowercase<string>) => void
}

export const ListingCard: FunctionComponent<Props> = ({ listing, onSelect }) => {
  const items = listingItems(listing)
  const select = useCallback(() => {
    onSelect?.(listing.slug)
  }, [listing.slug, onSelect])

  if (items.length > 1) {
    const stack = buildNftStack(items, listing.creator)
    return (
      <StackLayout onClick={select}>
        <ListingStackPicture pictureUrl={stack.pictureUrl} state={listing.state} label={stack.label} />
        <CardFooter title={stack.collection.name} subtitle={stack.label} />
      </StackLayout>
    )
  }
  const item = head(items)
  return (
    <CardLayout onClick={select}>
      <ListingCardPicture pictureUrl={item.token.pictureUrl} state={listing.state} label={nftLabel(item.token)} />
      <CardFooter title={item.token.collection.name} subtitle={nftLabel(item.token)} />
    </CardLayout>
  )
}
