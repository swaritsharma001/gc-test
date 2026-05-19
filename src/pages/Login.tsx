import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import { Bot, Ghost, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleDiscordLogin = () => {
    setIsLoading(true);
    toast.info("Connecting to Discord OAuth...");
    
    // Simulate OAuth flow
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Successfully authenticated with Discord!");
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-500/5 via-background to-background"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 shadow-2xl bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl w-fit shadow-xl shadow-indigo-500/20">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-3xl font-bold tracking-tight">Welcome Back</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Sign in to manage your BotForge infrastructure
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button 
              className="w-full h-14 text-lg font-semibold rounded-2xl shadow-lg bg-[#5865F2] hover:bg-[#4752C4] transition-all hover:scale-[1.02] active:scale-100"
              onClick={handleDiscordLogin}
              disabled={isLoading}
            >
              <Ghost className="mr-3 w-6 h-6" />
              {isLoading ? "Connecting..." : "Login with Discord"}
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted-foreground/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground font-medium uppercase tracking-widest">Secure Access</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-2 p-4 border rounded-2xl bg-muted/20">
                <Shield className="w-5 h-5 text-indigo-500" />
                <span className="text-[11px] font-bold uppercase tracking-tighter opacity-70">Encrypted</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 border rounded-2xl bg-muted/20">
                <Bot className="w-5 h-5 text-purple-500" />
                <span className="text-[11px] font-bold uppercase tracking-tighter opacity-70">Cloud-Native</span>
              </div>
            </div>
          </CardContent>
          <div className="p-6 pt-0 text-center">
            <p className="text-xs text-muted-foreground leading-relaxed">
              By logging in, you agree to our <a href="/terms" className="text-primary hover:underline font-medium">Terms of Service</a> and acknowledge your responsibility for bot usage.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
