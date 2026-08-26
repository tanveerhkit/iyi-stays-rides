/* IYI app shell: one mobile-first experience with stays, rides, bookings, wallet, and accessible feedback. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";

function ProjectPathFallback() {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";

  if (pathname === "/iyi-stays-rides") return <Home />;
  if (pathname === "/iyi-stays-rides/admin") return <Admin />;
  return <NotFound />;
}

function Router() {
  const base = window.location.pathname.startsWith("/iyi-stays-rides") ? "/iyi-stays-rides" : "";

  return (
    <WouterRouter base={base}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/admin" component={Admin} />
        <Route path="/404" component={NotFound} />
        <Route component={ProjectPathFallback} />
      </Switch>
    </WouterRouter>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster position="top-center" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
