import clsx from 'clsx'
import React, { forwardRef, useState } from 'react'

import { ReactComponent as IconSearch } from '../../images/icon-search.svg'
import Icon from '../Icon/Icon'
import Input, { InputProps } from '../Input/Input'
import styles from './Search.module.scss'

export interface SearchProps extends InputProps {
  onSearch?: (
    value: string,
    event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => void
  enterButton?: React.ReactNode
  loading?: boolean
}

const Search: React.FC<SearchProps> = forwardRef<any, SearchProps>(
  ({ loading, onSearch, className, style, size, ...props }, ref) => {
    const [searchValue, setSearchValue] = useState('')

    const sizeClx = size && `search-size-${size}`

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setSearchValue(e.target.value)
    }

    return (
      <span className={clsx([styles.searchContainer, className])} style={style}>
        <Input
          ref={ref}
          size={size}
          onPressEnter={(e) => onSearch && onSearch(searchValue, e)}
          onChange={handleChange}
          style={{ paddingRight: size === 'small' ? 40 : 50 }}
          {...props}
        />
        <span className={clsx([styles.iconContainer, sizeClx])}>
          {loading ? <Icon type="loading" /> : <IconSearch />}
        </span>
      </span>
    )
  },
)

export default Search
