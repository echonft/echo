import type { User } from '@echo/model/types/user'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { DiscordIconSvg } from '@echo/ui/components/base/svg/discord-icon-svg'
import { NftDetailsLinks, NftDetailsLinksProps } from '@echo/ui/components/nft/details/nft-details-links'
import { links } from '@echo/ui/constants/links'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props extends NftDetailsLinksProps {
  collectionName: string
  title: string | undefined
  tokenId: number
  owner: User
}

export const NftDetailsHeader: FunctionComponent<Props> = ({ collectionName, tokenId, owner, openSeaUrl, blurUrl }) => {
  return (
    <div className={clsx('flex', 'flex-col')}>
      <h2 className={clsx('prose-label-lg', 'text-white', 'mb-4.5', 'w-max')}>{collectionName}</h2>
      <div className={clsx('flex', 'flex-row', 'grow', 'justify-between', 'items-center', 'mb-2.5')}>
        <span
          className={clsx('prose-display-md-bold', 'text-white')}
        >{`${collectionName} #${tokenId.toString()}`}</span>
        <NftDetailsLinks openSeaUrl={openSeaUrl} blurUrl={blurUrl} />
      </div>
      <InternalLink path={links.user.items(owner.username)}>
        <div
          className={clsx(
            'flex',
            'flex-row',
            'w-max',
            'gap-2.5',
            'py-1.5',
            'px-4',
            'rounded-lg',
            'bg-purple-500',
            'text-white',
            'items-center'
          )}
        >
          <DiscordIconSvg width={20} />
          <span className={clsx('prose-label-lg', 'text-white')}>{owner.discord.username}</span>
        </div>
      </InternalLink>
    </div>
  )
}
