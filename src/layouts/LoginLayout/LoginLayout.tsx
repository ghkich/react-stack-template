import { motion } from 'framer-motion'
import React from 'react'

import { ReactComponent as LogoCBRDocLettering } from '../../images/logo-cbrdoc-lettering.svg'
import { enteringFromLeft, enteringFromRight } from '../../utils/animation-utils'
import styles from './LoginLayout.module.scss'

const logoCBRDoc = require('../../images/logo-cbrdoc-horizontal.svg')
const logoCBRDocNoSlogan = require('../../images/logo-cbrdoc-horizontal-no-slogan.svg')

interface Props {
  title?: string
  backgroundMessage?: React.ReactNode
}

const LoginLayout: React.FC<Props> = ({ title, backgroundMessage, children }) => {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.logoContainer}>
          <img src={logoCBRDoc} alt="CBRdoc - Central Brasileira de Documentos" />
        </div>
        <div className={styles.smallLogoContainer}>
          <img src={logoCBRDocNoSlogan} alt="CBRdoc - Central Brasileira de Documentos" />
        </div>
        <div className={styles.formContainer}>
          <motion.div initial="exit" animate="enter" exit="exit" variants={enteringFromLeft}>
            {title && <h1 className={styles.formTitle}>{title}</h1>}
            {children}
          </motion.div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <LogoCBRDocLettering color="#aeb5c9" />
        <motion.div initial="exit" animate="enter" exit="exit" variants={enteringFromRight}>
          <div className={styles.backgroundMessage}>{backgroundMessage}</div>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginLayout
