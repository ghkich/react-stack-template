import React from 'react'

import {TitleContainer} from './Title.style'

export type HeadingTypes = 'h1' | 'h2' | 'h3'

interface TitleProps extends React.HtmlHTMLAttributes<HTMLHeadingElement> {
  as?: HeadingTypes
  level?: 1 | 2 | 3 | 4
  uppercase?: boolean
}

const Title: React.FC<TitleProps> = ({as = 'h1', level = 1, uppercase, children, ...props}) => {
  return (
    <TitleContainer as={as} level={level} uppercase={uppercase} {...props}>
      {children}
    </TitleContainer>
  )
}

export default Title
