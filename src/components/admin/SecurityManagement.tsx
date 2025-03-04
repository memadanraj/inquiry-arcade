
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Lock, Eye, EyeOff, Key, FileText, AlertTriangle, Clock, ActivitySquare, RefreshCcw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for security logs
const securityLogs = [
  { id: 1, type: 'login_attempt', user: 'admin@example.com', status: 'success', ip: '192.168.1.1', timestamp: '2024-03-10T14:25:30Z', details: 'Successful login' },
  { id: 2, type: 'login_attempt', user: 'unknown', status: 'failed', ip: '203.0.113.45', timestamp: '2024-03-10T13:15:22Z', details: 'Invalid credentials' },
  { id: 3, type: 'password_change', user: 'john.doe@example.com', status: 'success', ip: '192.168.1.52', timestamp: '2024-03-09T11:05:15Z', details: 'Password changed successfully' },
  { id: 4, type: 'account_lockout', user: 'susan.smith@example.com', status: 'warning', ip: '192.168.1.73', timestamp: '2024-03-09T08:45:10Z', details: 'Account locked after 5 failed attempts' },
  { id: 5, type: 'login_attempt', user: 'unknown', status: 'failed', ip: '198.51.100.27', timestamp: '2024-03-08T22:32:18Z', details: 'IP address blacklisted' },
  { id: 6, type: 'permission_change', user: 'admin@example.com', status: 'success', ip: '192.168.1.1', timestamp: '2024-03-08T15:12:45Z', details: 'Changed permissions for content editor role' },
  { id: 7, type: 'api_access', user: 'api_service', status: 'success', ip: '10.0.0.5', timestamp: '2024-03-08T12:01:30Z', details: 'API key authenticated successfully' },
  { id: 8, type: 'login_attempt', user: 'jane.doe@example.com', status: 'success', ip: '192.168.1.28', timestamp: '2024-03-07T09:55:22Z', details: 'Successful login with 2FA' },
];

const SecurityManagement: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [passwordExpiry, setPasswordExpiry] = useState('90');
  const [activeTab, setActiveTab] = useState('general');
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">Security Management</h2>
          <p className="text-muted-foreground">Configure security settings and review security logs</p>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="general">General Security</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="logs">Security Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6 pt-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-medium">General Security Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="session-timeout">Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">Log users out after a period of inactivity</p>
                </div>
                <Select defaultValue="30">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a timeout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="content-security">Content Security Policy</Label>
                  <p className="text-sm text-muted-foreground">Enforce CSP headers for XSS protection</p>
                </div>
                <Switch id="content-security" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="rate-limiting">Rate Limiting</Label>
                  <p className="text-sm text-muted-foreground">Limit request rates to prevent abuse</p>
                </div>
                <Switch id="rate-limiting" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ssl-enforce">Enforce SSL</Label>
                  <p className="text-sm text-muted-foreground">Force all connections to use HTTPS</p>
                </div>
                <Switch id="ssl-enforce" defaultChecked />
              </div>
              
              <div className="pt-4">
                <Button>Save General Settings</Button>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <ActivitySquare className="h-5 w-5 text-red-500" />
              <h3 className="text-lg font-medium">Threat Detection</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ip-blocking">Automatic IP Blocking</Label>
                  <p className="text-sm text-muted-foreground">Block IPs after suspicious activity</p>
                </div>
                <Switch id="ip-blocking" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="login-attempts">Failed Login Attempts</Label>
                  <p className="text-sm text-muted-foreground">Maximum attempts before temporary lockout</p>
                </div>
                <Select defaultValue="5">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select attempts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 attempts</SelectItem>
                    <SelectItem value="5">5 attempts</SelectItem>
                    <SelectItem value="10">10 attempts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="security-headers">Security Headers</Label>
                  <p className="text-sm text-muted-foreground">Use modern security headers</p>
                </div>
                <Switch id="security-headers" defaultChecked />
              </div>
              
              <div className="pt-4">
                <Button>Save Threat Settings</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="authentication" className="space-y-6 pt-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-5 w-5 text-purple-500" />
              <h3 className="text-lg font-medium">Authentication Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                </div>
                <Switch 
                  id="two-factor" 
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="password-expiry">Password Expiry</Label>
                  <p className="text-sm text-muted-foreground">Force password changes periodically</p>
                </div>
                <Select 
                  value={passwordExpiry}
                  onValueChange={setPasswordExpiry}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="password-requirements">Password Requirements</Label>
                    <p className="text-sm text-muted-foreground">Set minimum complexity requirements</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => setShowPasswordRequirements(!showPasswordRequirements)}
                  >
                    {showPasswordRequirements ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Switch id="password-requirements" defaultChecked />
              </div>
              
              {showPasswordRequirements && (
                <div className="bg-muted p-3 rounded-md text-sm space-y-2 mt-2">
                  <div className="flex items-center gap-2">
                    <Switch id="req-length" defaultChecked />
                    <Label htmlFor="req-length">Minimum 8 characters</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="req-uppercase" defaultChecked />
                    <Label htmlFor="req-uppercase">At least one uppercase letter</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="req-number" defaultChecked />
                    <Label htmlFor="req-number">At least one number</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="req-special" defaultChecked />
                    <Label htmlFor="req-special">At least one special character</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="req-unique" defaultChecked />
                    <Label htmlFor="req-unique">Different from previous 3 passwords</Label>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="single-session">Single Session</Label>
                  <p className="text-sm text-muted-foreground">Restrict to one active session per user</p>
                </div>
                <Switch id="single-session" />
              </div>
              
              <div className="pt-4">
                <Button>Save Authentication Settings</Button>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Key className="h-5 w-5 text-amber-500" />
              <h3 className="text-lg font-medium">API Security</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="api-auth">API Authentication</Label>
                  <p className="text-sm text-muted-foreground">Method used for API authentication</p>
                </div>
                <Select defaultValue="jwt">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jwt">JWT Tokens</SelectItem>
                    <SelectItem value="oauth">OAuth 2.0</SelectItem>
                    <SelectItem value="apikey">API Keys</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="token-expiry">Token Expiry</Label>
                  <p className="text-sm text-muted-foreground">How long access tokens remain valid</p>
                </div>
                <Select defaultValue="60">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select expiry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="1440">24 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="refresh-tokens">Use Refresh Tokens</Label>
                  <p className="text-sm text-muted-foreground">Enable long-lived refresh tokens</p>
                </div>
                <Switch id="refresh-tokens" defaultChecked />
              </div>
              
              <div className="pt-4 flex gap-2">
                <Button>Save API Settings</Button>
                <Button variant="outline" className="flex items-center gap-1">
                  <RefreshCcw className="h-4 w-4" />
                  Rotate API Keys
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-6 pt-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-green-500" />
                <h3 className="text-lg font-medium">Security Audit Logs</h3>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Log type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="login">Login Events</SelectItem>
                    <SelectItem value="password">Password Events</SelectItem>
                    <SelectItem value="admin">Admin Actions</SelectItem>
                    <SelectItem value="api">API Access</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">Export Logs</Button>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Event Type</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {securityLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {log.type === 'login_attempt' ? <Key className="h-4 w-4" /> :
                         log.type === 'password_change' ? <Lock className="h-4 w-4" /> :
                         log.type === 'account_lockout' ? <AlertTriangle className="h-4 w-4 text-yellow-500" /> :
                         <FileText className="h-4 w-4" />}
                        <span className="text-xs capitalize">{log.type.replace('_', ' ')}</span>
                      </div>
                    </TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>{log.ip}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        log.status === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        log.status === 'failed' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {log.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{log.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityManagement;
