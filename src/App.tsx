import Home from "./pages/Home";
import Results from "./pages/Results";
import { ErrorBoundary } from "react-error-boundary";
import { queryClient } from "./utils/queryClientConfig";
import { ResultsProvider } from "./context/ResultsProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

function Layout({ children }: React.PropsWithChildren) {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ height: "calc(100% - 50px)" }}>{children}</div>
        <div
          id="footer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 50,
            fontSize: 15,
            fontFamily: "monospace",
            color: "gray",
          }}
        >
          <span>React Level 2 Certification - ©Loïc BURNOTTE - 2025</span>
        </div>
      </div>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ResultsProvider>
        <BrowserRouter>
          <Routes>
            <Route
              index
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="results"
              element={
                <Layout>
                  <Results />
                </Layout>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ResultsProvider>
    </QueryClientProvider>
  );
}

export default App;
