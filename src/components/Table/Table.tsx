import clsx from 'clsx'
import React, { HTMLAttributes, useState } from 'react'

import Tag from '../Tag/Tag'
import styles from './Table.module.scss'

const Row: React.FC<HTMLAttributes<HTMLTableRowElement>> = ({ className, children }) => {
  const [hover, setHover] = useState(false)
  return (
    <tr
      className={clsx([className, hover && 'table-row-active'])}
      onMouseEnter={(e) => setHover(true)}
      onMouseLeave={(e) => setHover(false)}
    >
      {children}
    </tr>
  )
}

interface TableProps {}

const Table: React.FC<TableProps> = ({}) => {
  const [rowActive, setRowActive] = useState()

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>Nome do pedido</th>
            <th style={{ width: 120 }}>Nº do Pedido</th>
            <th style={{ width: 130 }}>Data do Pedido</th>
            <th style={{ width: 150 }}>Tipo de solicitação</th>
            <th>Documento</th>
            <th style={{ width: 140 }}>Status</th>
            <th style={{ width: 0 }}></th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {Array.from(Array(5).keys()).map((row: any, i: number) => (
            <tr key={i} className={clsx([styles.bodyRow])}>
              <td style={{ height: 80, fontWeight: 'bold' }}>
                Sabino Almeida Sanches Barbosa da Silva Andrade Albuquerque
              </td>
              <td>00192</td>
              <td>20/03/2020</td>
              <td>Pesquisa</td>
              <td style={{ fontSize: 12 }}>
                ITR - Certidão de Débitos Relativos a Tributos Federais e a Dívida Ativa da União de Imóvel Rural
              </td>
              <td>
                <Tag color="success" style={{ width: 130 }}>
                  Em andamento
                </Tag>
              </td>
              <td style={{ width: 0, padding: 0 }}>
                <div className="teste" style={{ width: 0 }}>
                  <div>
                    <button>Visualizar</button>
                    <button>Compartilhar</button>
                    <button>Baixar</button>
                    <button>Rastrear</button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
