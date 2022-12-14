import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './login';
import {signOut } from "firebase/auth";
import {auth} from "./../firebaseConfig";
import { useRouter } from 'next/router';


export default function Home() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Login />;

  const signMeOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Products</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Link href={"/products"}>
          <a className={styles.category}> View all products </a>
        </Link>
        <Link href={"/chucknorris"}>
          <a className={styles.category}> View all Chuck Norris quotes </a>
        </Link>
        <div onClick={signMeOut}>Log out</div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
