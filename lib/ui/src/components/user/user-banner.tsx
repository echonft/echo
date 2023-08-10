import { Banner } from '../base/banner'
import { getUserBannerUrl } from '@echo/discord'
import { FunctionComponent } from 'react'

export interface UserBannerProps {
  discordId: string
  discordBanner: string | undefined
}

export const UserBanner: FunctionComponent<UserBannerProps> = ({ discordId, discordBanner }) => {
  const bannerUrl = getUserBannerUrl(discordId, discordBanner, 2048)
  return <Banner bannerUrl={bannerUrl} />
}
