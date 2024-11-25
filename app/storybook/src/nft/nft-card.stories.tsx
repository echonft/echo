// noinspection JSUnusedGlobalSymbols

import { nftMockSpiral1 } from '@echo/model/mocks/nft-mock'
import { NftCard as Component } from '@echo/ui/components/nft/card/nft-card'
import { Color } from '@echo/ui/constants/color'
import { type Meta, type StoryObj } from '@storybook/react'
import { type FunctionComponent } from 'react'

interface Args {
  readonly border: 'default' | Color.Yellow
  readonly hideOwner: boolean
}

type ComponentType = FunctionComponent<Args>

const metadata: Meta<ComponentType> = {
  title: 'NFT/Card',
  args: {
    border: 'default',
    hideOwner: false
  },
  argTypes: {
    border: {
      control: { type: 'select' },
      options: ['default', Color.Yellow]
    },
    hideOwner: {
      description: 'Hide the owner Discord tag',
      control: 'boolean'
    }
  }
}

export default metadata

export const Default: StoryObj<ComponentType> = {
  render: ({ border, hideOwner }) => {
    const options =
      border === 'default'
        ? {
            owner: {
              hide: hideOwner
            }
          }
        : {
            borderColor: Color.Yellow as const,
            owner: {
              hide: hideOwner
            }
          }

    return <Component nft={nftMockSpiral1} options={options} />
  }
}
