import { Layout } from "@/components/common/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Palette, 
  Database,
  Key,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  Save,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Crown,
  Zap,
  Activity,
  Download
} from "lucide-react";
import { useState, useEffect } from "react";
import circuitPattern from "@/assets/circuit-pattern.jpg";

export default function Settings() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Layout title="Settings">
      <div className="space-y-6">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <SettingsIcon className="w-8 h-8 text-primary animate-pulse" />
                <div className="absolute inset-0 w-8 h-8 bg-primary/20 rounded-full animate-ping" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-glow via-accent-glow to-success-glow bg-clip-text text-transparent">
                Settings & Profile
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Manage your account, preferences, and system configuration
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Crown className="w-3 h-3 mr-1" />
                Premium Account
              </Badge>
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                <Activity className="w-3 h-3 mr-1" />
                Active Session
              </Badge>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="glass border-glass-border/30 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 group">
              <Trash2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform text-destructive" />
              Reset Settings
            </Button>
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow transition-all duration-300 shadow-lg hover:shadow-xl group">
              <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Settings Content */}
        <div className={`transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 glass border-glass-border/30 p-1">
              <TabsTrigger value="profile" className="relative overflow-hidden transition-all duration-300 data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-lg group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300" />
                <User className="w-4 h-4 mr-2" />
                <span className="relative z-10">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="relative overflow-hidden transition-all duration-300 data-[state=active]:bg-accent/20 data-[state=active]:text-accent data-[state=active]:shadow-lg group">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-success/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300" />
                <Shield className="w-4 h-4 mr-2" />
                <span className="relative z-10">Account</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="relative overflow-hidden transition-all duration-300 data-[state=active]:bg-success/20 data-[state=active]:text-success data-[state=active]:shadow-lg group">
                <div className="absolute inset-0 bg-gradient-to-r from-success/10 to-warning/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300" />
                <Bell className="w-4 h-4 mr-2" />
                <span className="relative z-10">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="relative overflow-hidden transition-all duration-300 data-[state=active]:bg-warning/20 data-[state=active]:text-warning data-[state=active]:shadow-lg group">
                <div className="absolute inset-0 bg-gradient-to-r from-warning/10 to-primary/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300" />
                <Palette className="w-4 h-4 mr-2" />
                <span className="relative z-10">Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="relative overflow-hidden transition-all duration-300 data-[state=active]:bg-muted/20 data-[state=active]:text-foreground data-[state=active]:shadow-lg group">
                <div className="absolute inset-0 bg-gradient-to-r from-muted/10 to-primary/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300" />
                <Database className="w-4 h-4 mr-2" />
                <span className="relative z-10">System</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Picture */}
                <Card className="glass border-glass-border/30 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 opacity-5 bg-cover bg-center"
                    style={{ backgroundImage: `url(${circuitPattern})` }}
                  />
                  <CardHeader className="relative z-10">
                    <CardTitle>Profile Picture</CardTitle>
                    <CardDescription>Update your avatar and profile image</CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10 space-y-4">
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="w-24 h-24 border-4 border-primary/50 shadow-lg">
                        <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                        <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-2xl font-bold">
                          JD
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Personal Information */}
                <Card className="lg:col-span-2 glass border-glass-border/30 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 opacity-5 bg-cover bg-center"
                    style={{ backgroundImage: `url(${circuitPattern})` }}
                  />
                  <CardHeader className="relative z-10">
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details and contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input id="email" type="email" defaultValue="john@kodaxa.com" className="pl-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="pl-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input id="location" defaultValue="San Francisco, CA" className="pl-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Select defaultValue="pst">
                            <SelectTrigger className="pl-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pst">Pacific Standard Time</SelectItem>
                              <SelectItem value="est">Eastern Standard Time</SelectItem>
                              <SelectItem value="utc">UTC</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        placeholder="Tell us about yourself..."
                        defaultValue="Senior AI Engineer at Kodaxa, passionate about building intelligent systems that make a difference."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass border-glass-border/30">
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your password and security preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="currentPassword" 
                          type={showPassword ? "text" : "password"} 
                          className="pl-10 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button className="w-full">Update Password</Button>
                  </CardContent>
                </Card>

                <Card className="glass border-glass-border/30">
                  <CardHeader>
                    <CardTitle>Account Status</CardTitle>
                    <CardDescription>Your account information and subscription details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Account Type</span>
                      <Badge className="bg-warning/20 text-warning">Premium</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Member Since</span>
                      <span className="text-muted-foreground">January 2024</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Last Login</span>
                      <span className="text-muted-foreground">2 hours ago</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span>Two-Factor Authentication</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Email Verification</span>
                      <Badge className="bg-success/20 text-success">Verified</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to be notified about activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Push Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">AI Analysis Updates</h4>
                        <p className="text-sm text-muted-foreground">Get notified when AI analysis completes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">System Alerts</h4>
                        <p className="text-sm text-muted-foreground">Important system messages and updates</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Marketing Communications</h4>
                        <p className="text-sm text-muted-foreground">Product updates and promotional content</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance" className="space-y-6">
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>Customize the look and feel of your interface</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <Select defaultValue="dark">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Interface Density</Label>
                      <Select defaultValue="comfortable">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compact">Compact</SelectItem>
                          <SelectItem value="comfortable">Comfortable</SelectItem>
                          <SelectItem value="spacious">Spacious</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Animations</h4>
                        <p className="text-sm text-muted-foreground">Enable interface animations and transitions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">High Contrast</h4>
                        <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* System Tab */}
            <TabsContent value="system" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass border-glass-border/30">
                  <CardHeader>
                    <CardTitle>Data & Privacy</CardTitle>
                    <CardDescription>Manage your data and privacy settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Data Collection</h4>
                        <p className="text-sm text-muted-foreground">Allow anonymous usage analytics</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Crash Reports</h4>
                        <p className="text-sm text-muted-foreground">Send crash reports to help improve the app</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>

                <Card className="glass border-glass-border/30">
                  <CardHeader>
                    <CardTitle>Performance</CardTitle>
                    <CardDescription>System performance and optimization settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Hardware Acceleration</h4>
                        <p className="text-sm text-muted-foreground">Use GPU for better performance</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Auto-save</h4>
                        <p className="text-sm text-muted-foreground">Automatically save your work</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label>Cache Size</Label>
                      <Select defaultValue="1gb">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="500mb">500 MB</SelectItem>
                          <SelectItem value="1gb">1 GB</SelectItem>
                          <SelectItem value="2gb">2 GB</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear Cache
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}