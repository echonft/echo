import { RedFlagIcon } from '@echo/ui/components/base/icons/red-flag-icon'
import { SizeSM } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  flagged?: boolean
}

export const NftThumbnailFlagIcon: FunctionComponent<Props> = ({ flagged }) => {
  if (flagged) {
    return (
      <div className={clsx('absolute', 'top-2', 'left-2', 'z-10')}>
        <RedFlagIcon size={SizeSM} />
      </div>
    )
  }
  return null
}
