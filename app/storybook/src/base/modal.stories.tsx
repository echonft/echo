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
    }
  },
  parameters: {
    controls: {
      exclude: ['open', 'title', 'children']
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
            className={'btn-gradient group'}
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
            className={'btn-gradient group'}
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
