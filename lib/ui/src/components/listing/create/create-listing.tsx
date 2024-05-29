'use client'
import { DEFAULT_EXPIRATION_TIME } from '@echo/model/constants/default-expiration-time'
import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import type { Collection } from '@echo/model/types/collection'
import type { ListingTarget } from '@echo/model/types/listing-target'
import type { Nft } from '@echo/model/types/nft'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { StateExpiration } from '@echo/ui/components/base/state-expiration'
import { CreateListingButtons } from '@echo/ui/components/listing/create/create-listing-buttons'
import { CreateListingNfts } from '@echo/ui/components/listing/create/create-listing-nfts'
import { CreateListingSwapDirectionHeader } from '@echo/ui/components/listing/create/create-listing-swap-direction-header'
import { CreateListingTargets } from '@echo/ui/components/listing/create/create-listing-targets'
import { CreateOfferSwapDirectionHeader } from '@echo/ui/components/offer/create/create-offer-swap-direction-header'
import { SWAP_DIRECTION_IN, SWAP_DIRECTION_OUT } from '@echo/ui/constants/swap-direction'
import type { Selectable } from '@echo/ui/types/selectable'
import { isInWith } from '@echo/utils/fp/is-in-with'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import { always, append, assoc, isEmpty, isNil, pipe, reject, unless } from 'ramda'
import { type FunctionComponent, useCallback, useMemo, useState } from 'react'

interface Props {
  creatorNfts: Selectable<Nft>[]
  items: Nullable<Nft[]>
  target: Nullable<Collection>
  loading?: boolean
  onCancel?: VoidFunction
  onComplete?: (items: Nft[], target: ListingTarget) => void
}

export const CreateListing: FunctionComponent<Props> = ({
  creatorNfts,
  items,
  target,
  loading,
  onCancel,
  onComplete
}) => {
  const [itemsSelection, setItemsSelection] = useState<Selectable<Nft>[]>(items ?? [])
  const [targetSelection, setTargetSelection] = useState<Nullable<ListingTarget>>(
    isNil(target) ? undefined : { collection: target, amount: 1 }
  )
  const [reviewing, setReviewing] = useState(false)
  const selectItem = useCallback(
    (nft: Selectable<Nft>) => {
      setItemsSelection(append(nft))
    },
    [setItemsSelection]
  )

  const unselectItem = useCallback(
    (nft: Selectable<Nft>) => {
      setItemsSelection(reject(eqNft(nft)))
    },
    [setItemsSelection]
  )
  const nfts = useMemo(
    () =>
      pipe<[Selectable<Nft>[]], Selectable<Nft>[], Selectable<Nft>[]>(
        unless<Selectable<Nft>[], Selectable<Nft>[]>(always(isEmpty(itemsSelection)), always(itemsSelection)),
        reject(isInWith(itemsSelection, eqNft))
      )(creatorNfts),
    [itemsSelection, creatorNfts]
  )

  return (
    <div className={clsx('flex', 'flex-col', 'gap-24')}>
      <div className={clsx('flex', 'flex-row', 'justify-end')}>
        <StateExpiration
          expiresAt={dayjs().add(DEFAULT_EXPIRATION_TIME, 'day').unix()}
          readOnly={false}
          state={OFFER_STATE_OPEN}
        />
      </div>
      <div className={clsx('flex', 'flex-col', 'gap-20')}>
        <CreateListingSwapDirectionHeader direction={SWAP_DIRECTION_IN} />
        <div className={clsx('flex', 'flex-row', 'justify-center', 'h-max', 'w-full', 'px-8')}>
          <div className={clsx('h-max', 'w-full', 'max-w-[40rem]')}>
            <CreateListingTargets
              readOnly={reviewing}
              target={targetSelection}
              onQtyChange={(newQuantity) => {
                setTargetSelection(assoc('amount', newQuantity))
              }}
              onRemove={() => {
                setTargetSelection(undefined)
              }}
              onSelect={(selection) => {
                setTargetSelection({ collection: selection, amount: 1 })
              }}
            />
          </div>
        </div>
        <div className={clsx('pb-4')}>
          <ItemsSeparator />
        </div>
        <CreateOfferSwapDirectionHeader direction={SWAP_DIRECTION_OUT} />
        <div className={clsx('flex', 'flex-row', 'justify-center', 'h-max', 'w-full', 'px-8')}>
          <CreateListingNfts
            nfts={nfts}
            selection={itemsSelection}
            readOnly={reviewing}
            onSelect={selectItem}
            onUnselect={unselectItem}
          />
        </div>
        <div className={clsx('flex', 'flex-row', 'gap-8', 'justify-center', 'items-center', 'pb-5')}>
          <CreateListingButtons
            readOnly={reviewing}
            disabled={!reviewing && (isEmpty(itemsSelection) || isEmpty(targetSelection))}
            loading={loading}
            onComplete={() => {
              if (reviewing) {
                onComplete?.(itemsSelection, targetSelection!)
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
