import { Modal as Component } from '@echo/ui/components/layout/modal/modal'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Modal',
  component: Component,
  parameters: {
    controls: {
      exclude: ['open', 'onClose', 'renderTitle', 'renderDescription']
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
          <button onClick={() => setIsOpen(true)} className={'btn-gradient group rounded-lg w-[9.875rem] py-1.5'}>
            <span className={'prose-label-sm-semi btn-label-gradient'}>Open Modal</span>
          </button>
        </div>
        <Component
          renderTitle={() => <h1 className={'text-white'}>This a modal title</h1>}
          renderDescription={() => <span className={'text-white'}>This is a modal description</span>}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    )
  }
}
