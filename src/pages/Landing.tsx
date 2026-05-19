import React, { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { motion } from "motion/react";
import { 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Settings2, 
  Cloud, 
  ArrowRight,
  Play,
  Ghost
} from "lucide-react";
import Terminal from "@/components/terminal/Terminal";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Landing() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.length < 50) {
      toast.error("Please enter a valid Discord bot token");
      return;
    }
    toast.success("Token received! Verifying security...");
    setTimeout(() => {
      navigate("/terms");
    }, 1500);
  };

  const commands = [
    "git clone https://github.com/botforge/api",
    "npm install && npm run build",
    "Validating core systems...",
    "Found 12 cached command modules",
    "- Auto-mod system initialized",
    "- Logging engine active (V2.4.0)",
    "- Connection established to shard #0",
    "Ready. Listening for Discord events."
  ];

  const features = [
    {
      title: "Fast Deployment",
      desc: "One-click deployment system that spins up your bot globally in less than 60 seconds.",
      icon: Zap,
      color: "from-amber-400 to-orange-500"
    },
    {
      title: "Secure Storage",
      desc: "Military-grade encryption for all your bot tokens and sensitive data.",
      icon: ShieldCheck,
      color: "from-emerald-400 to-teal-500"
    },
    {
      title: "Real-time Status",
      desc: "Comprehensive monitoring with live logs and performance analytics dashboard.",
      icon: BarChart3,
      color: "from-blue-400 to-indigo-500"
    },
    {
      title: "Easy Control",
      desc: "Manage everything from commands to auto-responses through our intuitive panel.",
      icon: Settings2,
      color: "from-violet-400 to-purple-500"
    },
    {
      title: "Cloud Hosted",
      desc: "99.9% uptime guaranteed with our distributed cloud infrastructure.",
      icon: Cloud,
      color: "from-rose-400 to-pink-500"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-background to-background"></div>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 border bg-muted/50 px-3 py-1.5 rounded-full mb-8 text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            V2.0 is now live with enhanced Auto-Mod
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            Powerful Discord <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Bot Hosting Platform
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            The easiest way to deploy, manage, and control your Discord bots without the headache of self-hosting.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Button size="lg" className="rounded-full px-8 h-12 text-base w-full sm:w-auto" asChild>
              <a href="/login" className="gap-2">
                <Ghost className="w-5 h-5" />
                Login with Discord
              </a>
            </Button>
            <div className="relative w-full sm:w-80 group">
              <form onSubmit={handleTokenSubmit} className="flex items-center">
                <Input
                  placeholder="Enter Bot Token"
                  className="rounded-full pl-6 pr-12 h-12 border-2 focus-visible:ring-indigo-500"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
                <Button 
                  type="submit"
                  size="icon" 
                  className="absolute right-1 rounded-full h-10 w-10 bg-indigo-500 hover:bg-indigo-600"
                >
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto text-left"
          >
            <Terminal commands={commands} />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to scale</h2>
            <p className="text-muted-foreground">Purpose-built for sophisticated Discord implementations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-background border hover:border-indigo-500/50 transition-all shadow-sm hover:shadow-xl hover:shadow-indigo-500/10"
              >
                <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-2 group-hover:text-indigo-500 transition-colors">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl font-bold leading-tight">
                New to Discord bots? <br />
                <span className="text-indigo-500">Learn how to get started.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Tokens are sensitive keys. We've prepared a comprehensive guide on how to safely retrieve your token from the Discord Developer Portal and use it with BotForge.
              </p>
              <ul className="space-y-4">
                {[
                  "Navigate to Discord Developer Portal",
                  "Create a new Application",
                  "Enable Bot and toggle Privileged Intents",
                  "Reset and Copy the Token securely"
                ].map((step, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </div>
                    <span className="font-medium">{step}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" variant="outline" className="rounded-full">
                Full Text Guide
              </Button>
            </div>
            <div className="flex-1 w-full max-w-2xl">
              <div className="relative aspect-video rounded-3xl overflow-hidden border shadow-2xl bg-black group">
                <iframe
                  className="absolute inset-0 w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                  src="https://www.youtube.com/embed/66Oa_f7orgw"
                  title="How to Get Discord Token"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-3">
                    <Play className="w-5 h-5 text-indigo-400 fill-indigo-400" />
                    <span className="text-white font-medium">Quick Tutorial: How to Get Token</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
