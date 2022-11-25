import { Dialog, Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import React, { Fragment, PropsWithChildren, ReactElement, useState } from 'react'

interface Props {
  open?: boolean
  title?: string
  description?: string
  cancelTitle?: string
  acceptTitle?: string
  onAccept?: VoidFunction
  onCancel?: VoidFunction
  renderAccept?: () => ReactElement
}

export const Modal: React.FunctionComponent<PropsWithChildren<Props>> = ({
  open = true,
  title,
  description,
  cancelTitle,
  acceptTitle,
  onAccept,
  onCancel,
  renderAccept,
  children
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(open)
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" open={isOpen} onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={clsx('fixed', 'inset-0', 'bg-black', 'bg-opacity-25')} />
        </Transition.Child>
        <div className={clsx('fixed', 'inset-0', 'overflow-y-auto')}>
          <div className={clsx('flex', 'min-h-full', 'items-center', 'justify-center', 'p-4', 'text-center')}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  'w-full',
                  'max-w-md',
                  'transform',
                  'overflow-hidden',
                  'rounded-2xl',
                  'bg-white',
                  'p-6',
                  'text-left',
                  'align-middle',
                  'shadow-xl',
                  'transition-all'
                )}
              >
                {title && <Dialog.Title>{title}</Dialog.Title>}
                {description && <Dialog.Description>{description}</Dialog.Description>}
                {children && children}
                {(acceptTitle || cancelTitle) && (
                  <div className={clsx('flex', 'flex-row', 'gap-2', 'justify-between')}>
                    {cancelTitle && (
                      <button
                        onClick={() => {
                          onCancel?.()
                          setIsOpen(false)
                        }}
                      >
                        {cancelTitle}
                      </button>
                    )}
                    {acceptTitle && (
                      <button
                        onClick={() => {
                          onAccept?.()
                        }}
                      >
                        {acceptTitle}
                      </button>
                    )}
                    {renderAccept && renderAccept()}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
