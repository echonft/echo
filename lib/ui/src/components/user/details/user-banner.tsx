import { Banner } from '@echo/ui/components/shared/banner'
import { getUserBannerUrl } from '@echo/ui/helpers/get-user-banner-url'
import type { FunctionComponent } from 'react'

export interface UserBannerProps {
  discordId: string
  discordBanner: string | undefined
}

export const UserBanner: FunctionComponent<UserBannerProps> = ({ discordId, discordBanner }) => {
  const bannerUrl = getUserBannerUrl(discordId, discordBanner, 2048)
  return <Banner bannerUrl={bannerUrl} />
}
