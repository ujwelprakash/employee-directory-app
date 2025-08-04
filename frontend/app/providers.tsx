"use client";

import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client"; // adjust path if needed

export function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
