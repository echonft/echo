import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { CollectionTileImage } from '@echo/ui/components/collection/tile/collection-tile-image'
import { Size } from '@echo/ui/constants/size'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  slug: Lowercase<string>
  pictureUrl: Nullable<string>
  name: string
  swapsCount: Nullable<number>
  size: Size.MD | Size.LG
}

export const CollectionTile: FunctionComponent<Props> = ({ slug, pictureUrl, name, swapsCount, size }) => {
  const t = useTranslations('collection')
  return (
    <InternalLink path={frontendRoutes.collection.details.get({ slug })}>
      <div
        className={clsx(
          'relative',
          'rounded-2xl',
          'px-7',
          'py-4.5',
          'flex',
          'flex-col',
          'justify-end',
          size === Size.MD && ['w-[21rem]', 'h-[21rem]'],
          size === Size.LG && ['w-[27rem]', 'h-[27rem]']
        )}
      >
        <CollectionTileImage src={pictureUrl} alt={name} size={size} />
        <div className={clsx('flex', 'flex-col', 'gap-2', 'z-2')}>
          <p className={clsx('prose-header-xs-semi', 'text-white')}>{name}</p>
          <p className={clsx('prose-paragraph-xs-light', 'text-white')}>
            {t('tile.swapsCount', { count: swapsCount ?? 0 })}
          </p>
        </div>
      </div>
    </InternalLink>
  )
}
