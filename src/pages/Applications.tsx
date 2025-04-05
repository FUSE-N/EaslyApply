
import { FilterIcon, Plus, Settings } from "lucide-react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import JobTracker from "@/components/features/JobTracker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const applicationStatuses = [
  { name: "Applied", count: 24, color: "bg-job-blue" },
  { name: "Interviews", count: 12, color: "bg-job-orange" },
  { name: "Offers", count: 3, color: "bg-job-green" },
  { name: "Rejected", count: 18, color: "bg-job-red" },
];

const totalApplications = applicationStatuses.reduce((sum, status) => sum + status.count, 0);

const Applications = () => {
  return (
    <SidebarLayout>
      <div className="flex flex-col space-y-6">
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Applications Tracker</h1>
            <p className="text-muted-foreground">Track and manage your job applications</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FilterIcon className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Application
            </Button>
          </div>
        </section>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Application Overview</CardTitle>
              <CardDescription>Your applications by status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applicationStatuses.map((status) => (
                  <div key={status.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{status.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {status.count} ({Math.round((status.count / totalApplications) * 100)}%)
                      </span>
                    </div>
                    <Progress
                      value={(status.count / totalApplications) * 100}
                      className={`h-2 ${status.color}`}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="font-medium">Total Applications</span>
                  <span className="font-medium">{totalApplications}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Application Insights</CardTitle>
              <CardDescription>Performance and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-job-blue/10 border border-job-blue/20">
                  <h3 className="font-medium mb-1">Response Rate</h3>
                  <p className="text-sm">Your response rate is 32%, which is 8% above average in your industry.</p>
                </div>
                <div className="p-3 rounded-lg bg-job-orange/10 border border-job-orange/20">
                  <h3 className="font-medium mb-1">Interview Conversion</h3>
                  <p className="text-sm">50% of your applications lead to interviews, 15% above similar job seekers.</p>
                </div>
                <div className="p-3 rounded-lg bg-job-green/10 border border-job-green/20">
                  <h3 className="font-medium mb-1">AI Recommendation</h3>
                  <p className="text-sm">Optimize your resume with more keywords from job descriptions to improve match rate.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications Tabs */}
        <Tabs defaultValue="all">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All Applications</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          
          <TabsContent value="all" className="mt-4">
            <JobTracker />
          </TabsContent>
          
          <TabsContent value="active" className="mt-4">
            <JobTracker />
          </TabsContent>
          
          <TabsContent value="archived" className="mt-4">
            <div className="text-center py-12">
              <p className="text-muted-foreground">No archived applications</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  );
};

export default Applications;
