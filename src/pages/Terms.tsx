import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { ShieldAlert, CheckCircle2, Lock, FileText } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function Terms() {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);

  const handleContinue = () => {
    if (!accepted) {
      toast.warning("Please accept the terms to continue");
      return;
    }
    toast.success("Security verification complete!");
    navigate("/dashboard");
  };

  const bulletPoints = [
    {
      title: "Zero Misuse Policy",
      desc: "Bots created or hosted here may be banned by Discord if used for malicious activities, spam, or self-botting.",
      icon: ShieldAlert,
      color: "text-red-500 bg-red-500/10"
    },
    {
      title: "Secure Encryption",
      desc: "We store your tokens in a sandboxed, encrypted vault. Only you have access to your bot's identity.",
      icon: Lock,
      color: "text-indigo-500 bg-indigo-500/10"
    },
    {
      title: "User Responsibility",
      desc: "You are solely responsible for the actions of your bots. BotForge is not liable for any account actions taken by Discord.",
      icon: FileText,
      color: "text-amber-500 bg-amber-500/10"
    }
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 py-20 overflow-hidden relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full -z-10 delay-1000 animate-pulse"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-2 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-indigo-500 to-purple-500"></div>
          
          <CardHeader className="text-center pt-10 pb-6">
            <CardTitle className="text-3xl font-bold tracking-tight">Critical Security Notice</CardTitle>
            <p className="text-muted-foreground mt-2">Please review our usage policies before proceeding to your dashboard.</p>
          </CardHeader>

          <CardContent className="space-y-8 px-6 md:px-10">
            <div className="grid gap-6">
              {bulletPoints.map((point, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl border bg-muted/10">
                  <div className={`w-12 h-12 rounded-xl flex shrink-0 items-center justify-center ${point.color}`}>
                    <point.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{point.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-start space-x-3 p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/20">
              <Checkbox 
                id="terms" 
                checked={accepted} 
                onCheckedChange={(checked) => setAccepted(checked as boolean)}
                className="mt-1 border-indigo-500 data-[state=checked]:bg-indigo-500"
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none cursor-pointer select-none"
                >
                  I accept the Terms and Conditions
                </label>
                <p className="text-xs text-muted-foreground">
                  I understand that my tokens are stored securely and I am responsible for my bot's actions.
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="px-10 pb-10 border-t pt-8">
            <Button 
              className="w-full h-12 rounded-xl text-base font-semibold shadow-lg shadow-indigo-500/20" 
              onClick={handleContinue}
              disabled={!accepted}
            >
              Continue to Dashboard
              <CheckCircle2 className="ml-2 w-5 h-5" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
