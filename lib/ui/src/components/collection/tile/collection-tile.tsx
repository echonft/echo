import type { Slug } from '@echo/model/types/slug'
import { pathProvider } from '@echo/routing/path/path-provider'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { PictureSize } from '@echo/ui/constants/picture-size'
import { Size } from '@echo/ui/constants/size'
import { addPictureSize } from '@echo/ui/helpers/add-picture-size'
import { themeExtension } from '@echo/ui/helpers/theme/theme'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  slug: Slug
  pictureUrl: Nullable<string>
  name: string
  swapsCount: Nullable<number>
  size: Size.MD | Size.LG
}

export const CollectionTile: FunctionComponent<Props> = ({ slug, pictureUrl, name, swapsCount, size }) => {
  const t = useTranslations('collection')
  const url = addPictureSize({ src: pictureUrl ?? '', width: PictureSize.LG })
  return (
    <InternalLink path={pathProvider.collection.default.get({ slug })}>
      <div
        className={clsx(
          'rounded-2xl',
          'bg-contain',
          'px-7',
          'py-4.5',
          'flex',
          'flex-col',
          'justify-end',
          size === Size.LG && ['w-[27rem]', 'h-[27rem]'],
          size === Size.MD && ['w-[21rem]', 'h-[21rem]']
        )}
        style={{
          backgroundImage: `${themeExtension.backgroundImage.collectionTitle}, url('${url}'), linear-gradient(0deg, ${themeExtension.colors.dark['500']}, ${themeExtension.colors.dark['500']})`
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
