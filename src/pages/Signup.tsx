import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Quote, CheckCircle2 } from "lucide-react";
import { useState, useMemo } from "react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/onboarding");
  };

  const validation = useMemo(() => {
    return {
      hasLength: password.length >= 8,
      hasLower: /[a-z]/.test(password),
      hasUpper: /[A-Z]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasNumber: /[0-9]/.test(password),
    };
  }, [password]);

  const passwordRequirements = [
    { label: "8 characters", met: validation.hasLength },
    { label: "Lower case", met: validation.hasLower },
    { label: "Upper case", met: validation.hasUpper },
    { label: "Special", met: validation.hasSpecial },
    { label: "Number", met: validation.hasNumber },
  ];

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Column: Form */}
      <div className="flex flex-col px-8 md:px-16 lg:px-24 py-10 bg-white relative">
        <div className="flex justify-between items-center mb-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-black flex items-center justify-center">
              <span className="text-white font-bold text-sm">CP</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-black font-display">
              CredentialPro
            </span>
          </Link>
          <Link to="/login" className="text-sm font-bold text-blue-600 hover:underline font-heading uppercase tracking-wide">
            Log in
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto flex flex-col mt-8 md:mt-16">
          <h1 className="text-4xl font-extrabold mb-3 text-slate-900 tracking-tight font-display">Create a free account</h1>
          <p className="text-slate-500 font-medium mb-10 leading-relaxed">
            Join over 2,000 companies who regularly use CredentialPro to automate their certificate issuing process.
          </p>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em] font-mono">Business Email</Label>
              <Input 
                id="email" 
                placeholder="john@acme.com" 
                type="email" 
                className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-md"
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em] font-mono">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="........"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-md pr-10 text-xl font-password"
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Password Requirements */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                {passwordRequirements.map((req) => (
                  <div 
                    key={req.label} 
                    className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${req.met ? "text-emerald-500" : "text-slate-400"}`}
                  >
                    <CheckCircle2 
                      size={12} 
                      className={`transition-colors duration-300 ${req.met ? "text-emerald-500 fill-emerald-50" : "text-slate-200"}`} 
                    />
                    {req.label}
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base font-bold rounded-md shadow-lg shadow-blue-600/20 mt-4 transition-all active:scale-[0.98]">
              Sign Up for Free
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[11px] font-bold uppercase tracking-widest text-slate-400">
              <span className="px-3 bg-white">or</span>
            </div>
          </div>

          <Button variant="outline" className="w-full h-12 border-slate-200 hover:bg-slate-50 font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98]">
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              alt="Google" 
              className="w-5 h-5" 
            />
            Sign up with Google
          </Button>

          <p className="mt-8 text-center text-[11px] font-medium text-slate-500 leading-relaxed uppercase tracking-wider">
            When signing up, you accept our <Link to="#" className="text-blue-600 font-bold hover:underline">Terms of Service</Link> and <Link to="#" className="text-blue-600 font-bold hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>

      <div className="hidden md:flex flex-col justify-center relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('/assets/collage.png')" }}
        />
        
        {/* Small floating chat icon (keeping for utility, remove if explicitly asked) */}
        <div className="absolute bottom-8 right-8 z-20">
          <div className="w-12 h-12 bg-white rounded-xl shadow-2xl flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-600" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
