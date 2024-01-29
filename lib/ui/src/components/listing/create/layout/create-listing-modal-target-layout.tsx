import { SwapDirectionHeader } from '@echo/ui/components/base/swap-direction-header'
import { SWAP_DIRECTION_IN } from '@echo/ui/constants/swap-direction'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const CreateListingModalTargetLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const t = useTranslations('listing.assets')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-11')}>
      <SwapDirectionHeader direction={SWAP_DIRECTION_IN} title={t('in')} />
      <div className={clsx('w-full')}>{children}</div>
    </div>
  )
}
