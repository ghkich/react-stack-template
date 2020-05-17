import React from 'react'

import {styles} from './Text.style'

interface TextProps extends React.HtmlHTMLAttributes<HTMLParagraphElement> {}

const Text: React.FC<TextProps> = ({children, ...props}) => {
  return (
    <p css={styles.textContainer} {...props}>
      {children}
    </p>
  )
}

export default Text
