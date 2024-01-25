import { InternalLink } from '@echo/ui/components/base/internal-link'
import { ListingRow, type ListingRowProps } from '@echo/ui/components/listing/row/listing-row'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props extends ListingRowProps {
  path?: string
}

// TODO Not sure if the naming is right, could be a layout component with children
export const ListingRowSwitch: FunctionComponent<Props> = ({ path, ...props }) => {
  if (isNil(path)) {
    return <ListingRow {...props} />
  }
  return (
    <InternalLink path={path}>
      <ListingRow {...props} />
    </InternalLink>
  )
}
