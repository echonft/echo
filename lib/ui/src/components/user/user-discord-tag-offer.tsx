import { DiscordIconSvg } from '../base/svg/discord-icon-svg'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  owner: string
}

export const UserDiscordTagOffer: FunctionComponent<Props> = ({ owner }) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'items-center',
        'bg-purple-500',
        'rounded-lg',
        'px-1.5',
        'gap-0.5',
        'text-white',
        'shadow-tag'
      )}
    >
      <DiscordIconSvg width={9} />
      <span className={clsx('font-inter', 'text-[0.625rem]', 'font-medium', 'leading-[155%]', 'tracking-[0.00625rem]')}>
        {owner}
      </span>
    </div>
  )
}
