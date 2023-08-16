import { Global, css } from '@emotion/react'

const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      #root,
      body {
        width: 100%;
        height: 100vh;
      }
    `}
  />
)

export default GlobalStyles
