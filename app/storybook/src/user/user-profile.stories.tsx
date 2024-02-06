// noinspection JSUnusedGlobalSymbols

import { getUserProfileMockByUsername } from '@echo/model-mocks/user/user-profile-mock'
import { UserProfile } from '@echo/ui/components/user/profile/user-profile'
import type { Nullable } from '@echo/utils/types/nullable'
import { type Meta, type StoryObj } from '@storybook/react'
import { assocPath, pipe } from 'ramda'
import { type FunctionComponent } from 'react'

type BannerType = 'Color' | 'Default' | 'Image'
type ComponentType = FunctionComponent<{ banner: BannerType; bannerColor: Nullable<string> }>

const metadata: Meta<ComponentType> = {
  title: 'User/Profile ',
  args: {
    bannerColor: '#d11bd9',
    banner: 'Image'
  },
  argTypes: {
    bannerColor: {
      defaultValue: '#d11bd9',
      control: 'color',
      if: { arg: 'banner', eq: 'Color' }
    },
    banner: {
      defaultValue: 'Image',
      options: ['Color', 'Default', 'Image'],
      control: { type: 'radio' }
    }
  }
}

export default metadata

export const Profile: StoryObj<ComponentType> = {
  render: ({ bannerColor, banner }) => {
    const profile = pipe(
      getUserProfileMockByUsername,
      assocPath(
        ['discord', 'bannerUrl'],
        banner === 'Image'
          ? 'https://firebasestorage.googleapis.com/v0/b/echo-83309.appspot.com/o/sunflyers-banner.png?alt=media'
          : undefined
      ),
      assocPath(['discord', 'bannerColor'], banner === 'Color' ? bannerColor : undefined)
    )('johnnycagewins')
    return <UserProfile profile={profile} />
  }
}
