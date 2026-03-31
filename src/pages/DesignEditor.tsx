import { useState, useRef, useEffect } from "react";
import { 
  ArrowLeft, 
  ChevronDown, 
  Plus, 
  Eye, 
  Image as ImageIcon, 
  Type, 
  Layers, 
  QrCode, 
  Settings, 
  Layout, 
  Upload, 
  Smile, 
  Download,
  X,
  FileBadge,
  Maximize2,
  Minimize2,
  Undo2,
  Redo2,
  ChevronRight,
  User,
  Calendar,
  Lock,
  RefreshCw,
  Search,
  Award,
  Star,
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";

const DesignEditor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editId = location.state?.editId;

  const [activeSidebar, setActiveSidebar] = useState("Templates");
  const [orientation, setOrientation] = useState("Landscape");
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [designName, setDesignName] = useState("My design #1");
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [recipientName, setRecipientName] = useState("[recipient.name]");
  const [sig1, setSig1] = useState("Simon Blake");
  const [sig2, setSig2] = useState("Sadie Coleman");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editId) {
      const saved = JSON.parse(localStorage.getItem('my_designs') || '[]');
      const design = saved.find((d: any) => d.id === editId);
      if (design) {
        setDesignName(design.name);
        setOrientation(design.orientation);
        setBgImage(design.bgImage);
        setRecipientName(design.recipientName || "[recipient.name]");
        setSig1(design.sig1 || "Simon Blake");
        setSig2(design.sig2 || "Sadie Coleman");
        
        // Find template index by title
        const idx = templates.findIndex(t => t.title === design.template);
        if (idx !== -1) setSelectedTemplate(idx);
      }
    }
  }, [editId]);

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const sidebarIcons = [
    { id: "Templates", icon: Layout },
    { id: "Uploads", icon: Upload },
    { id: "Elements", icon: Smile },
    { id: "Text", icon: Type },
    { id: "Attributes", icon: User },
    { id: "QR Codes", icon: QrCode },
    { id: "Layers", icon: Layers },
  ];

  const templates = [
    { id: 0, title: "Certificate of Completion", color: "bg-blue-600" },
    { id: 1, title: "Diploma in Communication", color: "bg-slate-900" },
    { id: 2, title: "Course Completion", color: "bg-emerald-600" },
    { id: 3, title: "Achievement Award", color: "bg-amber-600" },
    { id: 4, title: "Training Certification", color: "bg-indigo-600" },
    { id: 5, title: "Excellence Award", color: "bg-rose-600" },
  ];

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans">
      {/* Standard Sidebar */}
      <Sidebar />

      {/* Editor Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Editor Top Bar */}
        <header className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-6 z-30 shrink-0">
          <div className="flex items-center gap-4">
             <button 
               onClick={() => navigate(-1)}
               className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400"
             >
                <ArrowLeft size={18} />
             </button>
             <div className="h-4 w-px bg-slate-200" />
             <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <input 
                  value={designName}
                  onChange={(e) => setDesignName(e.target.value)}
                  className="bg-transparent border-none outline-none text-[13px] font-bold text-slate-700 w-32"
                />
             </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-0.5 mr-4">
                <button className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-400 opacity-40"><Undo2 size={16} /></button>
                <button className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-400 opacity-40"><Redo2 size={16} /></button>
             </div>
             <Button 
               onClick={() => setShowPreview(true)}
               variant="outline" 
               className="h-8 px-4 border-slate-200 text-slate-600 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-2 hover:bg-slate-50 shadow-sm"
             >
                <Eye size={14} /> Preview
             </Button>

             <Button 
                onClick={() => {
                   const newDesign = {
                      id: editId || Date.now(),
                      name: designName,
                      orientation: orientation,
                      template: templates[selectedTemplate].title,
                      color: templates[selectedTemplate].color,
                      bgImage: bgImage,
                      recipientName,
                      sig1,
                      sig2,
                      updatedAt: new Date().toISOString()
                   };
                   
                   let saved = JSON.parse(localStorage.getItem('my_designs') || '[]');
                   if (editId) {
                      saved = saved.map((d: any) => d.id === editId ? newDesign : d);
                   } else {
                      saved.push(newDesign);
                   }
                   localStorage.setItem('my_designs', JSON.stringify(saved));
                   
                   // Navigate back
                   navigate(-1);
                }}
                className="h-8 px-5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black uppercase tracking-widest rounded-md shadow-lg shadow-blue-600/20 active:scale-95 transition-all flex items-center gap-2"
             >
                {editId ? "Update Design" : "Create Design"}
             </Button>
          </div>
        </header>

        {/* Editor Workspace */}
        <div className="flex-1 flex overflow-hidden">
           {/* Design Sidebar (Icons) */}
           <div className="w-[72px] border-r border-slate-200 bg-white flex flex-col items-center py-4 gap-4 shrink-0 overflow-y-auto">
              {sidebarIcons.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setActiveSidebar(item.id)}
                  className={`flex flex-col items-center gap-1 group w-full py-2 transition-all relative ${
                    activeSidebar === item.id ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                   {activeSidebar === item.id && <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-blue-600 rounded-r-full" />}
                   <item.icon size={20} className={`transition-transform group-active:scale-90 ${activeSidebar === item.id ? "fill-blue-50" : ""}`} />
                   <span className="text-[10px] font-bold tracking-tight">{item.id}</span>
                </button>
              ))}
           </div>

           {/* Inner Panel (Templates/Elements) */}
           <div className="w-80 border-r border-slate-200 bg-white flex flex-col shrink-0">
              <div className="p-4 border-b border-slate-200">
                 <div className="flex bg-slate-50 p-1 rounded-xl">
                    <button 
                      onClick={() => setOrientation("Landscape")}
                      className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                        orientation === "Landscape" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      Landscape
                    </button>
                    <button 
                      onClick={() => setOrientation("Portrait")}
                      className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                        orientation === "Portrait" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      Portrait
                    </button>
                 </div>
              </div>

              <div className="p-4 bg-slate-50/30 border-b border-slate-100 flex items-center justify-between">
                 <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <Layout size={12} /> Category
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="text-[10px] font-bold text-blue-600 cursor-pointer">Clear All</div>
                    <Search size={14} className="text-slate-300" />
                 </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 aspect-[4/3] border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 group cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                       <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-300 group-hover:text-blue-500 group-hover:scale-110 transition-all">
                          <Plus size={20} />
                       </div>
                       <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-600">Blank Layout</span>
                    </div>

                    {templates.map((tpl, i) => (
                      <div 
                        key={tpl.id}
                        onClick={() => setSelectedTemplate(tpl.id)}
                        className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all cursor-pointer hover:shadow-lg relative group ${
                          selectedTemplate === tpl.id ? "border-blue-600 ring-4 ring-blue-50 scale-[0.98]" : "border-slate-100 hover:border-slate-300"
                        }`}
                      >
                         <div className={`w-full h-full ${tpl.color} opacity-80 flex flex-col justify-end p-2`}>
                            <div className="w-full h-1 bg-white/20 rounded-full mb-1" />
                            <div className="w-2/3 h-1 bg-white/20 rounded-full" />
                         </div>
                         <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                         <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-md px-2 py-1 rounded text-[8px] font-black uppercase text-slate-700 truncate shadow-sm">
                            {tpl.title}
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Central Canvas Area */}
           <div className="flex-1 bg-slate-50 flex flex-col overflow-hidden">
              {/* Canvas Controls */}
              <div className="h-12 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
                 <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleBgUpload} 
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                    >
                       <ImageIcon size={14} /> {bgImage ? "Change Background" : "Add Background Image"}
                    </button>
                    {bgImage && (
                       <button onClick={() => setBgImage(null)} className="text-red-500 hover:text-red-600">Remove</button>
                    )}
                    <div className="h-4 w-px bg-slate-200 mx-2" />
                    <div className="flex items-center gap-1 group cursor-pointer hover:text-slate-800">
                       Paper Size: <span className="bg-slate-100 px-2 py-0.5 rounded uppercase">A4</span>
                       <ChevronDown size={14} />
                    </div>
                 </div>

                 <div className="flex items-center gap-3">
                    <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
                       <button className="p-1 px-2 text-[10px] font-bold text-slate-500 hover:bg-white rounded transition-all">80%</button>
                       <button className="p-1.5 hover:bg-white rounded text-slate-500"><Maximize2 size={12} /></button>
                    </div>
                 </div>
              </div>

              {/* The Actual Canvas Workspace */}
              <div className="flex-1 overflow-auto p-12 flex justify-center items-start custom-scrollbar">
                 <div className="relative group/canvas scale-[1.1] origin-top">
                    {/* Shadow Layer */}
                    <div className="absolute inset-0 translate-x-4 translate-y-4 bg-slate-900/5 blur-3xl -z-10 rounded-[32px]" />
                    
                    {/* The Certificate Paper */}
                    <div className="w-[842px] h-[595px] bg-white rounded-md border border-blue-100 shadow-2xl relative overflow-hidden flex flex-col p-16 animate-in zoom-in duration-500">
                       {/* Background Layer */}
                       {bgImage ? (
                          <img src={bgImage} className="absolute inset-0 w-full h-full object-cover opacity-80" alt="Background" />
                       ) : (
                          <>
                             <div className="absolute top-0 left-0 w-64 h-64 bg-slate-50/50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                             <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-50/50 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
                          </>
                       )}
                       
                       {/* Design Content Mockup */}
                       <div className="flex justify-between items-start mb-16 relative z-10">
                          <div className="flex items-center gap-3">
                             <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center text-white text-[10px] font-black uppercase tracking-tighter">Your Logo</div>
                             <div className="h-6 w-px bg-slate-200" />
                             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Credential ID: #392-DK2</div>
                          </div>
                          <div className="text-right">
                             <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-1 italic">Issued By</h4>
                             <p className="text-[11px] font-bold text-slate-400">{designName}</p>
                          </div>
                       </div>

                       <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10">
                          <div className="mb-8 w-full">
                             <h1 className="text-5xl font-black text-slate-900 font-display mb-4 tracking-[-0.03em]">{templates[selectedTemplate].title}</h1>
                             <div className="flex items-center gap-4 py-4 px-8 bg-slate-50/80 backdrop-blur-sm border border-slate-100 rounded-2xl mx-auto w-fit shadow-inner group/input relative">
                                <input 
                                   value={recipientName}
                                   onChange={(e) => setRecipientName(e.target.value)}
                                   className="text-3xl font-black text-blue-600 font-display tracking-tight bg-transparent text-center outline-none border-b border-transparent focus:border-blue-200 min-w-[300px]"
                                />
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/input:opacity-100 transition-opacity text-[10px] font-bold text-blue-400 uppercase tracking-widest whitespace-nowrap">
                                   Click to Edit Recipient Label
                                </div>
                             </div>
                          </div>

                          <div className="w-[480px] space-y-4">
                             <p className="text-sm font-medium text-slate-500 leading-relaxed">
                                Has successfully completed the requirements for the professional certification program and demonstrated excellence in the subject matter.
                             </p>
                             <div className="w-24 h-0.5 bg-blue-600/20 mx-auto rounded-full" />
                          </div>
                       </div>

                       <div className="flex justify-between items-end relative z-10 pt-16 mt-auto">
                          <div className="flex flex-col gap-2 items-center group/sig">
                             <input 
                                value={sig1}
                                onChange={(e) => setSig1(e.target.value)}
                                className="w-40 border-b-2 border-slate-900 bg-transparent text-center text-xs font-serif italic text-slate-400 outline-none pb-1 focus:text-slate-800 transition-colors"
                             />
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Managing Director</span>
                          </div>

                          <div className="w-24 h-24 bg-amber-50 rounded-full border-4 border-white shadow-xl flex items-center justify-center relative overflow-hidden group/seal">
                             <div className="absolute inset-0 border-4 border-amber-200/50 rounded-full border-dashed animate-spin-slow opacity-0 group-hover/seal:opacity-100 transition-opacity" />
                             <Award size={48} className="text-amber-500 fill-amber-100" />
                             <div className="absolute bottom-1 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <Star size={8} className="text-amber-500 fill-amber-500" />
                             </div>
                          </div>

                          <div className="flex flex-col gap-2 items-center group/sig">
                             <input 
                                value={sig2}
                                onChange={(e) => setSig2(e.target.value)}
                                className="w-40 border-b-2 border-slate-900 bg-transparent text-center text-xs font-serif italic text-slate-400 outline-none pb-1 focus:text-slate-800 transition-colors"
                             />
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Academic Dean</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Global Footer Controls */}
        <footer className="h-10 bg-white border-t border-slate-200 px-6 flex items-center justify-between z-30 relative shrink-0">
           <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400">
              <span className="flex items-center gap-1.5 text-blue-600"><CheckCircle2 size={12} /> Saved Automatically</span>
              <span className="flex items-center gap-1.5"><HelpCircle size={12} /> Keyboard Shortcuts</span>
           </div>
           <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              A4 Landscape | 24 MB | v1.0.4
           </div>
        </footer>

        {/* Preview Modal Overlay */}
        {showPreview && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
             <div className="bg-white rounded-[32px] w-full max-w-5xl h-[640px] flex overflow-hidden shadow-2xl relative animate-in zoom-in duration-300">
                <button 
                  onClick={() => setShowPreview(false)}
                  className="absolute top-8 right-8 p-2 text-slate-300 hover:text-slate-500 hover:bg-slate-50 rounded-full transition-all z-20"
                >
                   <X size={24} />
                </button>

                {/* Left Form View (Preview Settings) */}
                <div className="w-80 border-r border-slate-100 p-10 flex flex-col gap-8 flex-shrink-0 bg-slate-50/30">
                   <div>
                      <h2 className="text-xl font-extrabold text-slate-900 font-display mb-2">Preview your credential design</h2>
                      <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                         See how real data populates the dynamic attribute placeholders to ensure your design looks perfect after issuance. <span className="text-blue-600 cursor-pointer">Learn More</span>
                      </p>
                   </div>

                   <div className="space-y-6 flex-1">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-700">Recipient Name</label>
                        <input 
                           type="text" 
                           defaultValue="Johnathan Alexander" 
                           className="w-full h-10 bg-white border border-slate-100 rounded-lg px-3 text-xs font-bold text-slate-600 transition-all focus:ring-2 focus:ring-blue-100 outline-none shadow-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-700">Certificate UUID</label>
                        <div className="relative">
                           <input 
                              type="text" 
                              defaultValue="8c2e8bcd-113e-41f5-9676-fe2acdc88714" 
                              readOnly
                              className="w-full h-10 bg-slate-100/50 border border-slate-100 rounded-lg px-3 pr-10 text-[10px] font-mono text-slate-400 outline-none"
                           />
                           <Lock size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-700">Issued On</label>
                        <div className="relative">
                           <input 
                              type="date" 
                              defaultValue="2026-03-31" 
                              className="w-full h-10 bg-white border border-slate-100 rounded-lg px-3 text-xs font-bold text-slate-600 outline-none"
                           />
                           <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                        </div>
                      </div>
                   </div>

                   <div className="space-y-4 pt-10 border-t border-slate-100">
                      <button className="flex items-center gap-2 text-[11px] font-bold text-slate-400 hover:text-blue-600 transition-colors">
                         <RefreshCw size={14} /> Reset to Default Data
                      </button>
                      <Button 
                         onClick={() => setShowPreview(false)}
                         variant="outline" 
                         className="w-full h-11 border-slate-200 text-slate-700 font-extrabold rounded-xl"
                      >
                         Close Preview
                      </Button>
                   </div>
                </div>

                {/* Right Realistic Mockup View */}
                <div className="flex-1 bg-[#f8fbff] flex items-center justify-center p-12 overflow-hidden">
                   <div className="relative scale-[0.65] origin-center">
                      {/* Shadow for realism */}
                      <div className="absolute inset-0 translate-x-8 translate-y-8 bg-slate-900/10 blur-[80px] -z-10 rounded-[48px]" />
                      
                      {/* The Certificate Paper (Miniaturised for Preview) */}
                      <div className="w-[842px] h-[595px] bg-white rounded-[32px] overflow-hidden shadow-2xl relative flex flex-col p-16">
                         <div className="w-full h-full border-8 border-blue-50/50 rounded-[24px] p-12 relative flex flex-col">
                            <div className="flex justify-between items-start mb-20">
                               <div className="flex items-center gap-4">
                                  <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-[10px] font-black uppercase text-slate-300">IMI</div>
                                  <div className="flex flex-col">
                                     <span className="text-[10px] font-black text-slate-900 uppercase">Your Company Logo</span>
                                     <span className="text-[8px] font-bold text-slate-400">INTERNATIONAL MARKETING INSTITUTE</span>
                                  </div>
                               </div>
                               <Award size={32} className="text-blue-100" />
                            </div>

                            <div className="flex-1 flex flex-col">
                               <h1 className="text-6xl font-black text-slate-900 uppercase tracking-tighter mb-4">Certificate of Completion</h1>
                               <p className="text-xl font-bold text-blue-600 uppercase tracking-widest mb-16">COMMUNICATION SKILLS COURSE</p>
                               
                               <div className="space-y-2 mb-12">
                                  <p className="text-sm font-bold text-slate-300 uppercase tracking-[0.2em]">Awarded To</p>
                                  <h2 className="text-7xl font-black text-slate-800 tracking-[-0.04em]">Johnathan Alexander</h2>
                               </div>

                               <p className="text-base font-medium text-slate-500 leading-relaxed max-w-2xl">
                                  Has meritoriously completed the "Effective Communication Skills" course based on professional development institute requirements.
                               </p>
                            </div>

                            <div className="flex justify-between items-end mt-auto">
                               <div className="flex gap-16">
                                  <div className="flex flex-col gap-2">
                                     <span className="text-xs font-serif italic text-slate-300 underline underline-offset-8">Simon Blake</span>
                                     <span className="text-[10px] font-black text-slate-900 uppercase">Primary Instructor</span>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                     <span className="text-xs font-serif italic text-slate-300 underline underline-offset-8">Sadie Coleman</span>
                                     <span className="text-[10px] font-black text-slate-900 uppercase">Director of Training</span>
                                  </div>
                               </div>
                               <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center border-4 border-white shadow-lg">
                                  <QrCode size={40} className="text-slate-800 opacity-80" />
                               </div>
                            </div>

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-300 flex items-center gap-4">
                               <span>ISSUED: 2026-03-31</span>
                               <div className="w-1 h-1 bg-slate-200 rounded-full" />
                               <span>UID: 8C2E8BCD-113E-41F5-9676-FE2ACDC88714</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignEditor;
