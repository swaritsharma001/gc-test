import React from 'react';
import { Bot, Heart, Mail, Shield, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1 rounded-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span>BotForge</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Empowering creators with the most intuitive bot management panel. 
              Deploy your bots in seconds with enterprise-grade stability.
            </p>
            <div className="flex items-center gap-2 text-xs font-medium bg-destructive/10 text-destructive px-3 py-2 rounded-lg border border-destructive/20 max-w-fit">
              <AlertTriangle className="w-3.5 h-3.5" />
              Disclaimer: Not affiliated with Discord Inc.
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Hosting</Link></li>
              <li><Link to="/commands" className="text-muted-foreground hover:text-foreground transition-colors">Commands</Link></li>
              <li><Link to="/status" className="text-muted-foreground hover:text-foreground transition-colors">Platform Status</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Security Notice</h4>
            <Card className="bg-background border-none shadow-sm p-4 text-[13px] text-muted-foreground leading-relaxed">
              Your token is stored securely using industry-standard encryption. 
              Misuse of this platform may result in a permanent ban.
            </Card>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 BotForge. All Rights Reserved.</p>
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in India by 
            <span className="font-medium text-foreground">BotForge Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`rounded-xl border bg-card p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
