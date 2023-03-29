import '@/styles/globals.css'
import Header from '@/component/header';
import Footer from '@/component/footer';
import LoadingBar from 'react-top-loading-bar';
import {useState } from 'react';
import Router from 'next/router';


export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  Router.events.on('routeChangeStart', (url)=>{
    setProgress(30);
  })
  Router.events.on('routeChangeComplete',(url)=>{
    setProgress(100);
  })

  return<>
<LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
        onLoaderFinished={() => setProgress(0)}
      />
  <Header/>
  <Component {...pageProps} />
  <Footer/>
  </>}
