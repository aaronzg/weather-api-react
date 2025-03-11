import styles from './Spiner.module.css'

export default function Spiner() {
    return (
        <div className={styles.spinner}>
            <div className={styles.dot1}></div>
            <div className={styles.dot2}></div>
        </div>
    );
}
