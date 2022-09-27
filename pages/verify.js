import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/footer'
import Navigation from '../components/navigation'
import styles from '../styles/Home.module.css'
import VerifyPeople from '../components/verifyPeople'

export default function Home() {
  return (
    <div className={styles.container}>
      <Navigation />
      <VerifyPeople />
      <Footer />     
    </div>
  )
}
