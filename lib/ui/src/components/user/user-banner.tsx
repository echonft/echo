import { getUserBannerUrl } from '../../helpers/get-user-banner-url'
import { Banner } from '../base/banner'
import { FunctionComponent } from 'react'

export interface UserBannerProps {
  discordId: string
  discordBanner: string | undefined
}

export const UserBanner: FunctionComponent<UserBannerProps> = ({ discordId, discordBanner }) => {
  const bannerUrl = getUserBannerUrl(discordId, discordBanner, 2048)
  return <Banner bannerUrl={bannerUrl} />
}
