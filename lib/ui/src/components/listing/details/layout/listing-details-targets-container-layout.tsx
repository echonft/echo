import { LISTING_ROLE_CREATOR } from '@echo/model/constants/listing-role'
import type { ListingRole } from '@echo/model/types/listing-role'
import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  role: ListingRole | undefined
}
export const ListingDetailsTargetsContainerLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  role,
  children
}) => {
  return (
    <div className={clsx('flex', 'flex-row', role === LISTING_ROLE_CREATOR ? 'justify-center' : 'justify-end')}>
      {children}
    </div>
  )
}
