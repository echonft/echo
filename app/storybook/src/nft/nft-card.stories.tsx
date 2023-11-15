import { getNftMock } from '@echo/model-mocks/nft/get-nft-mock'
import { NftCard as Component } from '@echo/ui/components/nft/card/nft-card'
import { NFT_CARD_VARIANT_REDUCED } from '@echo/ui/constants/nft-card-variants'
import { type Meta, type StoryObj } from '@storybook/react'
import { type FunctionComponent } from 'react'

type ComponentType = FunctionComponent<Record<'reduced', boolean>>
const DEFAULT_REDUCED = false

const metadata: Meta<ComponentType> = {
  title: 'NFT/Card',
  argTypes: {
    reduced: {
      defaultValue: DEFAULT_REDUCED,
      control: 'boolean'
    }
  }
}

export default metadata

type Story = StoryObj<ComponentType>

const nft = getNftMock()
export const Card: Story = {
  render: ({ reduced }) => {
    return <Component nft={nft} variant={reduced ? NFT_CARD_VARIANT_REDUCED : undefined} />
  },
  args: {
    reduced: DEFAULT_REDUCED
  }
}
