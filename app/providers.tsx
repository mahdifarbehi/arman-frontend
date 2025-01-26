"use client";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./theme-provider";
import { Provider } from "react-redux";
import { store } from "@/store/store";
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider store={store}>
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </Provider>
    </>
  );
}
export default Providers;
