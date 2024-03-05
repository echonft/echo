'use client'
import { ModalBackButton, type ModalBackButtonProps } from '@echo/ui/components/base/modal/modal-back-button'
import { ModalTitle, type ModalTitleProps } from '@echo/ui/components/base/modal/modal-title'
import { Dialog, Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react'

interface Props extends ModalTitleProps {
  open: boolean
  onClose?: VoidFunction
  backButton?: Omit<ModalBackButtonProps, 'show'>
}

export const Modal: FunctionComponent<PropsWithChildren<Props>> = ({ open, title, onClose, backButton, children }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as={'div'} className={clsx('relative')} onClose={() => onClose?.()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={clsx('fixed', 'inset-0', 'bg-black/40', 'backdrop-blur', 'z-20')} />
        </Transition.Child>
        <div
          className={clsx(
            'fixed',
            'inset-0',
            'overflow-hidden',
            'flex',
            'items-center',
            'justify-center',
            'bg-transparent',
            'px-6',
            'lg:px-12',
            'z-30'
          )}
        >
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
                'w-max',
                'h-max',
                'transform',
                'overflow-hidden',
                'border-2',
                'border-white/10',
                'rounded-2xl',
                'bg-dark-500',
                'py-[1.88rem]',
                'px-5',
                'align-middle',
                'shadow-modal',
                'transition-all',
                'z-30'
              )}
            >
              <ModalBackButton {...backButton} />
              <ModalTitle title={title} />
              <Dialog.Description as={Fragment}>{children}</Dialog.Description>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
