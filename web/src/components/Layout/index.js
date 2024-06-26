import { createTheme, ThemeProvider } from '@mui/material/styles';

import Demo from '../Demo'
import Header from '../Header'
import Preview from '../Preview'
import Upload from '../Upload'

import { If } from '../../util/data'
import styles from './styles.module.css'


const theme = createTheme({
  palette: {
    mode: 'dark',
    palette: {
      primary: {
        light: '#e8d6ca',
      }
    }
  }
})

const Layout = props => {

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.layout}>
        <Header />
        <If condition={! props.state.image}>
          <Demo />
        </If>
        <Upload
          state={props.state}
        />
        <If condition={props.state.image}>
          <Preview
            state={props.state}
          />
        </If>
        <If condition={false && props.state.image}>
          <Demo />
        </If>
      </div>
      <div className={styles.footer}>
        <div className={styles.madeBy}>
          <a href="https://alexandriaredmon.com/" target="_blank" rel="noreferrer">
            Made by Alexandria
          </a>
        </div>
        <div className={styles.viewSource}>
          <a href="https://github.com/alexdredmon/notchbegone" target="_blank"  rel="noreferrer">
            <img src="img/ghmark_dark.png" className={styles.ghmark} alt="GitHub" />
            View source
          </a>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Layout
