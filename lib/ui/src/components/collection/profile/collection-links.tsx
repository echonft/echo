import { ExternalLink } from '@echo/ui/components/base/external-link'
import { DiscordIcon } from '@echo/ui/components/base/icons/discord-icon'
import { TwitterIcon } from '@echo/ui/components/base/icons/twitter-icon'
import { WebsiteIcon } from '@echo/ui/components/base/icons/website-icon'
import { SIZE_MD } from '@echo/ui/constants/size'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

export interface CollectionLinksProps {
  websiteUrl?: Nullable<string>
  discordUrl?: Nullable<string>
  twitterUsername?: Nullable<string>
}

export const CollectionWebsite: FunctionComponent<Pick<CollectionLinksProps, 'websiteUrl'>> = ({ websiteUrl }) => {
  if (isNil(websiteUrl)) {
    return null
  }
  return (
    <ExternalLink href={websiteUrl}>
      <WebsiteIcon size={SIZE_MD} />
    </ExternalLink>
  )
}
const CollectionTwitter: FunctionComponent<Pick<CollectionLinksProps, 'twitterUsername'>> = ({ twitterUsername }) => {
  if (isNil(twitterUsername)) {
    return null
  }
  return (
    <ExternalLink href={`https://twitter.com/${twitterUsername}`}>
      <TwitterIcon size={SIZE_MD} />
    </ExternalLink>
  )
}
const CollectionDiscord: FunctionComponent<Pick<CollectionLinksProps, 'discordUrl'>> = ({ discordUrl }) => {
  if (isNil(discordUrl)) {
    return null
  }
  return (
    <ExternalLink href={discordUrl}>
      <DiscordIcon size={SIZE_MD} />
    </ExternalLink>
  )
}

export const CollectionLinks: FunctionComponent<CollectionLinksProps> = ({
  websiteUrl,
  twitterUsername,
  discordUrl
}) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-2')}>
      <CollectionWebsite websiteUrl={websiteUrl} />
      <CollectionTwitter twitterUsername={twitterUsername} />
      <CollectionDiscord discordUrl={discordUrl} />
    </div>
  )
}
