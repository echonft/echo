import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { ShowIfNil } from '@echo/ui/components/base/utils/show-if-nil'
import { NewListingSliderTargetRow } from '@echo/ui/components/listing/new/new-listing-slider-target-row'
import { SwapDirectionHeader } from '@echo/ui/components/shared/swap-direction-header'
import { DirectionIn } from '@echo/ui/constants/swap-direction'
import type { ListingTarget } from '@echo/ui/types/model/listing-target'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  target: ListingTarget | undefined
  onEdit?: (targetCollectionId: string, amount: number) => unknown
  onRemove?: (targetCollectionId: string) => unknown
}

export const NewListingSliderTargetContainer: FunctionComponent<Props> = ({ target, onEdit, onRemove }) => {
  const t = useTranslations('listing.new.bottomSlider')
  const tShared = useTranslations('assets')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-11')}>
      <SwapDirectionHeader direction={DirectionIn} title={tShared('in')} />
      <div className={clsx('w-full')}>
        <HideIfNil
          checks={target}
          render={(target) => (
            <NewListingSliderTargetRow
              collectionName={target.collection.name}
              quantity={target.amount}
              onQuantityChange={(newQuantity) => onEdit?.(target.collection.id, newQuantity)}
              pictureUrl={target.collection.profilePictureUrl}
              bannerUrl={target.collection.bannerUrl}
              onRemove={() => onRemove?.(target.collection.id)}
              key={target.collection.id}
            />
          )}
        />
        <ShowIfNil checks={target}>
          <div className={clsx('flex', 'h-40', 'px-2', 'justify-center', 'items-center', 'self-stretch')}>
            <span className={clsx('text-white/10', 'prose-display-sm', 'whitespace-pre-line', 'text-center')}>
              {t('emptyTargets')}
            </span>
          </div>
        </ShowIfNil>
      </div>
    </div>
  )
}
