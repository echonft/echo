import { classes } from '@echo/ui/helpers/classes'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { type FunctionComponent } from 'react'

interface Props {
  onRemove?: EmptyFunction
}

export const NftThumbnailRemoveButton: FunctionComponent<Props> = ({ onRemove }) => {
  return (
    <button className={classes('w-max', 'h-max')} onClick={onRemove}>
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          <circle cx="7.5" cy="7.5" r="7.5" fill="#FF0000" />
          <path
            d="M4.79371 10.7465C4.90994 10.8627 5.09838 10.8627 5.21461 10.7465L7.55945 8.40161L9.9043 10.7465C10.0205 10.8627 10.209 10.8627 10.3252 10.7465L10.7461 10.3256C10.8623 10.2093 10.8623 10.0209 10.7461 9.90466L8.40125 7.55982L10.7461 5.21498C10.8623 5.09875 10.8623 4.91031 10.7461 4.79408L10.3252 4.37318C10.209 4.25695 10.0205 4.25695 9.9043 4.37318L7.55945 6.71803L5.21461 4.37318C5.09838 4.25695 4.90994 4.25695 4.79371 4.37318L4.37282 4.79408C4.25659 4.91031 4.25659 5.09875 4.37282 5.21498L6.71766 7.55982L4.37282 9.90466C4.25659 10.0209 4.25659 10.2093 4.37282 10.3256L4.79371 10.7465Z"
            fill="#FBFBFD"
          />
        </g>
      </svg>
    </button>
  )
}
