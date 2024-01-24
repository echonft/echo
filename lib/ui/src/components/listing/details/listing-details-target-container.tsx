import type { ListingTarget } from '@echo/model/types/listing-target'
import { CollectionProfilePicture } from '@echo/ui/components/collection/details/collection-profile-picture'
import { SIZE_SM } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  target: ListingTarget
}

export const ListingDetailsTargetContainer: FunctionComponent<Props> = ({ target }) => {
  const t = useTranslations('listing.details.target')

  return (
    <div className={clsx('flex', 'flex-row', 'items-center', 'gap-4.5')}>
      <span className={clsx('prose-paragraph-lg', '!text-[0.9375rem]', 'text-white')}>
        {t('quantity', { count: target.amount })}
      </span>
      <div
        className={clsx(
          'flex',
          'flex-row',
          'pt-3.5',
          'pb-3.75',
          'px-3.25',
          'gap-3.5',
          'items-center',
          'w-96',
          'rounded-lg',
          'border',
          'border-white/10'
        )}
      >
        <CollectionProfilePicture
          collectionName={target.collection.name}
          pictureUrl={target.collection.profilePictureUrl}
          size={SIZE_SM}
          border={false}
        />
        <div className={clsx('flex', 'flex-col', 'justify-center')}>
          <span className={clsx('prose-header-sm', 'text-white')}>{target.collection.name}</span>
          <span className={clsx('prose-label-xs', '!text-[0.8125rem]', 'text-white/70', '!leading-6')}>
            {t('collectionSize', { count: target.collection.totalSupply })}
          </span>
        </div>
      </div>
    </div>
  )
}
