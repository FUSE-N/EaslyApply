
import { useState } from "react";
import { Bot, Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AIFeedbackProps {
  title: string;
  placeholder?: string;
  feedbackType: "resume" | "interview" | "letter";
}

const AIFeedback = ({ title, placeholder, feedbackType }: AIFeedbackProps) => {
  const [userContent, setUserContent] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateFeedback = () => {
    if (!userContent.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI response with a timeout
    setTimeout(() => {
      let generatedFeedback = "";
      
      if (feedbackType === "resume") {
        generatedFeedback = `Your resume is well-structured, but consider these improvements:
        
1. **Skills Section**: Add more specific technical skills and tools you're proficient with.
2. **Achievements**: Quantify your achievements with metrics where possible.
3. **Action Verbs**: Begin bullet points with stronger action verbs like "Implemented" instead of "Worked on".
4. **Tailor for the Job**: Customize your resume for each application to highlight relevant experience.
5. **Education**: Move this section below your work experience as you have solid professional background.

Your resume is already strong, these tweaks will help it stand out even more!`;
      } else if (feedbackType === "interview") {
        generatedFeedback = `Based on your interview practice, here's my feedback:
        
1. **Strengths**: Great job explaining your technical background and problem-solving approach.
2. **Improvement Areas**: Try to be more concise with your answers - aim for 2-3 minutes per response.
3. **STAR Method**: For behavioral questions, structure responses using Situation, Task, Action, Result.
4. **Technical Questions**: Consider drawing or diagramming your solutions to complex problems.
5. **Questions to Ask**: Prepare more thoughtful questions about company culture and team dynamics.

Overall, you're well-prepared! Just minor adjustments needed before your actual interview.`;
      } else if (feedbackType === "letter") {
        generatedFeedback = `Your cover letter demonstrates enthusiasm, but here are some suggestions:
        
1. **Opening Paragraph**: Start with a stronger hook about why you're excited about this specific company.
2. **Company Knowledge**: Show more research about their recent projects or company values.
3. **Skill Alignment**: More clearly connect your experience to their job requirements.
4. **Tone**: Maintain professional tone while showing personality.
5. **Call to Action**: End with a stronger closing statement expressing interest in next steps.

With these adjustments, your cover letter will be much more compelling to hiring managers!`;
      }
      
      setFeedback(generatedFeedback);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-job-indigo" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <div className="flex-1">
          <textarea
            value={userContent}
            onChange={(e) => setUserContent(e.target.value)}
            placeholder={placeholder || "Paste your content here for AI feedback..."}
            className="w-full h-[200px] p-3 text-sm border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        {feedback && (
          <div className="mt-4 border rounded-md p-4 bg-accent/50">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="h-5 w-5 text-primary" />
              <h3 className="font-medium">AI Feedback</h3>
            </div>
            <ScrollArea className="h-[200px]">
              <div className="whitespace-pre-line text-sm">{feedback}</div>
            </ScrollArea>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button 
          onClick={handleGenerateFeedback} 
          disabled={!userContent.trim() || isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              Generating feedback...
            </>
          ) : (
            <>Get AI Feedback</>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIFeedback;
