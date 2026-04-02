import { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, Plus, Image as ImageIcon, HelpCircle, X, ChevronDown, Award, BookOpen, Star, Globe, Clock, CheckCircle2, FileBadge, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/dashboard/Sidebar";
import { useNavigate } from "react-router-dom";
import { db } from "@/lib/firebase";
import { ref, push, set, serverTimestamp } from "firebase/database";
import { toast } from "sonner";

const CreateGroup = () => {
  const navigate = useNavigate();
  const [showIntroModal, setShowIntroModal] = useState(true);
  const [showDesignModal, setShowDesignModal] = useState(false);
  const [showNewDesignDropdown, setShowNewDesignDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("Info & Appearance");
  const [myDesigns, setMyDesigns] = useState<any[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<any>(null);
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleCreateGroup = async () => {
    if (!groupName || !selectedDesign) {
      toast.error("Please provide group name and design");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const groupsRef = ref(db, 'groups');
      const newGroupRef = push(groupsRef);
      
      await set(newGroupRef, {
        name: groupName,
        description: description,
        designId: selectedDesign.id,
        designDetails: {
          color: selectedDesign.color,
          orientation: selectedDesign.orientation,
          name: selectedDesign.name,
          bgImage: selectedDesign.bgImage
        },
        members: {},
        createdAt: serverTimestamp(),
      });
      
      toast.success("Group created successfully!");
      navigate('/groups');
    } catch (error: any) {
      toast.error("Error creating group: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
               <ArrowLeft size={14} /> Back
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
             <Button 
                onClick={handleCreateGroup}
                disabled={isSubmitting}
                className="h-8 px-4 bg-blue-600 hover:bg-blue-700 text-white text-[10px] uppercase font-black tracking-widest rounded-md shadow-md shadow-blue-600/10 transition-all active:scale-95 disabled:opacity-50"
             >
                {isSubmitting ? "Creating..." : "Create Group"}
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
           {/* Info Section */}
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
                   value={groupName}
                   onChange={(e) => setGroupName(e.target.value)}
                   className="w-full h-11 bg-white border border-slate-200 rounded-lg px-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-300 font-medium"
                 />
              </div>
           </section>

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
                      <div className="w-full h-full p-8 flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in duration-300">
                         <div className={`w-64 h-40 ${selectedDesign.color} rounded-lg border-4 border-white shadow-xl flex flex-col items-center justify-center p-4 relative`}>
                            <FileBadge size={32} className="text-white/40 mb-2" />
                            <div className="w-1/2 h-2 bg-white/20 rounded-full mb-1" />
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"><Award size={12} className="text-white" /></div>
                         </div>
                         <div className="text-center">
                            <p className="text-xs font-black text-slate-800 uppercase tracking-widest">{selectedDesign.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-1">{selectedDesign.orientation} Certificate</p>
                         </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-300 group-hover:text-blue-400 transition-colors"><ImageIcon size={24} /></div>
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-2"><Plus size={14} /> Attach Design</span>
                      </>
                    )}
                 </div>
              </div>
           </section>

           <section className="space-y-8 pt-4">
              <div className="border-t border-slate-100 pt-8">
                 <h3 className="text-sm font-black text-slate-800 mb-1">Enhanced Details</h3>
                 <p className="text-[11px] text-slate-400 font-medium">Add more details about your event, such as type, level, format, duration, price, and related skills.</p>
              </div>

              <div className="grid grid-cols-2 gap-6 opacity-60 pointer-events-none">
                 <div className="space-y-2"><label className="text-[11px] font-bold text-slate-700">Type</label><div className="h-10 w-full bg-white border border-slate-200 rounded-md px-3 flex items-center justify-between text-xs text-slate-300"><span>Select type</span><ChevronDown size={14} /></div></div>
                 <div className="space-y-2"><label className="text-[11px] font-bold text-slate-700">Level</label><div className="h-10 w-full bg-white border border-slate-200 rounded-md px-3 flex items-center justify-between text-xs text-slate-300"><span>Select level</span><ChevronDown size={14} /></div></div>
              </div>

              <div className="space-y-2">
                 <label className="text-[13px] font-black text-slate-800 mb-1 block">About</label>
                 <textarea 
                    placeholder="Write group description..." 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-32 bg-white border border-slate-200 rounded-md p-4 text-xs outline-none focus:ring-1 focus:ring-blue-100 resize-none font-medium text-slate-600" 
                 />
              </div>
           </section>

           <div className="pt-12 border-t border-slate-100 flex justify-start">
              <Button onClick={handleCreateGroup} disabled={isSubmitting} className="h-10 px-8 bg-blue-600 hover:bg-blue-700 text-white text-[11px] uppercase font-black tracking-widest rounded-md shadow-md shadow-blue-600/10 transition-all active:scale-95 disabled:opacity-50">
                {isSubmitting ? "Creating..." : "Create Group"}
              </Button>
           </div>
        </div>

        {/* Intro Modal Overlay - Restored original graphic design */}
        {showIntroModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-hidden animate-in fade-in duration-300">
             <div className="bg-white rounded-[32px] w-full max-w-4xl h-[520px] flex overflow-hidden shadow-2xl relative">
                <button onClick={() => setShowIntroModal(false)} className="absolute top-6 right-6 p-2 text-slate-300"><X size={20}/></button>
                <div className="w-[45%] p-12 flex flex-col justify-center">
                   <h2 className="text-4xl font-extrabold text-slate-900 font-display mb-6 tracking-tight leading-tight">What is a Group?</h2>
                   <p className="text-slate-600 text-[15px] font-medium leading-relaxed mb-10">A group includes your credential details and settings — name, design, description, and advanced options.</p>
                   <button onClick={() => setShowIntroModal(false)} className="w-fit bg-black text-white font-extrabold shadow-xl shadow-black/10 text-sm px-8 py-3.5 rounded-xl transition-all">Got It, Thanks!</button>
                </div>
                <div className="flex-1 bg-[#f0f9ff] flex items-center justify-center relative p-8">
                   <div className="w-full bg-white rounded-3xl shadow-2xl p-6 relative z-10 space-y-6 max-w-sm rotate-[-1deg]">
                      <div className="grid grid-cols-3 gap-3"><div className="border border-slate-100 rounded-xl p-3 bg-white space-y-1"><BookOpen size={14} className="text-blue-500" /><div className="text-[8px] font-bold text-slate-400 uppercase">Type</div><div className="text-[10px] font-bold text-slate-800">Course</div></div><div className="border border-slate-100 rounded-xl p-3 bg-white space-y-1"><Star size={14} className="text-blue-500" /><div className="text-[8px] font-bold text-slate-400 uppercase">Level</div><div className="text-[10px] font-bold text-slate-800">Professional</div></div><div className="border border-slate-100 rounded-xl p-3 bg-white space-y-1"><Globe size={14} className="text-blue-500" /><div className="text-[8px] font-bold text-slate-400 uppercase">Format</div><div className="text-[10px] font-bold text-slate-800">Online</div></div></div>
                      <div className="p-4 border border-slate-100 rounded-2xl bg-white space-y-3"><div className="text-[9px] font-bold text-slate-400 uppercase">Skills</div><div className="flex flex-wrap gap-2"><div className="bg-slate-50 border border-slate-100 rounded-full px-2 py-1 text-[8px] font-bold text-slate-500">Custom Engine</div><div className="bg-slate-50 border border-slate-100 rounded-full px-2 py-1 text-[8px] font-bold text-slate-500">Optimization</div></div></div>
                      <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-3"><div className="text-[9px] font-bold text-slate-400 uppercase">Criteria</div><div className="flex items-start gap-2"><CheckCircle2 size={10} className="text-blue-600 mt-0.5" /><div className="text-[10px] font-medium text-slate-600 italic">Watching 10 hours...</div></div></div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* Attach Design Modal - Restored original selection view */}
        {showDesignModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
             <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                   <h2 className="text-lg font-extrabold text-slate-900">Select the design for this group</h2>
                   <X className="cursor-pointer text-slate-300" onClick={() => setShowDesignModal(false)} />
                </div>
                <div className="p-10 grid grid-cols-2 gap-6 overflow-y-auto max-h-[60vh]">
                   {myDesigns.map((design) => (
                      <div key={design.id} onClick={() => { setSelectedDesign(design); setShowDesignModal(false); }} className={`p-4 border-2 rounded-2xl transition-all cursor-pointer ${selectedDesign?.id === design.id ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 hover:border-blue-200'}`}>
                         <div className={`aspect-video w-full rounded-xl ${design.color} mb-4 shadow-sm flex items-center justify-center`} />
                         <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight">{design.name}</p>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CreateGroup;
