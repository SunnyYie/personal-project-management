import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Router from "./router/routes";

export default function App() {
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <Router />
      <Toaster />
    </ThemeProvider>
  );
}
