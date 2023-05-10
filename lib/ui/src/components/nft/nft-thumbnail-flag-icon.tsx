import { SizeSM } from '../../types/size'
import { RedFlagIcon } from '../base/icons/red-flag-icon'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface NftThumbnailFlagIconProps {
  flagged?: boolean
}

export const NftThumbnailFlagIcon: FunctionComponent<NftThumbnailFlagIconProps> = ({ flagged }) => {
  if (flagged) {
    return (
      <div className={clsx('absolute', 'top-2', 'left-2', 'z-10')}>
        <RedFlagIcon size={SizeSM} />
      </div>
    )
  }
  return null
}
