import { LISTING_ROLE_CREATOR } from '@echo/model/constants/listing-role'
import type { ListingRole } from '@echo/model/types/listing-role'
import { classes } from '@echo/ui/helpers/classes'
import type { Nullable } from '@echo/utils/types/nullable'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  role: Nullable<ListingRole>
}
export const ListingDetailsUserStateLayout: FunctionComponent<PropsWithChildren<Props>> = ({ role, children }) => {
  return (
    <div
      className={classes(
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
