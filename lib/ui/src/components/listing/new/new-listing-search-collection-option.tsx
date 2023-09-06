import { CollectionRoundedProfilePicture } from '../../collection/collection-rounded-profile-picture'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  pictureUrl: URL | undefined
  selected: boolean
  collectionName: string
  collectionSupply: number | undefined
}

export const NewListingSearchCollectionOption: FunctionComponent<Props> = ({
  pictureUrl,
  selected,
  collectionName,
  collectionSupply
}) => {
  const t = useTranslations('listing.new.bottomSlider')

  return (
    <div
      className={clsx(
        'hover:bg-white/[0.08]',
        selected && 'bg-white/[0.08]',
        'rounded-lg',
        'p-2',
        'flex',
        'flex-row',
        'gap-3'
      )}
    >
      <CollectionRoundedProfilePicture pictureUrl={pictureUrl} collectionName={collectionName} />
      <div className={clsx('flex', 'flex-col', 'gap-1', 'justify-center')}>
        <span className={clsx('prose-header-sm-semi', 'text-white')}>{collectionName}</span>
        {collectionSupply && (
          <span className={clsx('prose-header-sm', 'text-white/70')}>
            {t('itemsCount', { count: collectionSupply })}
          </span>
        )}
      </div>
    </div>
  )
}
