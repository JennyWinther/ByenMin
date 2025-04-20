export type CsrfContextType = {
    csrfToken: string | null;
    updateCsrfToken: (token: string) => void;
  };