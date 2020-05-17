import styled from '@emotion/styled'

const fontSizes = [32, 26, 20, 16]

type TitleContainerProps = {
  as: 'h1' | 'h2' | 'h3'
  level: 1 | 2 | 3 | 4
  uppercase?: boolean
}

export const TitleContainer = styled.h1(({level, uppercase}: TitleContainerProps) => ({
  fontWeight: 200,
  fontSize: fontSizes[level - 1],
  textTransform: uppercase ? 'uppercase' : 'none',
}))

export const styles = {
  TitleContainer,
}
