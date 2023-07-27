import { FetchNftsForOwner as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Dev/Fetch NFTs For Owner',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const FetchNFTsForOwner: Story = {
  args: {
    owner: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E',
    contractAddresses: ['0x12c63bbD266dB84e117356e664f3604055166CEc', '0x320e2fa93a4010ba47edcde762802374bac8d3f7']
  }
}
