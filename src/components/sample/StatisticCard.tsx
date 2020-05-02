import React from 'react'

import styles from './StatisticCard.module.scss'

interface StatisticCardProps {
  title: string
  value: string
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value }) => {
  return (
    <div className={styles.cardContainer}>
      <h2>{value}</h2>
      <span>{title}</span>
    </div>
  )
}

export default StatisticCard
