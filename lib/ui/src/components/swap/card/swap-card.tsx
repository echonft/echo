'use client'
import { swapSenderNftItems } from '@echo/model/helpers/swap/swap-sender-nft-items'
import type { Swap } from '@echo/model/types/swap'
import { CardFooter } from '@echo/ui/components/base/card/card-footer'
import { CardImage } from '@echo/ui/components/base/card/card-image'
import { CardLayout } from '@echo/ui/components/base/card/layout/card-layout'
import { CardPictureLayout } from '@echo/ui/components/base/card/layout/card-picture-layout'
import { StackLayout } from '@echo/ui/components/base/stack/layout/stack-layout'
import { StackPictureLayout } from '@echo/ui/components/base/stack/layout/stack-picture-layout'
import { StackImage } from '@echo/ui/components/base/stack/stack-image'
import { buildNftStack } from '@echo/ui/helpers/nft/build-nft-stack'
import { nftLabel } from '@echo/ui/helpers/nft/nft-label'
import { head } from 'ramda'
import { type FunctionComponent, useCallback } from 'react'

interface SwapCardProps {
  swap: Swap
  onSelect?: (slug: Lowercase<string>) => void
}

export const SwapCard: FunctionComponent<SwapCardProps> = ({ swap, onSelect }) => {
  const items = swapSenderNftItems(swap)
  const select = useCallback(() => {
    onSelect?.(swap.slug)
  }, [swap.slug, onSelect])

  if (items.length > 1) {
    const stack = buildNftStack(items, swap.sender)
    return (
      <StackLayout onClick={select}>
        <StackPictureLayout>
          <StackImage src={stack.pictureUrl} alt={stack.label} />
        </StackPictureLayout>
        <CardFooter title={stack.collection.name} subtitle={stack.label} />
      </StackLayout>
    )
  }

  const item = head(items)
  return (
    <CardLayout onClick={select}>
      <CardPictureLayout>
        <CardImage src={item.token.pictureUrl} alt={nftLabel(item.token)} />
      </CardPictureLayout>
      <CardFooter title={item.token.collection.name} subtitle={nftLabel(item.token)} />
    </CardLayout>
  )
}
