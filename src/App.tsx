import { AppProviders } from "@/providers/app-providers";
import { AppRouter } from "@/router";

export default function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}
