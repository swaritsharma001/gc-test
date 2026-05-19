import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Terms from "./pages/Terms";
import Dashboard from "./pages/Dashboard";
import BotManagement from "./pages/BotManagement";
import Commands from "./pages/Commands";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("theme");
    return (saved as "dark" | "light") || "dark";
  });

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/manage/:botId" element={<BotManagement />} />
            <Route path="/commands" element={<Commands />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" richColors />
      </div>
    </Router>
  );
}
