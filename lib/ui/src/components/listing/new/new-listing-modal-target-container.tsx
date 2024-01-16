import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { ShowIfNil } from '@echo/ui/components/base/utils/show-if-nil'
import type { Target } from '@echo/ui/components/listing/new/new-listing-manager'
import { NewListingModalTargetRow } from '@echo/ui/components/listing/new/new-listing-modal-target-row'
import { SwapDirectionHeader } from '@echo/ui/components/shared/swap-direction-header'
import { SWAP_DIRECTION_IN } from '@echo/ui/constants/swap-direction'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  target: Target | undefined
  isMutating?: boolean
  onEdit?: (targetCollectionId: string, amount: number) => unknown
}

export const NewListingModalTargetContainer: FunctionComponent<Props> = ({ target, isMutating, onEdit }) => {
  const t = useTranslations('listing.new.confirmationModal')
  const tShared = useTranslations('assets')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-11')}>
      <SwapDirectionHeader direction={SWAP_DIRECTION_IN} title={tShared('in')} />
      <div className={clsx('w-full')}>
        <HideIfNil
          checks={target}
          render={(target) => (
            <NewListingModalTargetRow
              collectionName={target.collection.name}
              quantity={target.amount}
              onQuantityChange={(newQuantity) => onEdit?.(target.collection.id, newQuantity)}
              pictureUrl={target.collection.profilePictureUrl}
              bannerUrl={target.collection.bannerUrl}
              key={target.collection.id}
              isMutating={isMutating}
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
