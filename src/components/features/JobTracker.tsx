
import { Check, Clock, MoreHorizontal, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type JobApplication = {
  id: string;
  company: string;
  position: string;
  date: string;
  status: "applied" | "interview" | "offer" | "rejected";
  logo?: string;
};

const applications: JobApplication[] = [
  {
    id: "1",
    company: "TechCorp",
    position: "Frontend Developer",
    date: "Apr 1, 2025",
    status: "interview",
  },
  {
    id: "2",
    company: "Design Studios",
    position: "UI/UX Designer",
    date: "Mar 28, 2025",
    status: "applied",
  },
  {
    id: "3",
    company: "Innovate Inc.",
    position: "Product Manager",
    date: "Mar 25, 2025",
    status: "rejected",
  },
  {
    id: "4",
    company: "DevSecOps",
    position: "Backend Engineer",
    date: "Mar 20, 2025",
    status: "offer",
  },
];

const statusDisplay = {
  applied: { label: "Applied", color: "bg-job-blue/10 text-job-blue", icon: Clock },
  interview: { label: "Interview", color: "bg-job-orange/10 text-job-orange", icon: Clock },
  offer: { label: "Offer", color: "bg-job-green/10 text-job-green", icon: Check },
  rejected: { label: "Rejected", color: "bg-job-red/10 text-job-red", icon: X },
};

const JobTracker = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Recent Applications</CardTitle>
        <Button variant="outline" size="sm">
          Add Application
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {applications.map((job) => {
            const status = statusDisplay[job.status];
            const StatusIcon = status.icon;
            
            return (
              <div
                key={job.id}
                className="p-3 border rounded-lg flex items-center justify-between card-hover"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-primary font-semibold">
                    {job.company.slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-medium">{job.position}</h4>
                    <p className="text-xs text-muted-foreground">{job.company} • {job.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={cn("flex items-center gap-1", status.color)}>
                    <StatusIcon className="h-3 w-3" />
                    <span>{status.label}</span>
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobTracker;
