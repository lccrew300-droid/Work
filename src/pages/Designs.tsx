import { useState, useRef, useEffect } from "react";
import { 
  Plus, 
  Search, 
  ArrowUpDown, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  LayoutGrid, 
  List, 
  HelpCircle,
  Image,
  ChevronDown,
  Settings,
  MoreVertical,
  Edit2,
  Trash2,
  FileBadge,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/dashboard/Sidebar";
import { useNavigate } from "react-router-dom";

const Designs = () => {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(100);
  const [showPageSizeDropdown, setShowPageSizeDropdown] = useState(false);
  const [myDesigns, setMyDesigns] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pageOptions = [10, 20, 50, 100];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('my_designs') || '[]');
    setMyDesigns(saved);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPageSizeDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 sticky top-0 z-20">
          <h1 className="font-bold text-lg text-slate-800">Designs</h1>
          <Button 
            onClick={() => navigate('/designs/new')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-9 px-4 flex items-center gap-2 text-xs"
          >
            <Plus size={16} />
            Create Design
          </Button>
        </header>

        <div className="p-8 space-y-6 max-w-[1400px] mx-auto">
          {/* Action Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="outline" className="h-9 px-4 bg-white border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2 transition-all hover:bg-slate-50 active:scale-95">
                <ArrowUpDown size={14} />
                Newest Created
              </Button>
              <Button variant="outline" className="h-9 px-4 bg-white border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2 transition-all hover:bg-slate-50 active:scale-95">
                <Filter size={14} />
                Filter
              </Button>
            </div>
          </div>

          {/* Table Header Section */}
          <div className="flex items-center justify-between">
             <span className="text-sm font-bold text-slate-700">{myDesigns.length} designs</span>
             <div className="flex items-center gap-4">
                <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                   <input 
                     type="text" 
                     placeholder="Search designs" 
                     className="h-9 w-64 bg-white border border-slate-200 rounded-md pl-9 pr-8 text-xs focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                   />
                </div>

                <div className="flex items-center border border-slate-200 rounded-md bg-white overflow-hidden shadow-sm h-9">
                   <button className="p-2 hover:bg-slate-50 border-r border-slate-200 opacity-20 disabled:cursor-not-allowed"><ChevronLeft size={16} /></button>
                   <div className="px-3 py-1.5 text-xs font-medium text-slate-600 min-w-[60px] text-center">
                      <span className="font-bold">1</span> / <span className="opacity-60">{Math.ceil(myDesigns.length / pageSize) || 1}</span>
                   </div>
                   <button className="p-2 hover:bg-slate-50 border-l border-slate-200 opacity-20 disabled:cursor-not-allowed"><ChevronRight size={16} /></button>
                </div>

                <div className="relative" ref={dropdownRef}>
                   <div 
                     onClick={() => setShowPageSizeDropdown(!showPageSizeDropdown)}
                     className={`flex items-center border rounded-md bg-white px-3 py-1.5 h-9 text-xs font-bold text-slate-600 gap-6 cursor-pointer hover:bg-slate-50 transition-all shadow-sm ${
                       showPageSizeDropdown ? "border-blue-500 ring-2 ring-blue-50" : "border-slate-200"
                     }`}
                   >
                       <span className="opacity-80">{pageSize} / page</span>
                       <ChevronDown size={14} className={`text-slate-400 transition-transform ${showPageSizeDropdown ? "rotate-180" : ""}`} />
                   </div>

                   {showPageSizeDropdown && (
                     <div className="absolute top-full mt-1 right-0 w-full bg-white border border-slate-100 rounded-lg shadow-xl py-1 z-[100] animate-in fade-in zoom-in-95 duration-150">
                       {pageOptions.map((opt) => (
                         <div 
                           key={opt}
                           onClick={() => {
                             setPageSize(opt);
                             setShowPageSizeDropdown(false);
                           }}
                           className={`px-4 py-2.5 text-xs cursor-pointer transition-colors ${
                             pageSize === opt 
                               ? "bg-blue-50 text-blue-700 font-extrabold" 
                               : "text-slate-600 font-medium hover:bg-slate-50"
                           }`}
                         >
                           {opt} / page
                         </div>
                       ))}
                     </div>
                   )}
                </div>

                <div className="flex items-center border border-slate-200 rounded-md bg-white shadow-sm h-9 overflow-hidden">
                   <button className="p-2 bg-slate-50 text-slate-600"><LayoutGrid size={16} /></button>
                   <button className="p-2 hover:bg-slate-50 border-l border-slate-200 opacity-50"><List size={16} className="text-slate-400" /></button>
                </div>
             </div>
          </div>

          {myDesigns.length === 0 ? (
            /* Empty State Illustration Section */
            <div className="flex flex-col items-center justify-center pt-32 pb-20 text-center">
               <div className="relative mb-8">
                  <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center opacity-40 blur-2xl absolute inset-0 -z-10" />
                  <div className="w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100 relative translate-y-[-10px]">
                     <div className="flex flex-col gap-1.5 scale-75 opacity-20">
                        <Image size={48} className="text-blue-500" />
                        <div className="w-12 h-1.5 bg-blue-400 rounded-full mx-auto" />
                     </div>
                     <div className="absolute inset-0 flex items-center justify-center translate-x-1.5 translate-y-1.5 opacity-40">
                        <Image size={40} className="text-blue-400" />
                     </div>
                     <div className="absolute inset-0 flex items-center justify-center -translate-x-1.5 -translate-y-1.5">
                        <Image size={40} className="text-blue-600" />
                     </div>
                  </div>
               </div>
               
               <h2 className="text-xl font-extrabold text-slate-800 mb-4 font-display">You have no designs yet</h2>
               <p className="text-slate-400 text-sm max-w-sm mb-8 leading-relaxed font-medium">
                  A design is a template for your credentials. Once created, it must be attached to a specific group. Thanks to dynamic attributes, the same design can be reused across different groups.
               </p>
               <Button onClick={() => navigate('/designs/new')} variant="outline" className="h-11 px-8 border-blue-600 text-blue-600 hover:bg-blue-50 font-extrabold flex items-center gap-2 text-sm rounded-lg transition-all active:scale-95 shadow-sm shadow-blue-600/5">
                  <Plus size={18} />
                  Create Design
               </Button>
            </div>
          ) : (
            /* Designs Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
               {myDesigns.map((design) => (
                  <div 
                    key={design.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden group hover:shadow-2xl hover:shadow-blue-900/5 hover:border-blue-200 transition-all cursor-pointer relative"
                    onClick={() => navigate('/designs/new', { state: { editId: design.id } })}
                  >
                     {/* Preview Area */}
                     <div className={`aspect-[4/3] w-full ${design.color} relative overflow-hidden flex flex-col items-center justify-center p-8 group-hover:scale-[1.02] transition-transform`}>
                        {design.bgImage && (
                           <img src={design.bgImage} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                        )}
                        <div className="w-full h-full border-4 border-white/40 rounded-xl flex flex-col items-center justify-center p-4 relative z-10">
                           <FileBadge size={48} className="text-white/30 mb-2" />
                           <div className="w-1/2 h-1.5 bg-white/20 rounded-full mb-1" />
                           <div className="w-1/3 h-1.5 bg-white/20 rounded-full" />
                           <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                              <Award size={18} className="text-white/40 font-bold" />
                           </div>
                        </div>
                        {/* Overlay Controls */}
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                           <Button variant="secondary" className="h-9 px-4 text-xs font-black uppercase tracking-widest rounded-lg flex items-center gap-2 blur-none">
                              <Edit2 size={14} /> Edit
                           </Button>
                        </div>
                     </div>
                     {/* Info Area */}
                     <div className="p-5 flex items-center justify-between bg-white relative z-20">
                        <div className="min-w-0">
                           <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight truncate border-b border-transparent group-hover:text-blue-600 transition-colors">
                              {design.name}
                           </h4>
                           <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{design.orientation} Certificate</p>
                        </div>
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-50 hover:text-slate-600 transition-all">
                           <MoreVertical size={16} />
                        </button>
                     </div>
                  </div>
               ))}
            </div>
          )}
        </div>

        {/* Floating Help Button */}
        <div className="fixed bottom-6 right-6 z-50">
           <div className="w-12 h-12 bg-blue-600 rounded-full shadow-2xl shadow-blue-600/40 flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 group">
              <HelpCircle className="text-white" size={24} />
           </div>
        </div>
      </main>
    </div>
  );
};

export default Designs;
