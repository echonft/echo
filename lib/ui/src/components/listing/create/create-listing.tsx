'use client'
import type { Expiration } from '@echo/model/constants/expiration'
import type { Collection } from '@echo/model/types/collection'
import type { Listing } from '@echo/model/types/listing'

import type { OwnedNft } from '@echo/model/types/owned-nft'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { CreateListingButtons } from '@echo/ui/components/listing/create/create-listing-buttons'
import { CreateListingNfts } from '@echo/ui/components/listing/create/create-listing-nfts'
import { CreateListingSwapDirectionHeader } from '@echo/ui/components/listing/create/create-listing-swap-direction-header'
import { CreateListingTargets } from '@echo/ui/components/listing/create/create-listing-targets'
import { CreateOfferSwapDirectionHeader } from '@echo/ui/components/offer/create/create-offer-swap-direction-header'
import { SwapDirection } from '@echo/ui/constants/swap-direction'
import { useNfts } from '@echo/ui/hooks/use-nfts'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { assoc, isEmpty, isNil, type NonEmptyArray } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  creatorNfts: OwnedNft[]
  items: Nullable<OwnedNft[]>
  target: Nullable<Collection>
  loading?: boolean
  onCancel?: VoidFunction
  onComplete?: (items: NonEmptyArray<OwnedNft>, target: Listing['target'], expiration: Expiration) => void
}

export const CreateListing: FunctionComponent<Props> = ({ creatorNfts, items, target, loading, onCancel }) => {
  const { nfts, selection, selectNft, unselectNft } = useNfts({
    nfts: creatorNfts,
    sortBy: 'collection',
    selection: { nfts: items }
  })
  const [targetSelection, setTargetSelection] = useState<Nullable<Listing['target']>>(
    isNil(target) ? undefined : { collection: target, quantity: 1 }
  )
  const [reviewing, setReviewing] = useState(false)
  // TODO Probably should change that, not the most beautiful
  const [settingExpiration, setSettingExpiration] = useState(false)

  if (settingExpiration) {
    return null
  }

  return (
    <div className={clsx('flex', 'flex-col', 'gap-24')}>
      <div className={clsx('flex', 'flex-col', 'gap-20')}>
        <CreateListingSwapDirectionHeader direction={SwapDirection.In} />
        <div className={clsx('flex', 'flex-row', 'justify-center', 'h-max', 'w-full', 'px-8')}>
          <div className={clsx('h-max', 'w-full', 'max-w-[40rem]')}>
            <CreateListingTargets
              locked={reviewing}
              target={targetSelection}
              onQtyChange={(quantity) => {
                setTargetSelection(assoc('quantity', quantity))
              }}
              onRemove={() => {
                setTargetSelection(undefined)
              }}
              onSelect={(selection) => {
                setTargetSelection({ collection: selection, quantity: 1 })
              }}
            />
          </div>
        </div>
        <div className={clsx('pb-4')}>
          <ItemsSeparator />
        </div>
        <CreateOfferSwapDirectionHeader direction={SwapDirection.Out} />
        <div className={clsx('flex', 'flex-row', 'justify-center', 'h-max', 'w-full', 'px-8')}>
          <CreateListingNfts
            nfts={nfts}
            selection={selection.nfts}
            locked={reviewing}
            onSelect={selectNft}
            onUnselect={unselectNft}
          />
        </div>
        <div className={clsx('flex', 'flex-row', 'gap-8', 'justify-center', 'items-center', 'pb-5')}>
          <CreateListingButtons
            locked={reviewing}
            disabled={!reviewing && (isEmpty(selection.nfts) || isNil(targetSelection))}
            loading={loading}
            onComplete={() => {
              if (reviewing) {
                setSettingExpiration(true)
              } else {
                setReviewing(true)
              }
            }}
            onCancel={() => {
              if (reviewing) {
                setReviewing(false)
              } else {
                onCancel?.()
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
