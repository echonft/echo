import { Modal as Component } from '@echo/ui/components/layout/modal/modal'
import { type Meta, type StoryObj } from '@storybook/react'
import { useState } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Modal',
  component: Component,
  argTypes: {
    onClose: {
      control: false,
      action: 'close'
    }
  },
  parameters: {
    controls: {
      exclude: ['open', 'onClose', 'closeDisabled']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Modal: Story = {
  render: () => {
    // TODO We could add a modal manager to avoid this code here
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className={'bg-white'} style={{ height: '100vh' }}>
        <div className={'flex flex-row justify-center items-center h-full'}>
          <button onClick={() => setIsOpen(true)} className={'btn-gradient group w-[9.875rem] py-1.5'}>
            <span className={'prose-label-sm-semi btn-label-gradient'}>Open Modal</span>
          </button>
        </div>
        <Component title={'This a modal title'} open={isOpen} onClose={() => setIsOpen(false)}>
          <span className={'text-white'}>This is a modal description</span>
        </Component>
      </div>
    )
  }
}

export const CloseDisabled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className={'bg-white'} style={{ height: '100vh' }}>
        <div className={'flex flex-row justify-center items-center h-full'}>
          <button onClick={() => setIsOpen(true)} className={'btn-gradient group w-[9.875rem] py-1.5'}>
            <span className={'prose-label-sm-semi btn-label-gradient'}>Open Modal</span>
          </button>
        </div>
        <Component title={'This a modal title'} open={isOpen} onClose={() => setIsOpen(false)} closeDisabled={true}>
          <span className={'text-white'}>This is a modal description</span>
        </Component>
      </div>
    )
  }
}
