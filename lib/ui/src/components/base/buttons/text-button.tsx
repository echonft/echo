import { ButtonContainer, ButtonContainerProps } from './button-container'
import { ButtonContainerColor, ButtonContainerColorProps } from './button-container-color'
import { ButtonInner } from './button-inner'
import { ButtonInnerColor } from './button-inner-color'
import { ButtonLabel } from './button-label'
import { FunctionComponent } from 'react'

export interface TextButtonProps extends ButtonContainerProps, ButtonContainerColorProps {
  label: string
}

export const TextButton: FunctionComponent<TextButtonProps> = ({
  size,
  variant,
  label,
  fixedWidth,
  disabled,
  onClick
}) => {
  return (
    <ButtonContainer size={size} disabled={disabled} fixedWidth={fixedWidth} onClick={onClick}>
      <ButtonContainerColor variant={variant}>
        <ButtonInner size={size}>
          <ButtonInnerColor variant={variant}>
            <ButtonLabel size={size}>{label}</ButtonLabel>
          </ButtonInnerColor>
        </ButtonInner>
      </ButtonContainerColor>
    </ButtonContainer>
  )
}
