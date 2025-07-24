import { Layout } from "@/components/common/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import {
  User,
  Mail,
  Lock,
  Bell,
  Shield,
  Key,
  Smartphone,
  Globe,
  Eye,
  Settings,
  Save,
  Upload,
  Bot
} from "lucide-react";

export default function Profile() {
  const { profile, updateProfile, subscription } = useAuth();

  const availableAgents = [
    { id: 'hf-blenderbot', name: 'BlenderBot (Free)', description: 'Conversational AI assistant' },
    { id: 'hf-gpt2', name: 'GPT-2 (Free)', description: 'Fast general-purpose text generation' },
    { id: 'hf-distilbert', name: 'DistilBERT (Free)', description: 'Efficient question answering' },
    ...(subscription?.subscribed ? [
      { id: 'gpt-4', name: 'GPT-4 (Premium)', description: 'Advanced reasoning and analysis' },
      { id: 'claude-3', name: 'Claude 3 (Premium)', description: 'Expert in complex reasoning' },
      { id: 'gemini-pro', name: 'Gemini Pro (Premium)', description: 'Multimodal AI assistant' }
    ] : [])
  ];

  const handleAgentChange = async (agentId: string) => {
    try {
      await updateProfile({ preferred_agent: agentId });
    } catch (error) {
      console.error('Error updating preferred agent:', error);
    }
  };
  const apiKeys = [
    {
      id: 1,
      name: "Production Analytics API",
      key: "ak_live_••••••••••••1234",
      created: "2024-01-15",
      lastUsed: "2 hours ago",
      permissions: ["read", "write"],
    },
    {
      id: 2,
      name: "Development Environment",
      key: "ak_test_••••••••••••5678",
      created: "2024-02-10",
      lastUsed: "1 day ago",
      permissions: ["read"],
    },
  ];

  const sessions = [
    {
      id: 1,
      device: "Chrome on macOS",
      location: "San Francisco, CA",
      lastActive: "Active now",
      current: true,
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "San Francisco, CA",
      lastActive: "2 hours ago",
      current: false,
    },
    {
      id: 3,
      device: "Chrome on Windows",
      location: "New York, NY",
      lastActive: "1 day ago",
      current: false,
    },
  ];

  return (
    <Layout title="Profile & Settings">
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-glow to-accent-glow bg-clip-text text-transparent">
              Profile & Settings
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your account settings, security, and preferences
            </p>
          </div>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-primary" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your personal information and avatar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xl font-bold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Change Avatar
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john@company.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" defaultValue="Acme Corporation" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="VP of Strategy" />
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-primary" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your password and two-factor authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" placeholder="Enter current password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" placeholder="Enter new password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch />
                </div>

                <Button variant="outline" className="w-full">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Setup Authenticator App
                </Button>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-primary" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose how you want to be notified about important events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">AI Insights</p>
                    <p className="text-sm text-muted-foreground">Get notified of new AI recommendations</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">IP Deadlines</p>
                    <p className="text-sm text-muted-foreground">Alerts for patent and trademark deadlines</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">System Updates</p>
                    <p className="text-sm text-muted-foreground">Platform maintenance and updates</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* API Keys */}
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="w-5 h-5 mr-2 text-primary" />
                  API Keys
                </CardTitle>
                <CardDescription>
                  Manage your API access keys
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">{apiKey.name}</p>
                      <Badge variant="outline" className="text-xs">
                        {apiKey.permissions.join(", ")}
                      </Badge>
                    </div>
                    <p className="text-xs font-mono text-muted-foreground mb-2">
                      {apiKey.key}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Last used: {apiKey.lastUsed}</span>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  Generate New Key
                </Button>
              </CardContent>
            </Card>

            {/* Active Sessions */}
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-primary" />
                  Active Sessions
                </CardTitle>
                <CardDescription>
                  Monitor your active login sessions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {sessions.map((session) => (
                  <div key={session.id} className="p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">{session.device}</p>
                      {session.current && (
                        <Badge className="bg-success text-success-foreground text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{session.location}</p>
                    <p className="text-xs text-muted-foreground">{session.lastActive}</p>
                    {!session.current && (
                      <Button variant="ghost" size="sm" className="h-6 px-2 mt-2 text-xs text-destructive">
                        Revoke
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
