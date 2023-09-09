import { SizeSM } from '../../../constants/size'
import { RedFlagIcon } from '../../base/icons/red-flag-icon'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

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
