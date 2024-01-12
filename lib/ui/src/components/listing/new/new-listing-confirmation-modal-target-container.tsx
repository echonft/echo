import { ModalSubtitle } from '@echo/ui/components/layout/modal/modal-subtitle'
import type { Target } from '@echo/ui/components/listing/new/new-listing-manager'
import { NewListingModalTargetRow } from '@echo/ui/components/listing/new/new-listing-modal-target-row'
import { SwapDirectionHeader } from '@echo/ui/components/shared/swap-direction-header'
import { SWAP_DIRECTION_IN } from '@echo/ui/constants/swap-direction'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  target: Target
}

export const NewListingConfirmationModalTargetContainer: FunctionComponent<Props> = ({ target }) => {
  const { amount, collection } = target

  const t = useTranslations('listing.new.confirmationModal')
  const tShared = useTranslations('assets')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center')}>
        <ModalSubtitle>{t('targetSubtitle')}</ModalSubtitle>
        <SwapDirectionHeader direction={SWAP_DIRECTION_IN} title={tShared('in')} />
      </div>
      <NewListingModalTargetRow
        collectionName={collection.name}
        pictureUrl={collection.profilePictureUrl}
        bannerUrl={collection.bannerUrl}
        quantity={amount}
      />
    </div>
  )
}
