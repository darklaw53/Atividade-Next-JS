import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { LivrosProvider } from '../context/LivrosContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter(); 

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LivrosProvider>
        <Component {...pageProps} />
      </LivrosProvider>
    </>
  );
}

export default MyApp;