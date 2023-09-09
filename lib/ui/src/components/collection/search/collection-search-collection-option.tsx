import { CheckmarkIconSvg } from '../../base/svg/checkmark-icon-svg'
import { HideIfNil } from '../../base/utils/hide-if-nil'
import { ShowIf } from '../../base/utils/show-if'
import { CollectionRoundedProfilePicture } from './collection-rounded-profile-picture'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  pictureUrl: URL | undefined
  selected: boolean
  collectionName: string
  collectionSupply: number | undefined
}

export const CollectionSearchCollectionOption: FunctionComponent<Props> = ({
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
        'rounded-lg',
        'p-2',
        'flex',
        'flex-row',
        'justify-between',
        'items-center'
      )}
    >
      <div className={clsx('flex', 'flex-row', 'self-stretch', 'gap-3')}>
        <CollectionRoundedProfilePicture pictureUrl={pictureUrl} collectionName={collectionName} />
        <div className={clsx('flex', 'flex-col', 'gap-1', 'justify-center')}>
          <span className={clsx('prose-header-sm-semi', 'text-white')}>{collectionName}</span>
          <HideIfNil
            checks={collectionSupply}
            render={(collectionSupply) => (
              <span className={clsx('prose-header-sm', 'text-white/70')}>
                {t('itemsCount', { count: collectionSupply })}
              </span>
            )}
          />
        </div>
      </div>
      <ShowIf condition={selected}>
        <CheckmarkIconSvg className={clsx('text-white')} width={24} />
      </ShowIf>
    </div>
  )
}
