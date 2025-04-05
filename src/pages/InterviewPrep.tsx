
import { useState, useRef, useEffect } from "react";
import { ArrowRight, Lightbulb, MessageSquareText, MicIcon, Video, Pause, Play, StopCircle, Loader, VideoOff } from "lucide-react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import AIFeedback from "@/components/features/AIFeedback";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const commonQuestions = [
  {
    id: "1",
    question: "Tell me about yourself",
    category: "Behavioral",
  },
  {
    id: "2",
    question: "What are your strengths and weaknesses?",
    category: "Behavioral",
  },
  {
    id: "3",
    question: "Why are you interested in this position?",
    category: "Behavioral",
  },
  {
    id: "4",
    question: "Explain how you would design a URL shortening service",
    category: "Technical",
  },
  {
    id: "5",
    question: "How would you optimize a slow-loading website?",
    category: "Technical",
  },
];

const InterviewPrep = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("text");
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedTime, setRecordedTime] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  // Handle camera initialization
  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: cameraEnabled, 
        audio: true 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        // Video processing logic would go here
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        chunksRef.current = [];
        
        // Here we would normally send the blob to a server for processing
        // For now we'll just create a URL for preview
        const url = URL.createObjectURL(blob);
        
        toast({
          title: "Recording completed",
          description: "Your interview has been recorded successfully.",
        });
      };
      
      // Setup speech recognition for transcription
      if ('webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        
        recognition.onresult = (event) => {
          let interimTranscript = '';
          let finalTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }
          
          setTranscript(prev => prev + finalTranscript + ' ');
          setIsTranscribing(!!interimTranscript);
        };
        
        recognition.onend = () => {
          setIsTranscribing(false);
          if (isRecording && !isPaused) {
            recognition.start();
          }
        };
        
        if (isRecording && !isPaused) {
          recognition.start();
        }
        
        return () => {
          recognition.stop();
        };
      } else {
        toast({
          title: "Speech Recognition Not Available",
          description: "Your browser doesn't support speech recognition.",
          variant: "destructive",
        });
      }
      
    } catch (err) {
      console.error("Error accessing media devices:", err);
      toast({
        title: "Camera Access Failed",
        description: "Please ensure you have granted permission to access your camera and microphone.",
        variant: "destructive",
      });
    }
  };
  
  useEffect(() => {
    if (activeTab === "video") {
      initializeCamera();
    }
    
    return () => {
      // Clean up media streams when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [activeTab, cameraEnabled]);
  
  const toggleRecording = () => {
    if (!isRecording) {
      // Start recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'inactive') {
        chunksRef.current = [];
        mediaRecorderRef.current.start();
        setIsRecording(true);
        setIsPaused(false);
        timerRef.current = window.setInterval(() => {
          setRecordedTime(prev => prev + 1);
        }, 1000);
        
        toast({
          title: "Recording Started",
          description: "Your interview session is now being recorded.",
        });
      }
    } else {
      // Stop recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        setIsPaused(false);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
    }
  };
  
  const togglePause = () => {
    if (isRecording) {
      if (!isPaused) {
        // Pause recording
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.pause();
          setIsPaused(true);
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        }
      } else {
        // Resume recording
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
          mediaRecorderRef.current.resume();
          setIsPaused(false);
          timerRef.current = window.setInterval(() => {
            setRecordedTime(prev => prev + 1);
          }, 1000);
        }
      }
    }
  };
  
  const toggleCamera = () => {
    setCameraEnabled(!cameraEnabled);
  };
  
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const handleQuestionSelect = (question: string) => {
    setSelectedQuestion(question);
    
    // Auto-populate the transcript with the selected question
    if (activeTab === "video") {
      toast({
        title: "Question Selected",
        description: "The interviewer is asking: " + question,
      });
    }
  };

  return (
    <SidebarLayout>
      <div className="flex flex-col space-y-6">
        <section className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">Interview Preparation</h1>
          <p className="text-muted-foreground">Practice and prepare for your upcoming interviews</p>
        </section>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="text">Text Mode</TabsTrigger>
            <TabsTrigger value="video">Video Mode</TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AIFeedback 
                  title="AI Mock Interview" 
                  placeholder="Type your interview answer here to get AI feedback, or click 'Start Mock Interview' below to begin a simulated interview session..."
                  feedbackType="interview"
                />
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Common Questions</CardTitle>
                    <CardDescription>Practice with frequently asked questions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {commonQuestions.map((item) => (
                      <div key={item.id} className="flex justify-between p-3 border rounded-lg hover:border-primary cursor-pointer transition-colors">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.question}</p>
                        </div>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" className="w-full">
                      Browse More Questions <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Interview Tools</CardTitle>
                    <CardDescription>Additional resources to help you prepare</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquareText className="h-4 w-4 mr-2" />
                      Start Full Mock Interview
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MicIcon className="h-4 w-4 mr-2" />
                      Voice Interview Practice
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Industry-Specific Tips
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="video" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <Card className="overflow-hidden h-[500px]">
                  <div className="relative h-full bg-black">
                    {/* Video preview */}
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      muted 
                      playsInline 
                      className={`w-full h-full ${cameraEnabled ? '' : 'invisible'}`}
                    ></video>
                    
                    {/* Camera disabled overlay */}
                    {!cameraEnabled && (
                      <div className="absolute inset-0 flex items-center justify-center bg-muted">
                        <VideoOff className="h-24 w-24 text-muted-foreground opacity-20" />
                        <p className="absolute text-muted-foreground">Camera turned off</p>
                      </div>
                    )}
                    
                    {/* Recording indicator */}
                    {isRecording && (
                      <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/70 text-white px-3 py-1 rounded-full">
                        <div className={`h-3 w-3 rounded-full ${isPaused ? 'bg-yellow-500' : 'bg-red-500 animate-pulse'}`}></div>
                        <span>{formatTime(recordedTime)}</span>
                      </div>
                    )}
                    
                    {/* Question overlay */}
                    {selectedQuestion && (
                      <div className="absolute top-4 left-4 right-1/3 bg-black/70 text-white p-3 rounded-lg">
                        <p className="text-sm font-medium mb-1">Current Question:</p>
                        <p>{selectedQuestion}</p>
                      </div>
                    )}
                    
                    {/* Controls */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm border-white/10 text-white"
                        onClick={toggleCamera}
                      >
                        {cameraEnabled ? <Video /> : <VideoOff />}
                      </Button>
                      
                      <Button 
                        variant={isRecording ? "destructive" : "default"} 
                        size="icon" 
                        className="rounded-full h-12 w-12"
                        onClick={toggleRecording}
                      >
                        {isRecording ? <StopCircle className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                      </Button>
                      
                      {isRecording && (
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm border-white/10 text-white"
                          onClick={togglePause}
                        >
                          {isPaused ? <Play /> : <Pause />}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
                
                {/* Transcript area */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Live Transcript</CardTitle>
                      {isTranscribing && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Loader className="h-3 w-3 mr-2 animate-spin" />
                          Transcribing...
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="min-h-[120px] max-h-[200px] overflow-y-auto p-3 bg-muted rounded-md">
                      {transcript ? (
                        <p className="whitespace-pre-wrap">{transcript}</p>
                      ) : (
                        <p className="text-muted-foreground italic">
                          Your speech will be transcribed here in real-time. Start recording and speaking to see the transcript.
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div className="flex w-full gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setTranscript("")}
                        disabled={!transcript}
                      >
                        Clear Transcript
                      </Button>
                      <Button 
                        className="flex-1"
                        disabled={!transcript}
                      >
                        Get AI Feedback
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Practice Questions</CardTitle>
                    <CardDescription>Select a question to practice</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {commonQuestions.map((item) => (
                      <div 
                        key={item.id} 
                        className={`flex justify-between p-3 border rounded-lg hover:border-primary cursor-pointer transition-colors ${selectedQuestion === item.question ? 'border-primary bg-primary/5' : ''}`}
                        onClick={() => handleQuestionSelect(item.question)}
                      >
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.question}</p>
                        </div>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" className="w-full">
                      Browse More Questions <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Video Interview Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Lighting & Background</h3>
                      <p className="text-sm text-muted-foreground">Ensure you have good lighting and a clean, professional background.</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Body Language</h3>
                      <p className="text-sm text-muted-foreground">Maintain eye contact with the camera and sit with good posture.</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Technical Check</h3>
                      <p className="text-sm text-muted-foreground">Test your camera and microphone before the actual interview.</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Practice Timing</h3>
                      <p className="text-sm text-muted-foreground">Keep answers concise, typically 1-2 minutes per question.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Interview Tips Section - show in both tabs */}
        {activeTab === "text" && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Interview Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="feature-card">
                <h3 className="font-medium mb-2">Before the Interview</h3>
                <ul className="text-sm space-y-2 list-disc pl-5 text-muted-foreground">
                  <li>Research the company thoroughly</li>
                  <li>Review the job description and requirements</li>
                  <li>Prepare your STAR method stories</li>
                  <li>Practice common questions out loud</li>
                  <li>Prepare thoughtful questions to ask</li>
                </ul>
              </Card>
              <Card className="feature-card">
                <h3 className="font-medium mb-2">During the Interview</h3>
                <ul className="text-sm space-y-2 list-disc pl-5 text-muted-foreground">
                  <li>Make a strong first impression with a smile</li>
                  <li>Listen actively and take brief notes</li>
                  <li>Use the STAR method for behavioral questions</li>
                  <li>Be specific with examples from your experience</li>
                  <li>Show enthusiasm and positive body language</li>
                </ul>
              </Card>
              <Card className="feature-card">
                <h3 className="font-medium mb-2">After the Interview</h3>
                <ul className="text-sm space-y-2 list-disc pl-5 text-muted-foreground">
                  <li>Send a thank-you email within 24 hours</li>
                  <li>Follow up if you don't hear back in a week</li>
                  <li>Reflect on what went well and areas to improve</li>
                  <li>Update your application status in the tracker</li>
                  <li>Continue applying to other positions</li>
                </ul>
              </Card>
            </div>
          </section>
        )}
      </div>
    </SidebarLayout>
  );
};

export default InterviewPrep;
