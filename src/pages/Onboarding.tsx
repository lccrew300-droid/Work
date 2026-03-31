import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<Record<number, string>>({});
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 7) {
      setStep(step + 1);
    } else {
      navigate("/"); // Final redirect
    }
  };

  const selectOption = (opt: string) => {
    setSelections({ ...selections, [step]: opt });
  };

  const renderProgressDots = () => {
    if (step === 7) return null;
    return (
      <div className="flex gap-1.5 items-center">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div 
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === step ? "w-8 bg-blue-600" : i < step ? "w-4 bg-blue-400" : "w-4 bg-blue-100"
            }`}
          />
        ))}
      </div>
    );
  };

  const Step1 = () => (
    <div className="space-y-6">
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-10 leading-tight">Tell us about yourself</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em] font-mono">First Name</Label>
          <Input placeholder="John" className="h-12 border-slate-200 focus:border-blue-500 rounded-md" />
        </div>
        <div className="space-y-2">
          <Label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em] font-mono">Last Name</Label>
          <Input placeholder="Doe" className="h-12 border-slate-200 focus:border-blue-500 rounded-md" />
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em] font-mono">Organization Name</Label>
        <Input placeholder="CredentialPro" className="h-12 border-slate-200 focus:border-blue-500 rounded-md" />
      </div>
    </div>
  );

  const Step2 = () => (
    <div className="space-y-6">
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-10 leading-tight">What is your type of business?</h1>
      <div className="grid grid-cols-2 gap-3">
        {["Small business", "Medium business", "Enterprise", "Educational institution", "Government", "Association", "Non-profit/NGO", "Other"].map((opt) => (
          <button 
            key={opt} 
            onClick={() => selectOption(opt)} 
            className={`h-14 px-6 text-sm font-medium border rounded-lg transition-all text-left ${
              selections[step] === opt ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm shadow-blue-200" : "border-slate-200 hover:border-blue-500"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  const Step3 = () => (
    <div className="space-y-6">
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-10 leading-tight">What will you use credentials for?</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {[
          "Webinar", "Online event", "Offline event", "Graduation", "Online course", "Test or survey", 
          "Membership", "Achievement", "Conference", "Program or training", "Schoolchildren education", 
          "Product certification", "Corporate training", "Other"
        ].map((opt) => (
          <button 
            key={opt} 
            onClick={() => selectOption(opt)} 
            className={`h-14 px-4 text-xs font-medium border rounded-lg transition-all text-center ${
              selections[step] === opt ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm shadow-blue-200" : "border-slate-200 hover:border-blue-500"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  const Step4 = () => (
    <div className="space-y-6">
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-10 leading-tight">How many credentials do you need per year?</h1>
      <div className="space-y-3">
        {["Less than 100 credentials", "From 100 to 1,000 credentials", "From 1,000 to 10,000 credentials", "More than 10,000 credentials"].map((opt) => (
          <button 
            key={opt} 
            onClick={() => selectOption(opt)} 
            className={`w-full h-14 px-6 text-sm font-medium border rounded-lg transition-all text-left ${
              selections[step] === opt ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm shadow-blue-200" : "border-slate-200 hover:border-blue-500"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  const Step5 = () => (
    <div className="space-y-6">
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-10 leading-tight">How often do you need to issue credentials?</h1>
      <div className="space-y-3">
        {["Just once or occasionally", "A couple of times per year", "Every month or more often"].map((opt) => (
          <button 
            key={opt} 
            onClick={() => selectOption(opt)} 
            className={`w-full h-14 px-6 text-sm font-medium border rounded-lg transition-all text-left ${
              selections[step] === opt ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm shadow-blue-200" : "border-slate-200 hover:border-blue-500"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  const Step6 = () => (
    <div className="space-y-6">
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-10 leading-tight">What is your main objective in Certifier?</h1>
      <div className="space-y-3">
        {[
          "Save time & automate credential issuing process", 
          "Make my event look professional & memorable", 
          "Boost my marketing with the help of credentials", 
          "Help my graduates with employability"
        ].map((opt) => (
          <button 
            key={opt} 
            onClick={() => selectOption(opt)} 
            className={`w-full h-14 px-6 text-sm font-medium border rounded-lg transition-all text-left ${
              selections[step] === opt ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm shadow-blue-200" : "border-slate-200 hover:border-blue-500"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  const Step7 = () => (
    <div className="space-y-8 flex flex-col items-start translate-y-[-20px]">
       <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight font-display mb-2">Congratulations!</h1>
       <p className="text-xl font-medium text-slate-500 max-w-sm leading-relaxed mb-4">
         Now you are ready to step up your credential issuing workflow with CredentialPro 🔥
       </p>
       <Button 
         onClick={() => navigate("/dashboard")}
         size="lg" 
         className="h-14 px-10 bg-blue-600 hover:bg-blue-700 text-base font-bold rounded-lg shadow-xl shadow-blue-600/30 transition-all active:scale-95 text-white"
       >
         Welcome to CredentialPro
       </Button>
    </div>
  );

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Column: Form */}
      <div className="flex flex-col px-8 md:px-16 lg:px-24 py-10 bg-white relative">
        <div className="mb-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-black flex items-center justify-center">
              <span className="text-white font-bold text-sm">CP</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-black font-display">
              CredentialPro
            </span>
          </Link>
        </div>

        <div className="max-w-xl w-full mx-auto md:mx-0 flex flex-col flex-1 justify-center translate-y-[-40px]">
          {/* Progress Indicator */}
          {step < 7 && (
            <div className="flex items-center gap-3 mb-10">
              <span className="text-xs font-bold text-slate-500 font-mono tracking-widest uppercase">Step {step} out of 6</span>
              {renderProgressDots()}
            </div>
          )}

          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && <Step1 />}
                {step === 2 && <Step2 />}
                {step === 3 && <Step3 />}
                {step === 4 && <Step4 />}
                {step === 5 && <Step5 />}
                {step === 6 && <Step6 />}
                {step === 7 && <Step7 />}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10">
            {step < 7 && (
              <Button 
                onClick={handleNext}
                size="lg" 
                className="w-32 h-12 bg-blue-600 hover:bg-blue-700 text-base font-bold rounded-md shadow-lg shadow-blue-600/20 transition-all active:scale-95"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Visual Only */}
      <div className="hidden md:flex flex-col justify-between relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('/assets/collage.png')" }}
        />
        
        {/* Small floating chat icon */}
        <div className="absolute bottom-8 right-8 z-20">
          <div className="w-12 h-12 bg-white rounded-xl shadow-2xl flex items-center justify-center cursor-pointer transition-transform hover:scale-110">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-600" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
