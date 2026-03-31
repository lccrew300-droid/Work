import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Groups from "./pages/Groups";
import Credentials from "./pages/Credentials";
import Designs from "./pages/Designs";
import Integrations from "./pages/Integrations";
import Pathways from "./pages/Pathways";
import Emails from "./pages/Emails";
import Analytics from "./pages/Analytics";
import Automations from "./pages/Automations";
import CreateGroup from "./pages/CreateGroup";
import DesignEditor from "./pages/DesignEditor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/credentials" element={<Credentials />} />
          <Route path="/designs" element={<Designs />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/pathways" element={<Pathways />} />
          <Route path="/emails" element={<Emails />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/automations" element={<Automations />} />
          <Route path="/groups/new" element={<CreateGroup />} />
          <Route path="/designs/new" element={<DesignEditor />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
