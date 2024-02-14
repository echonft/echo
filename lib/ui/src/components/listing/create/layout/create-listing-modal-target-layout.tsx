import { CreateListingSwapDirectionHeader } from '@echo/ui/components/listing/create/create-listing-swap-direction-header'
import { SWAP_DIRECTION_IN } from '@echo/ui/constants/swap-direction'
import { classes } from '@echo/ui/helpers/classes'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  disabled?: boolean
}
export const CreateListingModalTargetLayout: FunctionComponent<PropsWithChildren<Props>> = ({ disabled, children }) => {
  const t = useTranslations('listing.create.assets')
  return (
    <div className={classes('flex', 'flex-col', 'gap-11')}>
      <CreateListingSwapDirectionHeader direction={SWAP_DIRECTION_IN} title={t('in')} disabled={disabled} />
      <div className={classes('w-full')}>{children}</div>
    </div>
  )
}
