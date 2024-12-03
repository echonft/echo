'use client'
import type { OwnedNft } from '@echo/model/types/nft'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { BottomBarLayout } from '@echo/ui/components/base/layout/bottom-bar-layout'
import { SelectableNftCardsActionButton } from '@echo/ui/components/nft/selectable-card/selectable-nft-cards-action-button'
import { NftAction } from '@echo/ui/constants/nft-actions'
import { isNonEmptyArray } from '@echo/utils/helpers/is-non-empty-array'
import { useRouter } from 'next/navigation'
import type { FunctionComponent } from 'react'

interface Props {
  selection: OwnedNft[]
}

export const UserItemsBottomBar: FunctionComponent<Props> = ({ selection }) => {
  const router = useRouter()

  if (isNonEmptyArray(selection)) {
    return (
      <BottomBarLayout>
        <SelectableNftCardsActionButton
          action={NftAction.Offer}
          count={selection.length}
          onClick={() => {
            router.push(frontendRoutes.offer.create.withQuery({ items: selection }).get())
          }}
        />
      </BottomBarLayout>
    )
  }

  return null
}
