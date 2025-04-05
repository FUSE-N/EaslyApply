
import { Building, Clock, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Interview = {
  id: string;
  company: string;
  position: string;
  date: string;
  time: string;
  type: string;
};

const interviews: Interview[] = [
  {
    id: "1",
    company: "Design Studio Inc.",
    position: "UI/UX Designer",
    date: "Apr 5, 2025",
    time: "10:00 AM",
    type: "Video Call"
  },
  {
    id: "2",
    company: "Tech Innovations",
    position: "Frontend Developer",
    date: "Apr 8, 2025",
    time: "2:30 PM",
    type: "Technical Test"
  }
];

const UpcomingInterviews = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Upcoming Interviews</CardTitle>
      </CardHeader>
      <CardContent>
        {interviews.length > 0 ? (
          <div className="space-y-4">
            {interviews.map((interview) => (
              <div key={interview.id} className="p-4 border rounded-lg card-hover">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{interview.position}</h4>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Building className="h-3.5 w-3.5 mr-1" />
                      <span>{interview.company}</span>
                    </div>
                  </div>
                  <span className="bg-job-orange/10 text-job-orange text-xs px-2 py-1 rounded-full">
                    {interview.type}
                  </span>
                </div>
                
                <div className="flex items-center mt-3 text-sm">
                  <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  <span>
                    {interview.date} at {interview.time}
                  </span>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Button size="sm" className="w-full">Prepare</Button>
                  <Button size="sm" variant="outline" className="w-full">
                    Join <ExternalLink className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No upcoming interviews</p>
            <Button variant="link" className="mt-2">Schedule mock interview</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingInterviews;
