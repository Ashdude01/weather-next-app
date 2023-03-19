import '@/styles/globals.css'
import Header from '@/component/header';
import Footer from '@/component/footer';
export default function App({ Component, pageProps }) {
  return<>
  <Header/>
  <Component {...pageProps} />
  <Footer/>
  </>}
