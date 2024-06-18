import "@/styles/globals.css";
import '../styles/DummyProto.css';
import '../styles/Sidebar.css';
import '../styles/ready.css';
import '../styles/TranscribeAudio.css';
import '../styles/ComprehendFindings.css';
import '../styles/workflowLoader.css'


import type { AppProps } from "next/app";


export default function App({ Component, pageProps }: AppProps) {
  
  return <Component {...pageProps} />;
}
