import { createContext, useContext, useState } from 'react';
import { CsrfContextType } from './CsrfType';

type Props = {
  children: React.ReactNode;
};

/////////////////////

// Context for CSRF token, slik at den er tilgjengelig hos alle komponenter som bruker den. 

const CsrfContext = createContext<CsrfContextType>(
  {
    csrfToken: null,
    updateCsrfToken: () => {}
  }
);

export function useCsrfContext(){
  return useContext(CsrfContext);
}


export function CsrfProvider({ children }: Props) {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  function updateCsrfToken(token : string){
    setCsrfToken(token);
  }

  const defaultValue = {
    csrfToken,
    updateCsrfToken
  }

  return (
    <CsrfContext.Provider value={defaultValue}>
      {children}
    </CsrfContext.Provider>
  );
};
