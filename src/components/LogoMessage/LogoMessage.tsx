import React from 'react'

import styles from './LogoMessage.module.scss'

const logoCBRDocNoSlogan = require('../../images/logo-cbrdoc-horizontal-no-slogan.svg')

interface LogoMessageProps {
  message: string
}

const LogoMessage: React.FC<LogoMessageProps> = ({ message }) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <a href="/">
          <img src={logoCBRDocNoSlogan} alt="CBRdoc - Central Brasileira de Documentos" />
        </a>
      </div>
      <span className={styles.message}>{message}</span>
    </div>
  )
}

export default LogoMessage
