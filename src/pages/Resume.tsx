
import { FileText, Upload } from "lucide-react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import AIFeedback from "@/components/features/AIFeedback";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Resume = () => {
  return (
    <SidebarLayout>
      <div className="flex flex-col space-y-6">
        <section className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">Resume Builder</h1>
          <p className="text-muted-foreground">Create, optimize, and tailor your resume with AI assistance</p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AIFeedback 
              title="Resume Optimization" 
              placeholder="Paste your resume content here to get AI feedback and suggestions for improvement..."
              feedbackType="resume"
            />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resume Templates</CardTitle>
                <CardDescription>Professional templates for different industries</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-3 cursor-pointer hover:border-primary transition-colors">
                  <h3 className="font-medium">Modern Professional</h3>
                  <p className="text-xs text-muted-foreground">Clean design with a modern touch</p>
                </div>
                <div className="border rounded-lg p-3 cursor-pointer hover:border-primary transition-colors">
                  <h3 className="font-medium">Creative Portfolio</h3>
                  <p className="text-xs text-muted-foreground">Showcase your creative work</p>
                </div>
                <div className="border rounded-lg p-3 cursor-pointer hover:border-primary transition-colors">
                  <h3 className="font-medium">Technical Expert</h3>
                  <p className="text-xs text-muted-foreground">Highlight technical skills</p>
                </div>
                <Button variant="outline" className="w-full">
                  Browse more templates
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upload Resume</CardTitle>
                <CardDescription>Upload an existing resume to edit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop your resume or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports PDF, DOCX, TXT (Max 5MB)
                  </p>
                  <Button size="sm" className="mt-4">
                    <FileText className="h-4 w-4 mr-2" /> Upload Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Resume;
