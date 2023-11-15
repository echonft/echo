import { Img } from '@echo/ui/components/base/img'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { links } from '@echo/ui/constants/links'
import { SIZE_LG, SIZE_MD } from '@echo/ui/constants/size'
import { getTranslator } from '@echo/ui/messages/get-translator'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  slug: string
  pictureUrl: string
  name: string
  swapsCount: number | undefined
  size: typeof SIZE_MD | typeof SIZE_LG
}

export const CollectionTile: FunctionComponent<Props> = ({ slug, pictureUrl, name, swapsCount, size }) => {
  const t = getTranslator()
  return (
    <InternalLink
      className={clsx(
        size === SIZE_LG && ['w-[27rem]', 'h-[27rem]'],
        size === SIZE_MD && ['w-[21rem]', 'h-[21rem]'],
        'relative',
        'rounded-2xl',
        'z-20'
      )}
      path={links.collection.items(slug)}
    >
      <Img
        className={clsx('rounded-2xl')}
        src={pictureUrl}
        height={size === SIZE_LG ? 432 : 336}
        width={size === SIZE_LG ? 432 : 336}
        alt={name}
      />
      <div
        className={clsx(
          'rounded-2xl',
          'absolute',
          'inset-0',
          'z-10',
          'bg-collectionTitle',
          'px-7',
          'py-4.5',
          'flex',
          'flex-col',
          'justify-end'
        )}
      >
        <div className={clsx('flex', 'flex-col', 'gap-2')}>
          <p className={clsx('prose-header-xs-semi', 'text-white')}>{name}</p>
          <p className={clsx('prose-paragraph-xs-light', 'text-white')}>
            {t('collection.tile.swapsCount', { count: swapsCount ?? 0 })}
          </p>
        </div>
      </div>
    </InternalLink>
  )
}
