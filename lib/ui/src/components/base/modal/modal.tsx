'use client'
import { BackButton } from '@echo/ui/components/base/back-button'
import { ModalTitle } from '@echo/ui/components/base/modal/modal-title'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { HideIfNilOrEmpty } from '@echo/ui/components/base/utils/hide-if-nil-or-empty'
import { Dialog, Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  open: boolean
  title?: string
  backButtonLabel?: string
  onBack?: VoidFunction
  onClose?: VoidFunction
}

export const Modal: FunctionComponent<PropsWithChildren<Props>> = ({
  open,
  title,
  onClose,
  backButtonLabel,
  onBack,
  children
}) => {
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
          <div className={clsx('fixed', 'inset-0', 'bg-dark-500/80', 'z-20')} />
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
                'w-full',
                'max-w-md',
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
              <HideIfNil checks={backButtonLabel} render={(label) => <BackButton onBack={onBack} title={label} />} />
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
      </Dialog>
    </Transition>
  )
}
