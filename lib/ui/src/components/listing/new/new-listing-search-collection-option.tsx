import { CollectionRoundedProfilePicture } from '../../collection/collection-rounded-profile-picture'
import { NftCollection, SearchableObject } from '@echo/ui-model'
import { Combobox } from '@headlessui/react'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export interface NewListingSearchCollectionOptionProps {
  item: SearchableObject<NftCollection>
}

export const NewListingSearchCollectionOption: FunctionComponent<NewListingSearchCollectionOptionProps> = ({
  item
}) => {
  const t = useTranslations('listing.new.bottomSlider')

  return (
    <Combobox.Option
      value={item}
      className={clsx(
        'hover:bg-white/[0.08]',
        'selected:bg-white/[0.08]',
        'rounded-lg',
        'p-2',
        'flex',
        'flex-row',
        'gap-3',
        'mb-2.5',
        'last:mb-0'
      )}
    >
      <CollectionRoundedProfilePicture pictureUrl={item.value.profilePictureUrl} collectionName={item.value.name} />
      <div className={clsx('flex', 'flex-col', 'gap-1', 'justify-center')}>
        <span className={clsx('prose-header-sm-semi', 'text-white')}>{item.value.name}</span>
        <span className={clsx('prose-header-sm', 'text-white/70')}>
          {t('itemsCount', { count: item.value.totalSupply })}
        </span>
      </div>
    </Combobox.Option>
  )
}
