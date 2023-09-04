import { getCollectionById } from '../../mocks/model/nft-collection'
import { newListingDataState, NewListingSliderManager as Component } from '@echo/ui'
import { NewListing } from '@echo/ui-model'
import { Meta, StoryObj } from '@storybook/react'
import { FunctionComponent, useEffect } from 'react'
import { RecoilRoot, useRecoilState } from 'recoil'

const metadata: Meta<typeof Component> = {
  title: 'Listing/New Listing Bottom Slider',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>
const collection = getCollectionById('Rc8pLQXxgyQGIRL0fr13')

const RenderedComponent: FunctionComponent<{
  data?: NewListing
}> = ({ data }) => {
  const [, setNewListing] = useRecoilState(newListingDataState)
  useEffect(() => {
    setNewListing({ items: data?.items ?? [], targets: data?.targets ?? [{ collection, amount: 1 }] })
  }, [])
  return <Component />
}
export const Empty: Story = {
  render: () => (
    <RecoilRoot>
      <RenderedComponent />
    </RecoilRoot>
  )
}
