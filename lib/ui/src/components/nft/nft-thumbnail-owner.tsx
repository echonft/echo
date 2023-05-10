import { DiscordIconSvg } from '../base/svg/discord-icon-svg'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface NftThumbnailOwnerProps {
  owner: string
}

export const NftThumbnailOwner: FunctionComponent<NftThumbnailOwnerProps> = ({ owner }) => {
  return (
    <div
      className={clsx(
        'absolute',
        'bottom-2',
        'left-2',
        'z-10',
        'flex',
        'flex-row',
        'items-center',
        'bg-purple-500',
        'rounded-lg',
        'px-1.5',
        'py-0.5',
        'gap-0.5',
        'text-white',
        'shadow-[2px_2px_4px_rgba(0,0,0,0.57)]'
      )}
    >
      <DiscordIconSvg width={9} />
      <span className={clsx('font-inter', 'text-[0.625rem]', 'font-medium', 'leading-normal', 'tracking-[0.01rem]')}>
        {owner}
      </span>
    </div>
  )
}
