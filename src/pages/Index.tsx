
import { ArrowUpRight, Briefcase, CheckCircle, FileText, MessagesSquare, Search } from "lucide-react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import StatCard from "@/components/dashboard/StatCard";
import JobApplicationChart from "@/components/dashboard/JobApplicationChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import UpcomingInterviews from "@/components/dashboard/UpcomingInterviews";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Resume Builder",
    description: "Create and optimize your resume with AI feedback",
    icon: FileText,
    color: "bg-job-purple/10 text-job-purple",
    link: "/resume"
  },
  {
    title: "Job Search",
    description: "Find relevant job openings tailored to your skills",
    icon: Search,
    color: "bg-job-blue/10 text-job-blue",
    link: "/job-search"
  },
  {
    title: "Application Tracker",
    description: "Track your job applications and their status",
    icon: Briefcase,
    color: "bg-job-teal/10 text-job-teal",
    link: "/applications"
  },
  {
    title: "Interview Prep",
    description: "Prepare for interviews with AI practice sessions",
    icon: MessagesSquare,
    color: "bg-job-orange/10 text-job-orange",
    link: "/interview-prep"
  }
];

const Index = () => {
  return (
    <SidebarLayout>
      <div className="flex flex-col space-y-8">
        {/* Welcome Section */}
        <section className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">Welcome to AI Job Buddy</h1>
          <p className="text-muted-foreground">Your AI-powered career assistant to help you land your dream job.</p>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Applications" 
            value={117}
            description="Total job applications"
            icon={Briefcase}
            trend="up"
            trendValue="+12%"
          />
          <StatCard 
            title="Interviews" 
            value={24}
            description="Interviews scheduled"
            icon={MessagesSquare}
            trend="up"
            trendValue="+5%"
          />
          <StatCard 
            title="Responses" 
            value="32%"
            description="Application response rate"
            icon={CheckCircle}
            trend="up"
            trendValue="+8%"
          />
          <StatCard 
            title="Applications This Month" 
            value={14}
            description="Jobs applied to this month"
            icon={FileText}
          />
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <JobApplicationChart />
          </div>
          <div>
            <UpcomingInterviews />
          </div>
        </section>

        {/* Features Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">AI-Powered Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="feature-card flex flex-col">
                <div className={cn("rounded-full w-10 h-10 flex items-center justify-center mb-3", feature.color)}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="font-medium mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground flex-1 mb-3">{feature.description}</p>
                <Button variant="outline" asChild className="mt-auto justify-start">
                  <a href={feature.link} className="inline-flex items-center">
                    Explore <ArrowUpRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <RecentActivity />
        </section>
      </div>
    </SidebarLayout>
  );
};

export default Index;
