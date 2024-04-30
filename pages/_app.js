import "@/styles/globals.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/bootstrap.min.css";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";
import RouteGuard from "@/components/RouteGuard";
import { useState } from "react";
import RingLoader from "react-spinners/RingLoader";
export default function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <RouteGuard>
        <SWRConfig
          value={{
            fetcher: async (url) => {
              setIsLoading(true);
              const res = await fetch(url);

              // If the status code is not in the range 200-299,
              // we still try to parse and throw it.
              if (!res.ok) {
                const error = new Error(
                  "An error occurred while fetching the data."
                );
                // Attach extra info to the error object.
                error.info = await res.json();
                error.status = res.status;
                throw error;
              }
              setIsLoading(false);
              return res.json();
            },
          }}
        >
          {isLoading ? (
            <>
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9999,
                }}
              >
                <RingLoader
                  color="#ccddd9"
                  size={200}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            </>
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </SWRConfig>
      </RouteGuard>
    </>
  );
}
