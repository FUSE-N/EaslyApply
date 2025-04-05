
import { Building, MapPin, Search } from "lucide-react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const jobListings = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA (Remote)",
    salary: "$120,000 - $150,000",
    tags: ["React", "TypeScript", "Tailwind CSS", "5+ years"],
    description: "We're looking for a Senior Frontend Developer with expertise in React and TypeScript to join our product team...",
    posted: "2 days ago",
    easy_apply: true
  },
  {
    id: "2",
    title: "UX/UI Designer",
    company: "Design Studios",
    location: "New York, NY (Hybrid)",
    salary: "$90,000 - $120,000",
    tags: ["Figma", "User Research", "Prototyping", "3+ years"],
    description: "Seeking a talented UX/UI Designer to create beautiful, intuitive interfaces for our clients in the finance industry...",
    posted: "5 days ago",
    easy_apply: false
  },
  {
    id: "3",
    title: "Full Stack Engineer",
    company: "Innovate Inc.",
    location: "Austin, TX (On-site)",
    salary: "$100,000 - $140,000",
    tags: ["React", "Node.js", "MongoDB", "AWS", "4+ years"],
    description: "Join our engineering team to build scalable web applications from the ground up. You'll be working on both frontend and backend...",
    posted: "1 week ago",
    easy_apply: true
  },
];

const JobSearch = () => {
  return (
    <SidebarLayout>
      <div className="flex flex-col space-y-6">
        <section className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">Job Search</h1>
          <p className="text-muted-foreground">Find and apply to jobs matching your skills and preferences</p>
        </section>

        {/* Search Section */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-2">
                <label className="text-sm font-medium mb-1.5 block">Job Title or Keywords</label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-9" placeholder="Frontend Developer, UX Designer..." />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-9" placeholder="City, State or Remote" />
                </div>
              </div>
              <div className="flex items-end">
                <Button className="w-full">Search Jobs</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recommended Jobs</h2>
            <div className="text-sm text-muted-foreground">
              Showing {jobListings.length} of 158 jobs
            </div>
          </div>

          <div className="space-y-4">
            {jobListings.map((job) => (
              <Card key={job.id} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-md bg-accent text-primary font-semibold text-lg">
                          {job.company.slice(0, 2)}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">{job.title}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Building className="h-3.5 w-3.5 mr-1" />
                            <span>{job.company}</span>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            <span>{job.location}</span>
                            {job.salary && <span className="ml-2">• {job.salary}</span>}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm mt-3">{job.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {job.tags.map((tag) => (
                          <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-muted-foreground">Posted {job.posted}</span>
                      <div className="flex flex-col gap-2 mt-2 w-full md:w-auto">
                        <Button variant={job.easy_apply ? "default" : "outline"}>
                          {job.easy_apply ? "Easy Apply" : "Apply Now"}
                        </Button>
                        <Button variant="outline" size="sm">Save Job</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            <Button variant="outline">Load More Jobs</Button>
          </div>
        </section>
      </div>
    </SidebarLayout>
  );
};

export default JobSearch;
