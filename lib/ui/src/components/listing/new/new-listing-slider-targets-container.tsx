import { AddMoreDisclosureButton } from '../../base/add-more-disclosure-button'
import { NewOfferItemTitle } from './new-offer-item-title'
import { TargetRow } from './target-row'
import { ListingTarget } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  targets: ListingTarget[]
  onAddMore?: () => unknown
  onRemove?: (target: ListingTarget) => unknown
}

export const NewListingSliderTargetsContainer: FunctionComponent<Props> = ({ targets, onAddMore }) => {
  const t = useTranslations('listing.misc')
  // TODO Add quantity selector
  return (
    <div className={clsx('flex', 'flex-col', 'gap-11')}>
      <NewOfferItemTitle isReceiving={true} title={t('assetsInTitle')} />
      <div className={clsx('flex', 'flex-col', 'gap-6', 'w-full')}>
        <>
          {targets.map((target) => (
            <TargetRow
              collectionName={target.collection.name}
              pictureUrl={target.collection.profilePictureUrl}
              bannerUrl={target.collection.bannerUrl}
              key={target.collection.id}
            />
          ))}
          <div className={clsx('h-40')}>
            <AddMoreDisclosureButton onClick={onAddMore} title={t('collection')} />
          </div>
        </>
      </div>
    </div>
  )
}
