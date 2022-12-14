import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/footer'
import Navigation from '../components/navigation'
import AddPeople from '../components/addPeople'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Navigation />
      <AddPeople />
      <Footer />     
    </div>
  )
}
