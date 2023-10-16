import type { NftAttribute } from '@echo/model/types/nft-attribute'
import { NftDetailsAttribute } from '@echo/ui/components/nft/details/nft-details-attribute'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  attributes: NftAttribute[]
}

export const NftDetailsAttributesPanel: FunctionComponent<Props> = ({ attributes }) => {
  const t = useTranslations('nft.details.attributes')

  return (
    <div className={clsx('flex', 'flex-col', 'h-max', 'min-h-[24.575rem]', 'rounded-2xl', 'bg-white/[0.09]', 'py-5')}>
      <p
        className={clsx(
          'px-7',
          'pb-5',
          'rounded-t-2xl',
          'border-b-2',
          'border-solid',
          'border-white/[0.09]',
          'prose-header-sm-semi',
          'text-white/50'
        )}
      >
        {t('title')}
      </p>
      <div className={clsx('flex', 'flex-row', 'px-7', 'pt-6', 'gap-x-8', 'gap-y-4', 'flex-wrap')}>
        {attributes.map((attribute) => (
          <NftDetailsAttribute attribute={attribute} key={`${attribute.trait}-${attribute.value}`} />
        ))}
      </div>
    </div>
  )
}
