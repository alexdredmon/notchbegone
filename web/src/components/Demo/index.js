import styles from './styles.module.css'


const Demo = props => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.demo}>
        <div className={styles.beforeAndAfter}>
          <div>
            <img src="/img/demo-before.png" alt="Before" />
          </div>
          <div>
            <img src="/img/demo-arrow.png" alt="Then" />
          </div>
          <div>
            <img src="/img/demo-after.png" alt="After" />
          </div>
        </div>
        <div className={styles.description}>
          <p>
            Dress up your <strong>notch</strong> with a smart looking dark title bar
          </p>
          <p>
            Custom tailored to your image
            <span>no installation required</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Demo
