import { linkProvider } from '@echo/api/routing/link-provider'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { SIZE_LG, SIZE_MD } from '@echo/ui/constants/size'
import { themeExtension } from '@echo/ui/helpers/theme/theme'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  slug: string
  pictureUrl: string
  name: string
  swapsCount: Nullable<number>
  size: typeof SIZE_MD | typeof SIZE_LG
}

export const CollectionTile: FunctionComponent<Props> = ({ slug, pictureUrl, name, swapsCount, size }) => {
  const t = useTranslations('collection')
  return (
    <InternalLink className={clsx('relative')} path={linkProvider.collection.items.get({ slug })}>
      <div
        className={clsx(
          'rounded-2xl',
          'bg-contain',
          'px-7',
          'py-4.5',
          'flex',
          'flex-col',
          'justify-end',
          size === SIZE_LG && ['w-[27rem]', 'h-[27rem]'],
          size === SIZE_MD && ['w-[21rem]', 'h-[21rem]']
        )}
        style={{
          backgroundImage: `${themeExtension.backgroundImage.collectionTitle}, url('${pictureUrl}')`
        }}
      >
        <div className={clsx('flex', 'flex-col', 'gap-2')}>
          <p className={clsx('prose-header-xs-semi', 'text-white')}>{name}</p>
          <p className={clsx('prose-paragraph-xs-light', 'text-white')}>
            {t('tile.swapsCount', { count: swapsCount ?? 0 })}
          </p>
        </div>
      </div>
    </InternalLink>
  )
}
