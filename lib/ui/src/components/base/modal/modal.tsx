'use client'
import { ModalBackButton, type ModalBackButtonProps } from '@echo/ui/components/base/modal/modal-back-button'
import { ModalTitle, type ModalTitleProps } from '@echo/ui/components/base/modal/modal-title'
import type { WithClassNameProps } from '@echo/ui/types/props/with-class-name-props'
import { Description, Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { clsx } from 'clsx'
import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react'

interface Props extends ModalTitleProps, WithClassNameProps {
  open: boolean
  onClose?: VoidFunction
  backButton?: Omit<ModalBackButtonProps, 'show'>
}

export const Modal: FunctionComponent<PropsWithChildren<Props>> = ({
  open,
  title,
  onClose,
  backButton,
  className,
  children
}) => {
  return (
    <Dialog onClose={() => onClose?.()} open={open} className={clsx('relative', 'z-30')}>
      <DialogBackdrop
        transition
        className={clsx(
          'fixed',
          'inset-0',
          'bg-black/40',
          'backdrop-blur',
          'duration-300',
          'ease-out',
          'data-[closed]:opacity-0'
        )}
      />
      <div
        className={clsx(
          'fixed',
          'inset-0',
          'flex',
          'w-screen',
          'items-center',
          'justify-center',
          'bg-transparent',
          'px-6',
          'lg:px-12'
        )}
      >
        <DialogPanel
          transition
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
            'duration-300',
            'ease-out',
            'data-[closed]:scale-95',
            'data-[closed]:opacity-0',
            className
          )}
        >
          <ModalBackButton {...backButton} />
          <ModalTitle title={title} />
          <Description as={Fragment}>{children}</Description>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
