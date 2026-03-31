import { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, 
  Plus, 
  Image as ImageIcon, 
  HelpCircle, 
  Info, 
  X,
  ChevronDown,
  ExternalLink,
  Zap,
  Globe,
  Award,
  BookOpen,
  Calendar,
  Clock,
  Star,
  FileBadge,
  Eye,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Sidebar from "@/components/dashboard/Sidebar";
import { Link, useNavigate } from "react-router-dom";

const CreateGroup = () => {
  const navigate = useNavigate();
  const [showIntroModal, setShowIntroModal] = useState(true);
  const [showDesignModal, setShowDesignModal] = useState(false);
  const [showNewDesignDropdown, setShowNewDesignDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("Info & Appearance");
  const [myDesigns, setMyDesigns] = useState<any[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<any>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('my_designs') || '[]');
    setMyDesigns(saved);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNewDesignDropdown(false);
      }
    };
    if (showNewDesignDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNewDesignDropdown]);

  const tabs = ["Info & Appearance", "Advanced Settings", "Email Settings"];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Navigation Header */}
        <header className="flex items-center justify-between px-8 py-3 bg-white border-b border-slate-200 sticky top-0 z-20">
          <div className="flex items-center gap-4 text-xs font-bold">
            <button 
               onClick={() => navigate('/groups')}
               className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors"
            >
               <ArrowLeft size={14} />
               Back
            </button>
            <span className="text-slate-200">/</span>
            <span className="text-slate-800">New Group</span>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="ghost" className="h-8 px-3 text-[10px] uppercase tracking-widest font-black text-slate-300 pointer-events-none">
                <Plus size={14} className="mr-1" /> Issue Credentials
             </Button>
             <Button variant="ghost" className="h-8 px-3 text-[10px] uppercase tracking-widest font-black text-slate-300 pointer-events-none">
                <Eye size={14} className="mr-1" /> Preview
             </Button>
             <Button className="h-8 px-4 bg-blue-600 hover:bg-blue-700 text-white text-[10px] uppercase font-black tracking-widest rounded-md shadow-md shadow-blue-600/10 transition-all active:scale-95">
                Create Group
             </Button>
          </div>
        </header>

        {/* Tabs Bar */}
        <div className="bg-white px-8 border-b border-slate-200">
           <div className="flex gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 text-xs font-bold transition-all relative ${
                    activeTab === tab ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              ))}
           </div>
        </div>

        {/* Form Area */}
        <div className="max-w-3xl mx-auto p-12 space-y-12 pb-32">
           {/* Name Section */}
           <section className="space-y-4">
              <div>
                 <label className="text-[13px] font-black text-slate-800 mb-1 block">
                    Name <span className="text-red-500">*</span>
                 </label>
                 <p className="text-[11px] text-slate-400 font-medium mb-3">
                    Specify the name of the occasion on which you would like to issue credentials.
                 </p>
                 <input 
                   type="text" 
                   placeholder="ex. Healthcare Webinar" 
                   className="w-full h-11 bg-white border border-slate-200 rounded-lg px-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-300 font-medium"
                 />
              </div>
           </section>

           {/* Appearance Section */}
           <section className="space-y-4">
              <div>
                 <label className="text-[13px] font-black text-slate-800 mb-1 block">
                    Appearance <span className="text-red-500">*</span>
                 </label>
                 <p className="text-[11px] text-slate-400 font-medium mb-4">
                    Attach a design to this group. A group may include one certificate and one badge.
                 </p>
                 <div 
                   onClick={() => setShowDesignModal(true)}
                   className={`w-full ${selectedDesign ? 'h-64' : 'h-48'} bg-slate-50 border-2 ${selectedDesign ? 'border-blue-200 bg-blue-50/20 shadow-inner' : 'border-dashed border-slate-200'} rounded-2xl flex flex-col items-center justify-center gap-3 group cursor-pointer hover:bg-slate-100/50 hover:border-slate-300 transition-all relative overflow-hidden`}
                 >
                    {selectedDesign ? (
                      <div className="w-full h-full p-8 flex flex-col items-center justify-center gap-4">
                         <div className={`w-64 h-40 ${selectedDesign.color} rounded-lg border-4 border-white shadow-xl flex flex-col items-center justify-center p-4 relative`}>
                            <FileBadge size={32} className="text-white/40 mb-2" />
                            <div className="w-2/3 h-2 bg-white/20 rounded-full mb-1" />
                            <div className="w-1/2 h-2 bg-white/20 rounded-full" />
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                               <Award size={12} className="text-white" />
                            </div>
                         </div>
                         <div className="text-center">
                            <p className="text-xs font-black text-slate-800 uppercase tracking-widest">{selectedDesign.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-1">{selectedDesign.orientation} Certificate</p>
                         </div>
                         <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md text-slate-400 hover:text-red-500 transition-all scale-0 group-hover:scale-100" onClick={(e) => { e.stopPropagation(); setSelectedDesign(null); }}>
                            <X size={14} />
                         </button>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-300 group-hover:text-blue-400 transition-colors">
                           <ImageIcon size={24} />
                        </div>
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-2">
                           <Plus size={14} />
                           Attach Design
                        </span>
                      </>
                    )}
                 </div>
              </div>
           </section>

           {/* Enhanced Details Section */}
           <section className="space-y-8 pt-4">
              <div className="border-t border-slate-100 pt-8">
                 <h3 className="text-sm font-black text-slate-800 mb-1">Enhanced Details</h3>
                 <p className="text-[11px] text-slate-400 font-medium">Add more details about your event, such as type, level, format, duration, price, and related skills.</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-700">Type</label>
                    <div className="h-10 w-full bg-white border border-slate-200 rounded-md px-3 flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                       <span>Select type</span>
                       <ChevronDown size={14} />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-700">Level</label>
                    <div className="h-10 w-full bg-white border border-slate-200 rounded-md px-3 flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                       <span>Select level</span>
                       <ChevronDown size={14} />
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-700">Format</label>
                    <div className="h-10 w-full bg-white border border-slate-200 rounded-md px-3 flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                       <span>Select format</span>
                       <ChevronDown size={14} />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-700">Duration</label>
                    <div className="flex gap-2">
                       <input type="number" placeholder="0" className="w-16 h-10 bg-white border border-slate-200 rounded-md px-3 text-xs outline-none text-center" />
                       <div className="h-10 flex-1 bg-white border border-slate-200 rounded-md px-3 flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                          <span>Select time frame</span>
                          <ChevronDown size={14} />
                       </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[11px] font-bold text-slate-700">Price</label>
                 <div className="h-10 w-full bg-white border border-slate-200 rounded-md px-3 flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                    <span>Select price</span>
                    <ChevronDown size={14} />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                    Skills <HelpCircle size={12} className="text-slate-300" />
                 </label>
                 <input 
                    type="text" 
                    placeholder="Start typing skill name..." 
                    className="w-full h-10 bg-white border border-slate-200 rounded-md px-3 text-xs outline-none focus:ring-1 focus:ring-blue-100" 
                 />
              </div>
           </section>

           {/* About Section */}
           <section className="space-y-8 pt-8">
              <div className="border-t border-slate-100 pt-8">
                 <h3 className="text-sm font-black text-slate-800 mb-1">About</h3>
                 <p className="text-[11px] text-slate-400 font-medium">Add a detailed description of your event and a link to its website.</p>
              </div>

              <div className="space-y-2">
                 <label className="text-[11px] font-bold text-slate-700 flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5">Description <HelpCircle size={12} className="text-slate-300" /></div>
                    <span className="text-[9px] font-black uppercase text-slate-300 flex items-center gap-1"><BookOpen size={10} /> Supports Markdown</span>
                 </label>
                 <textarea 
                    placeholder="ex. The holder of this badge attended ACME's Healthcare Webinar dedicated to the impact of political decisions on healthcare." 
                    className="w-full h-32 bg-white border border-slate-200 rounded-md p-4 text-xs outline-none focus:ring-1 focus:ring-blue-100 resize-none font-medium text-slate-600 placeholder:text-slate-300" 
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                    Learning Event Link <HelpCircle size={12} className="text-slate-300" />
                 </label>
                 <input 
                    type="text" 
                    placeholder="https://your-learning-event" 
                    className="w-full h-10 bg-white border border-slate-200 rounded-md px-3 text-xs outline-none focus:ring-1 focus:ring-blue-100" 
                 />
              </div>
           </section>

           {/* Earning Criteria Section */}
           <section className="space-y-8 pt-8 px-1">
              <div className="border-t border-slate-100 pt-8">
                 <h3 className="text-sm font-black text-slate-800 mb-1">Earning Criteria</h3>
                 <p className="text-[11px] text-slate-400 font-medium">Add an earning criteria to showcase the specific requirements to earn this award.</p>
              </div>
              <button className="flex items-center gap-2 text-[11px] font-black text-slate-700 hover:text-blue-600 transition-colors">
                 <div className="w-5 h-5 rounded-full border-2 border-slate-200 flex items-center justify-center">
                    <Plus size={12} />
                 </div>
                 Add Earning Criteria
              </button>
           </section>

           <div className="pt-12 border-t border-slate-100 flex justify-start">
              <Button className="h-10 px-8 bg-blue-600 hover:bg-blue-700 text-white text-[11px] uppercase font-black tracking-widest rounded-md shadow-md shadow-blue-600/10 transition-all active:scale-95">
                 Create Group
              </Button>
           </div>
        </div>

        {/* Intro Modal Overlay */}
        {showIntroModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all duration-300 overflow-hidden">
             <div className="bg-white rounded-[32px] w-full max-w-4xl h-[520px] flex overflow-hidden shadow-2xl relative animate-in zoom-in fade-in duration-300">
                <button 
                  onClick={() => setShowIntroModal(false)}
                  className="absolute top-6 right-6 p-2 text-slate-300 hover:text-slate-500 hover:bg-slate-50 rounded-full transition-all z-10"
                >
                   <X size={20} />
                </button>

                {/* Left Content Side */}
                <div className="w-[45%] p-12 flex flex-col justify-center">
                   <div className="bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-1 rounded w-fit mb-6">Info</div>
                   <h2 className="text-4xl font-extrabold text-slate-900 font-display mb-6 tracking-tight leading-tight">What is a Group?</h2>
                   <p className="text-slate-600 text-[15px] font-medium leading-relaxed mb-10">
                      A group includes your <span className="font-extrabold text-slate-900">credential details and settings</span> — name, design, description, and advanced options like expiration management and recipient permissions.
                   </p>
                   <button 
                      onClick={() => setShowIntroModal(false)}
                      className="w-fit bg-black text-white font-extrabold text-sm px-8 py-3.5 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10"
                   >
                      Got It, Thanks!
                   </button>
                </div>

                {/* Right Image/Graphic Side */}
                <div className="flex-1 bg-[#f0f9ff] flex items-center justify-center relative p-8">
                   {/* Background Decorations */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/40 rounded-full blur-3xl" />
                   
                   {/* The Graphic Mockup */}
                   <div className="w-full bg-white rounded-3xl shadow-2xl p-6 relative z-10 space-y-6 max-w-sm rotate-[-1deg]">
                      {/* KPI row mockup */}
                      <div className="grid grid-cols-3 gap-3">
                         <div className="border border-slate-100 rounded-xl p-3 bg-white space-y-1">
                            <BookOpen size={14} className="text-blue-500" />
                            <div className="text-[8px] font-bold text-slate-400 uppercase">Type</div>
                            <div className="text-[10px] font-bold text-slate-800">Course</div>
                         </div>
                         <div className="border border-slate-100 rounded-xl p-3 bg-white space-y-1">
                            <Star size={14} className="text-blue-500" />
                            <div className="text-[8px] font-bold text-slate-400 uppercase">Level</div>
                            <div className="text-[10px] font-bold text-slate-800">Professional</div>
                         </div>
                         <div className="border border-slate-100 rounded-xl p-3 bg-white space-y-1">
                            <Globe size={14} className="text-blue-500" />
                            <div className="text-[8px] font-bold text-slate-400 uppercase">Format</div>
                            <div className="text-[10px] font-bold text-slate-800">Online</div>
                         </div>
                      </div>

                      {/* Skills row mockup */}
                      <div className="p-4 border border-slate-100 rounded-2xl bg-white space-y-3">
                         <div className="text-[9px] font-bold text-slate-400 uppercase">Skills</div>
                         <div className="flex flex-wrap gap-2">
                            <div className="bg-slate-50 border border-slate-100 rounded-full px-2 py-1 text-[8px] font-bold text-slate-500">Custom Engine Development</div>
                            <div className="bg-slate-50 border border-slate-100 rounded-full px-2 py-1 text-[8px] font-bold text-slate-500">Advanced Optimization</div>
                         </div>
                      </div>

                      {/* Criteria mockup */}
                      <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl space-y-3">
                         <div className="text-[9px] font-bold text-slate-400 uppercase">Earning Criteria</div>
                         <div className="flex items-start gap-2">
                            <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                               <CheckCircle2 size={10} className="text-blue-600" />
                            </div>
                            <div className="text-[10px] font-medium text-slate-600 italic">Watching 10 hours of pre-recorded video tutorials.</div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* Attach Design Modal */}
        {showDesignModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
             <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative animate-in zoom-in duration-300">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/20">
                   <div>
                      <h2 className="text-lg font-extrabold text-slate-900 font-display">Select the design(s) you want to attach to the group</h2>
                      <p className="text-[11px] text-slate-400 font-medium tracking-tight">A group may include one certificate and one badge.</p>
                   </div>
                   <div className="flex items-center gap-2">
                       <div className="relative" ref={dropdownRef}>
                          <Button 
                            onClick={() => setShowNewDesignDropdown(!showNewDesignDropdown)}
                            className="h-9 px-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold flex items-center gap-2 text-[11px] rounded-lg shadow-sm transition-all"
                          >
                             <Plus size={14} />
                             Create New Design
                          </Button>

                          {/* New Design Dropdown */}
                          {showNewDesignDropdown && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-2xl py-1.5 z-[115] animate-in slide-in-from-top-2 duration-200 ring-4 ring-slate-900/5">
                               <button 
                                  onClick={() => { navigate('/designs/new'); setShowDesignModal(false); }}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors text-left"
                               >
                                  <FileBadge size={16} className="text-blue-500" />
                                  Certificate
                               </button>
                               <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors text-left opacity-40">
                                  <Award size={16} className="text-amber-500" />
                                  Badge
                               </button>
                            </div>
                          )}
                       </div>
                       <div className="w-px h-6 bg-slate-200 mx-1" />
                       <button 
                         onClick={() => { setShowDesignModal(false); setShowNewDesignDropdown(false); }}
                         className="p-2 text-slate-300 hover:text-slate-500 hover:bg-slate-100 rounded-full transition-all"
                       >
                          <X size={20} />
                       </button>
                   </div>
                </div>

                <div className="p-10 flex flex-col items-center justify-center text-center overflow-y-auto max-h-[60vh] custom-scrollbar">
                   {myDesigns.length === 0 ? (
                      <div className="py-10 flex flex-col items-center">
                        <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mb-10 opacity-60">
                           <ImageIcon size={48} className="text-blue-500" />
                        </div>
                        <p className="text-xs text-slate-400 font-medium max-w-[280px] leading-relaxed mb-8">
                           You don't have any designs yet. Please create your first design to add it to the group.
                        </p>
                      </div>
                   ) : (
                      <div className="w-full grid grid-cols-2 gap-6 p-1">
                         {myDesigns.map((design) => (
                            <div 
                               key={design.id}
                               onClick={() => { setSelectedDesign(design); setShowDesignModal(false); }}
                               className={`p-4 border-2 rounded-2xl transition-all cursor-pointer group/design relative ${
                                  selectedDesign?.id === design.id ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-600/5'
                               }`}
                            >
                               <div className={`aspect-[4/3] w-full rounded-xl ${design.color} mb-4 shadow-sm flex items-center justify-center relative overflow-hidden group-hover/design:scale-[1.02] transition-transform`}>
                                  {design.bgImage && (
                                     <img src={design.bgImage} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                                  )}
                                  <div className="w-full h-full border-4 border-white/30 rounded-xl m-3 flex flex-col items-center justify-center relative z-10">
                                     <FileBadge size={28} className="text-white/20 mb-2" />
                                     <div className="w-1/2 h-1.5 bg-white/20 rounded-full mb-1" />
                                     <div className="w-1/3 h-1.5 bg-white/20 rounded-full" />
                                  </div>
                                  
                                  {selectedDesign?.id === design.id && (
                                     <div className="absolute top-3 right-3 bg-blue-600 text-white rounded-full p-1.5 shadow-lg z-20">
                                        <CheckCircle2 size={12} />
                                     </div>
                                  )}
                               </div>
                               <div className="text-left px-1 flex items-center justify-between">
                                  <div className="min-w-0">
                                     <p className="text-[11px] font-black text-slate-800 uppercase truncate tracking-tight">{design.name}</p>
                                     <p className="text-[9px] font-bold text-slate-400 mt-0.5 tracking-widest">{design.orientation} Certificate</p>
                                  </div>
                               </div>
                            </div>
                         ))}
                      </div>
                   )}
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CreateGroup;
