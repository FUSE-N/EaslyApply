import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState("jobSearch");

  const features = [
    {
      title: "AI Resume Builder",
      description: "Get tailored feedback to optimize your resume for job applications",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Smart Job Matching",
      description: "Find opportunities that match your skills and experience",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Interview Preparation",
      description: "Practice with AI-powered mock interviews for your specific role",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Application Tracking",
      description: "Keep track of all your job applications in one place",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
  ];

  const testimonials = [
    {
      quote: "EaslyApply helped me land my dream job by perfecting my resume and preparing me for tough interview questions.",
      author: "Michael T.",
      role: "Software Engineer",
    },
    {
      quote: "I was struggling to track my applications until I found this platform. It simplified my job search immensely!",
      author: "Sarah L.",
      role: "Marketing Manager",
    },
    {
      quote: "The AI-powered interview prep gave me confidence I never had before. Highly recommend!",
      author: "James K.",
      role: "Product Designer",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full py-4 px-6 md:px-10 flex items-center justify-between bg-background border-b">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-md h-8 w-8 flex items-center justify-center">
            <img src="/images/AI-CV.png" alt="EaslyApply Logo" className="h-8 w-8" />
            {/* <span className="text-primary-foreground font-bold">JB</span> */}
          </div>
          <span className="font-semibold text-xl">EaslyApply</span>
        </div>
        <div>
          <Link to="/auth">
            <Button variant="outline" className="mr-3">Log In</Button>
          </Link>
          <Link to="/auth?signup=true">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-10 bg-gradient-to-br from-primary/10 to-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your AI-powered <br />
              <span className="text-primary">Career Assistant</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
              Optimize your resume, find jobs, track applications, and prepare for interviews with AI assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth?signup=true">
                <Button size="lg" className="gap-2">
                  Get Started <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[400px] md:h-[450px] rounded-xl overflow-hidden shadow-xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1600" 
              alt="AI Job Assistant Dashboard" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Button size="lg" variant="default" className="gap-2 bg-background/90 text-foreground hover:bg-background">
                Watch Demo <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div> */}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-10 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">All-in-One Job Search Platform</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to land your dream job, powered by AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full card-hover border-primary/10">
                  <CardContent className="pt-6">
                    <div className="mb-4 p-2 inline-flex rounded-full bg-primary/10">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-20 px-6 md:px-10 bg-gradient-to-br from-background to-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform makes job hunting simpler and more effective
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Button 
              variant={activeTab === "jobSearch" ? "default" : "outline"} 
              onClick={() => setActiveTab("jobSearch")}
            >
              Job Search
            </Button>
            <Button 
              variant={activeTab === "resume" ? "default" : "outline"} 
              onClick={() => setActiveTab("resume")}
            >
              Resume Builder
            </Button>
            <Button 
              variant={activeTab === "interview" ? "default" : "outline"} 
              onClick={() => setActiveTab("interview")}
            >
              Interview Prep
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl overflow-hidden shadow-2xl border"
          >
            {activeTab === "jobSearch" && (
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1600" 
                alt="Job Search Platform" 
                className="w-full h-[500px] object-cover" 
              />
            )}
            {activeTab === "resume" && (
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600" 
                alt="Resume Builder" 
                className="w-full h-[500px] object-cover" 
              />
            )}
            {activeTab === "interview" && (
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=1600" 
                alt="Interview Preparation" 
                className="w-full h-[500px] object-cover" 
              />
            )}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 md:px-10 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Success stories from job seekers like you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="mb-4 text-4xl text-primary">"</div>
                    <p className="mb-6 italic">{testimonial.quote}</p>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-10 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Job Search?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of successful job seekers who found their dream jobs with EaslyApply
          </p>
          <Link to="/auth?signup=true">
            <Button size="lg" variant="secondary" className="gap-2">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-10 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="bg-primary rounded-md h-11 w-50 flex items-center justify-center">
                <img src="/images/LOGO-AI-CV.png" alt="LOGO-AI-CV" className="h-11 w-50" />
                {/* <span className="text-primary-foreground font-bold">JB</span> */}
              </div>
              {/* <span className="font-semibold">EaslyApply</span> */}
            </div>
            <div className="flex flex-wrap gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">About</a>
              <a href="#" className="hover:text-foreground">Features</a>
              <a href="#" className="hover:text-foreground">Pricing</a>
              <a href="#" className="hover:text-foreground">Blog</a>
              <a href="#" className="hover:text-foreground">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()}  All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
