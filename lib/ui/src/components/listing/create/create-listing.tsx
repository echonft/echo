'use client'
import { DEFAULT_EXPIRATION_TIME } from '@echo/model/constants/default-expiration-time'
import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import type { Collection } from '@echo/model/types/collection'
import type { ListingTarget } from '@echo/model/types/listing-target'
import type { Nft } from '@echo/model/types/nft'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { StateExpiration } from '@echo/ui/components/base/state-expiration'
import { CreateListingButtons } from '@echo/ui/components/listing/create/create-listing-buttons'
import { CreateListingExpiration } from '@echo/ui/components/listing/create/create-listing-expiration'
import { CreateListingNfts } from '@echo/ui/components/listing/create/create-listing-nfts'
import { CreateListingSwapDirectionHeader } from '@echo/ui/components/listing/create/create-listing-swap-direction-header'
import { CreateListingTargets } from '@echo/ui/components/listing/create/create-listing-targets'
import { CreateOfferSwapDirectionHeader } from '@echo/ui/components/offer/create/create-offer-swap-direction-header'
import { SWAP_DIRECTION_IN, SWAP_DIRECTION_OUT } from '@echo/ui/constants/swap-direction'
import { useNfts } from '@echo/ui/hooks/use-nfts'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import { assoc, isEmpty, isNil } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  creatorNfts: Nft[]
  items: Nullable<Nft[]>
  target: Nullable<Collection>
  loading?: boolean
  onCancel?: VoidFunction
  onComplete?: (items: Nft[], target: ListingTarget, expiresAt: number) => void
}

export const CreateListing: FunctionComponent<Props> = ({
  creatorNfts,
  items,
  target,
  loading,
  onCancel,
  onComplete
}) => {
  const { nfts, selection, selectNft, unselectNft } = useNfts({
    nfts: creatorNfts,
    sortBy: 'collection',
    initialSelection: { nfts: items }
  })
  const [targetSelection, setTargetSelection] = useState<Nullable<ListingTarget>>(
    isNil(target) ? undefined : { collection: target, amount: 1 }
  )
  const [reviewing, setReviewing] = useState(false)
  // TODO Probably should change that, not the most beautiful
  const [settingExpiration, setSettingExpiration] = useState(false)

  if (settingExpiration) {
    return (
      <CreateListingExpiration
        items={selection.nfts}
        onCancel={() => {
          setSettingExpiration(false)
          setReviewing(false)
        }}
        onComplete={(expiration) => {
          if (!isNil(targetSelection)) {
            onComplete?.(selection.nfts, targetSelection, dayjs().add(expiration, 'day').unix())
          }
        }}
        loading={loading}
      />
    )
  }

  return (
    <div className={clsx('flex', 'flex-col', 'gap-24')}>
      <div className={clsx('flex', 'flex-row', 'justify-end')}>
        {/*  FIXME expiresAt value should be derived from state */}
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
            selection={selection.nfts}
            readOnly={reviewing}
            onSelect={selectNft}
            onUnselect={unselectNft}
          />
        </div>
        <div className={clsx('flex', 'flex-row', 'gap-8', 'justify-center', 'items-center', 'pb-5')}>
          <CreateListingButtons
            readOnly={reviewing}
            disabled={!reviewing && (isEmpty(selection.nfts) || isEmpty(targetSelection))}
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
