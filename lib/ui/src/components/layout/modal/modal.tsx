'use client'
import { SideCaretSvg } from '@echo/ui/components/base/svg/side-caret-svg'
import { HideIfNilOrEmpty } from '@echo/ui/components/base/utils/hide-if-nil-or-empty'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { ModalTitle } from '@echo/ui/components/layout/modal/modal-title'
import { DIRECTION_LEFT } from '@echo/ui/constants/direction'
import { Dialog, Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { Fragment, type FunctionComponent, type PropsWithChildren, useCallback } from 'react'

interface Props {
  open: boolean
  title?: string
  onClose?: VoidFunction
  closeDisabled?: boolean
  backDisabled?: boolean
  backButtonLabel?: string
  onBack?: VoidFunction
}

export const Modal: FunctionComponent<PropsWithChildren<Props>> = ({
  open,
  title,
  onClose,
  closeDisabled = false,
  backDisabled = true,
  backButtonLabel,
  onBack,
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
                  'min-h-[42rem]',
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
                  'transition-all'
                )}
              >
                <ShowIf condition={!backDisabled}>
                  <button
                    className={clsx('btn', 'group', 'gap-4', '!justify-start', 'pb-[3.12rem]')}
                    onClick={() => onBack?.()}
                  >
                    <span className={clsx('btn-label-secondary')}>
                      <SideCaretSvg direction={DIRECTION_LEFT} width={12} height={20} />
                    </span>
                    <HideIfNilOrEmpty
                      checks={backButtonLabel}
                      render={(label) => (
                        <span className={clsx('btn-label-secondary', 'prose-paragraph-sm', '!text-[0.9375rem]')}>
                          {label}
                        </span>
                      )}
                    />
                  </button>
                </ShowIf>
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
