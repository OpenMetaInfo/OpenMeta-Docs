import { useRouter } from 'next/router';
import Features from './Features';
import Hero from './Hero';
import styles from './Home.module.css';
import Trail from './Trail';

export default function Home() {
  const { route } = useRouter()
  const locale = route.includes('/en-US') ? '/en-US' : '/zh-CN'

  return (
    <>
      {Hero(locale)}
      <hr className={styles.segmentLine}/>
      {Features(locale)}
      <hr className={styles.segmentLine}/>
      {Trail(locale)}
    </>
  )
}
