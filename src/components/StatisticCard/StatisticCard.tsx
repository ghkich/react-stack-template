import React from 'react'

import styles from './StatisticCard.module.scss'

interface StatisticCardProps {
  title: string
  value: string
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value }) => {
  return (
    <div className={styles.cardContainer}>
      <h2 className={styles.cardValue}>{value}</h2>
      <span className={styles.cardTitle}>{title}</span>
    </div>
  )
}

export default StatisticCard
