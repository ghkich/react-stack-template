import React from 'react'

import StatisticCard from '../../../components/StatisticCard/StatisticCard'
import styles from './OrdersStatistics.module.scss'

interface OrdersStatisticsProps {}

const OrdersStatistics: React.FC<OrdersStatisticsProps> = () => {
  return (
    <div>
      <h1 className={styles.statisticsTitle}>Meus pedidos</h1>
      <div className={styles.statisticsItemsContainer}>
        <div className={styles.statisticItem}>
          <StatisticCard title="Pedidos FEV/20" value="2" />
        </div>
        <div className={styles.statisticItem}>
          <StatisticCard title="Pedidos FEV/20" value="2" />
        </div>
        <div className={styles.statisticItem}>
          <StatisticCard title="Pedidos FEV/20" value="2" />
        </div>
        <div className={styles.statisticItem}>
          <StatisticCard title="Pedidos FEV/20" value="2" />
        </div>
        <div className={styles.statisticItem}>
          <StatisticCard title="Pedidos FEV/20" value="2" />
        </div>
      </div>
    </div>
  )
}

export default OrdersStatistics
