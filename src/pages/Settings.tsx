
import SidebarLayout from "@/components/layout/SidebarLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const Settings = () => {
  return (
    <SidebarLayout>
      <div className="flex flex-col space-y-6">
        <section className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </section>

        <Tabs defaultValue="profile">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="Your name" defaultValue="Alex Johnson" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Your email" defaultValue="alex@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" placeholder="Your current or desired job title" defaultValue="Frontend Developer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="City, State" defaultValue="San Francisco, CA" />
                  </div>
                </div>

                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Summary</Label>
                  <textarea
                    id="bio"
                    className="w-full min-h-[100px] p-3 text-sm border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Brief professional summary"
                    defaultValue="Frontend developer with 5 years of experience building responsive web applications using React, TypeScript and modern CSS frameworks."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (comma separated)</Label>
                  <Input 
                    id="skills" 
                    placeholder="Your skills" 
                    defaultValue="React, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Figma"
                  />
                </div>

                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Job Search Preferences</CardTitle>
                <CardDescription>Customize your job search experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Job Type</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="fulltime" defaultChecked />
                      <Label htmlFor="fulltime">Full-time</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="parttime" />
                      <Label htmlFor="parttime">Part-time</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="contract" />
                      <Label htmlFor="contract">Contract</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="remote" defaultChecked />
                      <Label htmlFor="remote">Remote</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary">Minimum Salary</Label>
                    <Input id="salary" placeholder="$" defaultValue="80000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level</Label>
                    <select
                      id="experience"
                      className="w-full p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
                      defaultValue="mid"
                    >
                      <option value="entry">Entry Level</option>
                      <option value="mid">Mid Level</option>
                      <option value="senior">Senior Level</option>
                      <option value="exec">Executive</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="industries">Preferred Industries</Label>
                  <Input 
                    id="industries" 
                    placeholder="e.g. Technology, Finance, Healthcare" 
                    defaultValue="Technology, SaaS, E-commerce" 
                  />
                </div>

                <Button>Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Email Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="job-alerts">New job matches</Label>
                      <Switch id="job-alerts" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="application-updates">Application updates</Label>
                      <Switch id="application-updates" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="interview-reminders">Interview reminders</Label>
                      <Switch id="interview-reminders" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="tips-resources">Career tips and resources</Label>
                      <Switch id="tips-resources" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Notification Frequency</h3>
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Job Alert Frequency</Label>
                    <select
                      id="frequency"
                      className="w-full p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
                      defaultValue="daily"
                    >
                      <option value="realtime">Real-time</option>
                      <option value="daily">Daily digest</option>
                      <option value="weekly">Weekly digest</option>
                    </select>
                  </div>
                </div>

                <Button>Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account and subscription</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Current Plan</h3>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Free Plan</h4>
                        <p className="text-sm text-muted-foreground">Basic job search and application tracking</p>
                      </div>
                      <Badge variant="outline">Current</Badge>
                    </div>
                    <Button className="mt-4">Upgrade to Pro</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Security</h3>
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button>Change Password</Button>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Danger Zone</h3>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  );
};

export default Settings;
