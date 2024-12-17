import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';
Amplify.configure(amplifyconfig);
Amplify.configure({
  ...Amplify.getConfig(),
  Interactions: {
    LexV2: {
      'MedicalChatbot': {
        aliasId: 'TSTALIASID',
        botId: '3YH2SD73OM',
        localeId: 'en_US',
        region: 'us-east-1'
      }
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
