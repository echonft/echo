import type { Collection } from '@echo/model/types/collection'
import { VerifiedIconSvg } from '@echo/ui/components/base/svg/verified-icon-svg'
import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent } from 'react'

export const CollectionProfileVerifiedIcon: FunctionComponent<Pick<Collection, 'verified'>> = ({ verified }) => {
  if (verified) {
    return <VerifiedIconSvg className={classes('text-yellow-500')} width={30} height={28} />
  }
  return null
}
