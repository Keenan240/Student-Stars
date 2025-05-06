import '../styles/globals.css'; // ✅ this connects your CSS
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
