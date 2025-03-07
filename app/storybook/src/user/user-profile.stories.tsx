// noinspection JSUnusedGlobalSymbols

import { userMockJohnny } from '@echo/model/mocks/user-mock'
import { UserProfileSkeleton as Component } from '@echo/ui/components/user/profile/skeleton/user-profile-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Profile',
  component: Component,
  args: {
    address: userMockJohnny.wallet,
    listingsCount: 2,
    nftsCount: 108,
    offersCount: 7,
    swapsCount: 13,
    user: userMockJohnny
  },
  argTypes: {
    image: {
      options: ['Default', 'Image'],
      control: { type: 'radio' }
    }
  }
}

export default metadata

export const Profile: StoryObj<typeof Component> = {}
