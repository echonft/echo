// noinspection JSUnusedGlobalSymbols

import { Modal as Component } from '@echo/ui/components/base/modal/modal'
import { action } from '@storybook/addon-actions'
import { type Meta, type StoryObj } from '@storybook/react'
import { useState } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Modal',
  component: Component,
  args: {
    backButton: {
      label: 'Back',
      onBack: action('onBack')
    }
  },
  argTypes: {
    onClose: {
      table: {
        disable: true
      }
    },
    backButton: {
      onBack: {
        table: {
          disable: true
        }
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['open', 'backButton', 'title', 'children']
    }
  }
}

export default metadata

export const Modal: StoryObj<typeof Component> = {
  render: ({ onClose }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className={'h-screen'}>
        <div className={'flex flex-row justify-center items-center h-full'}>
          <button
            className={'btn-gradient group btn-size-alt'}
            onClick={() => {
              setIsOpen(true)
            }}
          >
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

export const CloseDisabled: StoryObj<typeof Component> = {
  render: (_props) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className={'h-screen'}>
        <div className={'flex flex-row justify-center items-center h-full'}>
          <button
            onClick={() => {
              setIsOpen(true)
            }}
            className={'btn-gradient group btn-size-alt'}
          >
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

export const CloseAndBackDisabled: StoryObj<typeof Component> = {
  render: (_props) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className={'h-screen'}>
        <div className={'flex flex-row justify-center items-center h-full'}>
          <button
            onClick={() => {
              setIsOpen(true)
            }}
            className={'btn-gradient group btn-size-alt'}
          >
            <span className={'prose-label-sm-semi btn-label-gradient'}>Open Modal</span>
          </button>
        </div>
        <Component
          title={'This a modal title'}
          open={isOpen}
          backButton={{
            label: 'Back',
            onBack: undefined
          }}
        >
          <span className={'text-white text-center prose-header-xs-semi'}>This is a modal description</span>
        </Component>
      </div>
    )
  }
}
export const BackEnabled: StoryObj<typeof Component> = {
  render: ({ backButton, onClose }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className={'h-screen'}>
        <div className={'flex flex-row justify-center items-center h-full'}>
          <button
            onClick={() => {
              setIsOpen(true)
            }}
            className={'btn-gradient group btn-size-alt'}
          >
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
          backButton={{
            label: backButton?.label,
            onBack: () => {
              backButton?.onBack?.()
              setIsOpen(false)
            }
          }}
        >
          <span className={'text-white text-center prose-header-xs-semi'}>This is a modal description</span>
        </Component>
      </div>
    )
  }
}
