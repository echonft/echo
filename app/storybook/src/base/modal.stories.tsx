// noinspection JSUnusedGlobalSymbols

import { Modal as Component } from '@echo/ui/components/base/modal/modal'
import { type Meta, type StoryObj } from '@storybook/react'
import { useState } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Modal',
  component: Component,
  argTypes: {
    onClose: {
      table: {
        disable: true
      }
    },
    onBack: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['open']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Modal: Story = {
  render: ({ onClose }) => {
    // TODO We could add a modal manager to avoid this code here
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className={'h-screen'}>
        <div className={'flex flex-row justify-center items-center h-full'}>
          <button className={'btn-gradient group w-[9.875rem] py-1.5 btn-size'} onClick={() => setIsOpen(true)}>
            <span className={'prose-label-sm-semi btn-label-gradient'}>Open Modal</span>
          </button>
        </div>
        <Component
          title={'This a modal title'}
          open={isOpen}
          onClose={() => {
            onClose?.()
            setIsOpen(false)
          }}
        >
          <span className={'text-white text-center prose-header-xs-semi'}>This is a modal description</span>
        </Component>
      </div>
    )
  }
}

export const CloseDisabled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className={'h-screen'}>
        <div className={'flex flex-row justify-center items-center h-full'}>
          <button onClick={() => setIsOpen(true)} className={'btn-gradient group w-[9.875rem] py-1.5 btn-size'}>
            <span className={'prose-label-sm-semi btn-label-gradient'}>Open Modal</span>
          </button>
        </div>
        <Component title={'This a modal title'} open={isOpen}>
          <span className={'text-white text-center prose-header-xs-semi'}>This is a modal description</span>
        </Component>
      </div>
    )
  }
}

export const CloseAndBackDisabled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className={'h-screen'}>
        <div className={'flex flex-row justify-center items-center h-full'}>
          <button onClick={() => setIsOpen(true)} className={'btn-gradient group w-[9.875rem] py-1.5 btn-size'}>
            <span className={'prose-label-sm-semi btn-label-gradient'}>Open Modal</span>
          </button>
        </div>
        <Component title={'This a modal title'} open={isOpen} backButtonLabel={'Back'}>
          <span className={'text-white text-center prose-header-xs-semi'}>This is a modal description</span>
        </Component>
      </div>
    )
  }
}

export const BackEnabled: Story = {
  render: ({ onClose, onBack }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className={'h-screen'}>
        <div className={'flex flex-row justify-center items-center h-full'}>
          <button onClick={() => setIsOpen(true)} className={'btn-gradient group w-[9.875rem] py-1.5 btn-size'}>
            <span className={'prose-label-sm-semi btn-label-gradient'}>Open Modal</span>
          </button>
        </div>
        <Component
          title={'This a modal title'}
          open={isOpen}
          onClose={() => {
            onClose?.()
            setIsOpen(false)
          }}
          onBack={() => {
            onBack?.()
            setIsOpen(false)
          }}
        >
          <span className={'text-white text-center prose-header-xs-semi'}>This is a modal description</span>
        </Component>
      </div>
    )
  }
}

export const BackEnabledWithTitle: Story = {
  args: {
    backButtonLabel: 'Back'
  },
  render: ({ backButtonLabel, onBack, onClose }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className={'h-screen'}>
        <div className={'flex flex-row justify-center items-center h-full'}>
          <button onClick={() => setIsOpen(true)} className={'btn-gradient group w-[9.875rem] py-1.5 btn-size'}>
            <span className={'prose-label-sm-semi btn-label-gradient'}>Open Modal</span>
          </button>
        </div>
        <Component
          title={'This a modal title'}
          open={isOpen}
          onClose={() => {
            onClose?.()
            setIsOpen(false)
          }}
          onBack={() => {
            onBack?.()
            setIsOpen(false)
          }}
          backButtonLabel={backButtonLabel}
        >
          <span className={'text-white text-center prose-header-xs-semi'}>This is a modal description</span>
        </Component>
      </div>
    )
  }
}
