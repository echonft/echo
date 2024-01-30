import { LISTING_ROLE_CREATOR } from '@echo/model/constants/listing-role'
import type { ListingRole } from '@echo/model/types/listing-role'
import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  role: ListingRole | undefined
}
export const ListingDetailsUserStateLayout: FunctionComponent<PropsWithChildren<Props>> = ({ role, children }) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        role === LISTING_ROLE_CREATOR ? 'justify-end' : 'justify-between',
        'items-center',
        'pb-5'
      )}
    >
      {children}
    </div>
  )
}
