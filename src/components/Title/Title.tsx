import clsx from 'clsx'
import React from 'react'

import styles from './Title.module.scss'

type HeadingTypes = 'h1' | 'h2' | 'h3'

interface TitleProps extends React.HtmlHTMLAttributes<HTMLHeadingElement> {
  as?: HeadingTypes
  level?: 1 | 2 | 3 | 4
}

const Title: React.FC<TitleProps> = ({ as, level = 1, children, className, ...props }) => {
  const levelClx = `title-level-${level}`
  const titleProps = {
    className: clsx([styles.titleContainer, levelClx, className]),
    ...props,
  }

  switch (as) {
    case 'h3':
      return <h3 {...titleProps}>{children}</h3>
    case 'h2':
      return <h2 {...titleProps}>{children}</h2>
    default:
      return <h1 {...titleProps}>{children}</h1>
  }
}

export default Title
