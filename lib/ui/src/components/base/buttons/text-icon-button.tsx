import { SvgProps } from '../svg/svg'
import { ButtonContainer, ButtonContainerProps } from './button-container'
import { ButtonContainerColor, ButtonContainerColorProps } from './button-container-color'
import { ButtonInner } from './button-inner'
import { ButtonInnerColor } from './button-inner-color'
import { ButtonLabel } from './button-label'
import { TextIconButtonIconContainer, TextIconButtonIconContainerProps } from './text-icon-button-icon-container'
import { TextIconButtonInner } from './text-icon-button-inner'
import { ReactElement } from 'react'

export interface TextIconButtonProps<T extends SvgProps>
  extends ButtonContainerProps,
    ButtonContainerColorProps,
    Omit<TextIconButtonIconContainerProps<T>, 'children'> {
  label: string
  icon: ReactElement<T>
}

export const TextIconButton = <T extends SvgProps>({
  size,
  colorScheme,
  label,
  getIconSize,
  icon,
  fixedWidth,
  disabled,
  onClick
}: TextIconButtonProps<T>) =>
  (
    <ButtonContainer size={size} disabled={disabled} fixedWidth={fixedWidth} onClick={onClick}>
      <ButtonContainerColor colorScheme={colorScheme}>
        <ButtonInner size={size}>
          <ButtonInnerColor variant={colorScheme}>
            <TextIconButtonInner size={size}>
              <TextIconButtonIconContainer size={size} getIconSize={getIconSize}>
                {icon}
              </TextIconButtonIconContainer>
              <ButtonLabel size={size}>{label}</ButtonLabel>
            </TextIconButtonInner>
          </ButtonInnerColor>
        </ButtonInner>
      </ButtonContainerColor>
    </ButtonContainer>
  ) as ReactElement<TextIconButtonProps<T>>
