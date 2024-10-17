import { ListingRole } from '@echo/model/constants/listing-role'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  role: Nullable<ListingRole>
}

export const ListingDetailsUserStateLayout: FunctionComponent<PropsWithChildren<Props>> = ({ role, children }) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        role === ListingRole.Creator ? 'justify-end' : 'justify-between',
        'items-center',
        'pb-5'
      )}
    >
      {children}
    </div>
  )
}
