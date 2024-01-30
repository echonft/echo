import { CreateListingSwapDirectionHeader } from '@echo/ui/components/listing/create/create-listing-swap-direction-header'
import { SWAP_DIRECTION_IN } from '@echo/ui/constants/swap-direction'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  disabled?: boolean
}
export const CreateListingModalTargetLayout: FunctionComponent<PropsWithChildren<Props>> = ({ disabled, children }) => {
  const t = useTranslations('listing.create.assets')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-11')}>
      <CreateListingSwapDirectionHeader direction={SWAP_DIRECTION_IN} title={t('in')} disabled={disabled} />
      <div className={clsx('w-full')}>{children}</div>
    </div>
  )
}
