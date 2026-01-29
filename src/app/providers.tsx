"use client";

import { PrimeReactProvider } from "primereact/api";
import { globalPassThrough } from "../theme/passthrough";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrimeReactProvider
      value={{
        pt: globalPassThrough,
      }}
    >
      {children}
    </PrimeReactProvider>
  );
}
