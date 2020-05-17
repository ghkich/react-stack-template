import React from 'react'

import {styles} from './PageLayout.style'

interface PageLayoutProps {
  title: string
  insideHeader?: React.ReactNode
}

const PageLayout: React.FC<PageLayoutProps> = ({title, insideHeader, children}) => {
  return (
    <div css={styles.layoutContainer}>
      <div css={styles.pageHeader}>
        <h1 css={styles.pageTitle}>{title}</h1>
        {insideHeader && insideHeader}
      </div>
      <div css={styles.pageBody}>{children}</div>
    </div>
  )
}

export default PageLayout
