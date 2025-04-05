
import { ArrowRight, CheckCircle, Clock, FileText, SendIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ActivityItem = {
  id: string;
  title: string;
  time: string;
  type: "resume" | "application" | "interview" | "offer";
  status?: "pending" | "completed" | "upcoming";
};

const activities: ActivityItem[] = [
  {
    id: "1",
    title: "Resume updated for Software Engineer position",
    time: "2 hours ago",
    type: "resume",
    status: "completed"
  },
  {
    id: "2",
    title: "Applied to Frontend Developer at TechCorp",
    time: "1 day ago",
    type: "application",
    status: "completed"
  },
  {
    id: "3",
    title: "Interview scheduled with Design Studio Inc.",
    time: "In 2 days",
    type: "interview",
    status: "upcoming"
  },
  {
    id: "4",
    title: "Application to Product Manager role submitted",
    time: "3 days ago",
    type: "application",
    status: "completed"
  },
  {
    id: "5",
    title: "Resume optimization for UX Designer roles",
    time: "5 days ago",
    type: "resume",
    status: "completed"
  }
];

const getActivityIcon = (type: ActivityItem["type"]) => {
  switch (type) {
    case "resume":
      return FileText;
    case "application":
      return SendIcon;
    case "interview":
      return Clock;
    case "offer":
      return CheckCircle;
    default:
      return FileText;
  }
};

const RecentActivity = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        <button className="text-sm text-primary flex items-center gap-1">
          View all <ArrowRight className="h-3 w-3" />
        </button>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <li key={activity.id} className="flex items-start gap-3">
                <div className={cn(
                  "mt-0.5 p-1.5 rounded-full",
                  activity.type === "resume" ? "bg-job-purple/10 text-job-purple" :
                  activity.type === "application" ? "bg-job-blue/10 text-job-blue" :
                  activity.type === "interview" ? "bg-job-orange/10 text-job-orange" :
                  "bg-job-green/10 text-job-green"
                )}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                </div>
                {activity.status && (
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    activity.status === "completed" ? "bg-job-green/10 text-job-green" :
                    activity.status === "upcoming" ? "bg-job-orange/10 text-job-orange" :
                    "bg-muted text-muted-foreground"
                  )}>
                    {activity.status}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
