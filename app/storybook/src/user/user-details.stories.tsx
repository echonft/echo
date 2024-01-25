// noinspection JSUnusedGlobalSymbols

import type { UserProfile } from '@echo/model/types/user-profile'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { type Meta, type StoryObj } from '@storybook/react'
import { assocPath, pipe } from 'ramda'
import { type FunctionComponent } from 'react'

const BANNER_COLOR = 'Color' as const
const BANNER_DEFAULT = 'Default' as const
const BANNER_IMAGE = 'Image' as const
const BANNERS = [BANNER_COLOR, BANNER_DEFAULT, BANNER_IMAGE] as const
type BannerType = (typeof BANNERS)[number]
type ComponentType = FunctionComponent<Record<'banner', BannerType> & Record<'bannerColor', string | undefined>>
const DEFAULT_DEFAULT_BANNER = BANNER_IMAGE
const DEFAULT_BANNER_COLOR = '#d11bd9'

const metadata: Meta<ComponentType> = {
  title: 'User/Details ',
  argTypes: {
    bannerColor: {
      defaultValue: DEFAULT_BANNER_COLOR,
      control: 'color',
      if: { arg: 'banner', eq: BANNER_COLOR }
    },
    banner: {
      defaultValue: DEFAULT_DEFAULT_BANNER,
      options: BANNERS,
      control: { type: 'radio' }
    }
  }
}

export default metadata
type Story = StoryObj<ComponentType>

export const Details: Story = {
  args: {
    bannerColor: DEFAULT_BANNER_COLOR,
    banner: DEFAULT_DEFAULT_BANNER
  },
  render: ({ bannerColor, banner }) => {
    const user = pipe(
      getAuthUserMockByUsername,
      assocPath(
        ['discord', 'bannerUrl'],
        banner === BANNER_IMAGE
          ? 'https://firebasestorage.googleapis.com/v0/b/echo-83309.appspot.com/o/sunflyers-banner.png?alt=media'
          : undefined
      ),
      assocPath(['discord', 'bannerColor'], banner === BANNER_COLOR ? bannerColor : undefined)
    )('johnnycagewins')
    return <UserDetails user={user as UserProfile} />
  }
}
