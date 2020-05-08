import clsx from 'clsx'
import { motion } from 'framer-motion'
import React from 'react'

import { ReactComponent as LogoCBRDocLettering } from '../../images/logo-cbrdoc-lettering.svg'
import { enteringFromLeft, enteringFromRight } from '../../utils/animation-utils'
import styles from './LoginLayout.module.scss'

const logoCBRDoc = require('../../images/logo-cbrdoc-horizontal.svg')
interface Props {
  customHeader?: React.ReactNode
  backgroundMessage?: React.ReactNode
}

const LoginLayout: React.FC<Props> = ({ customHeader, backgroundMessage, children }) => {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.leftContainer}>
        {customHeader ? (
          customHeader
        ) : (
          <div className={styles.logoContainer}>
            <img src={logoCBRDoc} alt="CBRdoc - Central Brasileira de Documentos" />
          </div>
        )}

        <div className={styles.leftBodyContainer}>
          <div className={clsx([styles.formContainer, customHeader && 'layout-has-custom-header'])}>
            <motion.div initial="exit" animate="enter" exit="exit" variants={enteringFromLeft}>
              {children}
            </motion.div>
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <LogoCBRDocLettering color="#aeb5c9" />
        {backgroundMessage && (
          <motion.div initial="exit" animate="enter" exit="exit" variants={enteringFromRight}>
            <div className={styles.backgroundMessage}>{backgroundMessage}</div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default LoginLayout
