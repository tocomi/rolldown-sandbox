import type { FC, PropsWithChildren } from 'react'

type Props = {
  onClick: () => void
}

export const Button: FC<PropsWithChildren<Props>> = ({ onClick, children }) => {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  )
}
