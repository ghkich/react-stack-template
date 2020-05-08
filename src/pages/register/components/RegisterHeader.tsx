import React from 'react'

import styles from './RegisterHeader.module.scss'

const logoCBRDocNoSlogan = require('../../../images/logo-cbrdoc-horizontal-no-slogan.svg')

interface RegisterHeaderProps {
  message: string
}

const RegisterHeader: React.FC<RegisterHeaderProps> = ({ message }) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <img src={logoCBRDocNoSlogan} alt="CBRdoc - Central Brasileira de Documentos" />
      </div>
      <span className={styles.message}>{message}</span>
    </div>
  )
}

export default RegisterHeader
