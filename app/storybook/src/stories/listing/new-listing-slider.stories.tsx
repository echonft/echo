import { getListingById } from '../../mocks/model/listing'
import { getAllCollections } from '../../mocks/model/nft-collection'
import { newListingDataState, NewListingSliderManager as Component } from '@echo/ui'
import { NewListing, NftCollection } from '@echo/ui-model'
import { Meta, StoryObj } from '@storybook/react'
import { FunctionComponent, useEffect } from 'react'
import { RecoilRoot, useRecoilState } from 'recoil'

const metadata: Meta<typeof Component> = {
  title: 'Listing/New Listing Bottom Slider',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

const RenderedComponent: FunctionComponent<{
  data?: NewListing
  options?: NftCollection[]
}> = ({ data, options }) => {
  const [, setNewListing] = useRecoilState(newListingDataState)
  useEffect(() => {
    setNewListing({ items: data?.items ?? [], targets: data?.targets ?? [] })
  }, [])
  return <Component collections={options} />
}
export const Empty: Story = {
  render: () => (
    <RecoilRoot>
      <RenderedComponent options={getAllCollections()} />
    </RecoilRoot>
  )
}

export const LoadingCollections: Story = {
  render: () => (
    <RecoilRoot>
      <RenderedComponent options={undefined} />
    </RecoilRoot>
  )
}

export const WithTarget: Story = {
  render: () => (
    <RecoilRoot>
      <RenderedComponent
        options={getAllCollections()}
        data={{ targets: getListingById('jUzMtPGKM62mMhEcmbN4').targets, items: [] }}
      />
    </RecoilRoot>
  )
}

export const WithItem: Story = {
  render: () => (
    <RecoilRoot>
      <RenderedComponent
        options={getAllCollections()}
        data={{ targets: [], items: getListingById('jUzMtPGKM62mMhEcmbN4').items }}
      />
    </RecoilRoot>
  )
}

export const Complete: Story = {
  render: () => (
    <RecoilRoot>
      <RenderedComponent
        options={getAllCollections()}
        data={{
          targets: getListingById('jUzMtPGKM62mMhEcmbN4').targets,
          items: getListingById('jUzMtPGKM62mMhEcmbN4').items
        }}
      />
    </RecoilRoot>
  )
}
