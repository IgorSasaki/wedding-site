import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster as Sonner } from "@/components/ui/sonner";

import { TooltipProvider } from "./components/ui/tooltip";
import { HomePage } from "./pages/Home";

const App = () => {
  return (
    <>
      <TooltipProvider>
        <Sonner />

        <BrowserRouter>
          <Routes>
            <Route element={<HomePage />} path="/" />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </>
  );
};

export default App;
