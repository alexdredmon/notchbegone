import styles from './styles.module.css'


const Header = props => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img
          alt="Notch Be Gone"
          src="/img/logo.png"
        />
      </div>
      <div className={styles.title}>
        <img
          src="/img/title.png"
          alt="Free notchless background generator"
        />
      </div>
    </header>
  )
}

export default Header
