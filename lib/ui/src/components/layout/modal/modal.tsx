'use client'
import { HideIfNilOrEmpty } from '@echo/ui/components/base/utils/hide-if-nil-or-empty'
import { ModalTitle } from '@echo/ui/components/layout/modal/modal-title'
import { Dialog, Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { Fragment, type FunctionComponent, PropsWithChildren, useCallback } from 'react'

interface Props {
  open: boolean
  title?: string
  onClose?: () => unknown
  closeDisabled?: boolean
}

export const Modal: FunctionComponent<PropsWithChildren<Props>> = ({
  open,
  title,
  onClose,
  closeDisabled = false,
  children
}) => {
  const close = useCallback(() => {
    if (!closeDisabled) {
      onClose?.()
    }
  }, [onClose, closeDisabled])

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as={'div'} className={clsx('relative', 'z-40')} onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={clsx('fixed', 'inset-0', 'bg-dark-500/80')} />
        </Transition.Child>
        <div className={clsx('fixed', 'inset-0', 'overflow-y-auto')}>
          <div className={clsx('flex', 'min-h-full', 'items-center', 'justify-center')}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-8- scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  'flex',
                  'flex-col',
                  'gap-6',
                  'w-full',
                  'max-w-md',
                  'transform',
                  'overflow-hidden',
                  'rounded-2xl',
                  'bg-dark-500',
                  'pt-4',
                  'pb-8',
                  'px-6',
                  'align-middle',
                  'shadow-modal',
                  'transition-all'
                )}
              >
                <HideIfNilOrEmpty
                  checks={title}
                  render={(title) => (
                    <Dialog.Title as={Fragment}>
                      <ModalTitle>{title}</ModalTitle>
                    </Dialog.Title>
                  )}
                />
                <Dialog.Description as={Fragment}>{children}</Dialog.Description>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
