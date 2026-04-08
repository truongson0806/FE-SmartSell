import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { LoadingProvider } from "./contexts/LoadingProvider";
import Router from "./route/router";

function App() {
  return (
    <>
      <LoadingProvider>
        <Router />
      </LoadingProvider>
      <ToastContainer />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#111827",
            color: "#fff",
            borderRadius: "12px",
            padding: "12px 16px",
          },
        }}
      />
    </>
  );
}

export default App;
