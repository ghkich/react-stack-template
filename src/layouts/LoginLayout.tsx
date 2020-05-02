import React from 'react'

import { ReactComponent as LogoCBRDocLettering } from '../images/logo-cbrdoc-lettering.svg'
import styles from './LoginLayout.module.scss'

const logoCBRDocVertical = require('../images/logo-cbrdoc-horizontal.svg')

interface Props {
  title: string
  backgroundMessage?: React.ReactNode
}

const LoginLayout: React.FC<Props> = ({ title, backgroundMessage, children }) => {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.leftContainer}>
        <div>
          <img src={logoCBRDocVertical} alt="CBRdoc - Central Brasileira de Documentos" />
        </div>
        <div className={styles.formContainer}>
          <h1 className={styles.formTitle}>{title}</h1>
          {children}
        </div>
      </div>
      <div className={styles.rightContainer}>
        <LogoCBRDocLettering color="#aeb5c9" />
        <div className={styles.backgroundMessage}>{backgroundMessage}</div>
      </div>
    </div>
  )
}

export default LoginLayout
