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
  Zap,
  X,
  Award,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/dashboard/Sidebar";
import { useNavigate } from "react-router-dom";

const Groups = () => {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(100);
  const [showPageSizeDropdown, setShowPageSizeDropdown] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  const pageOptions = [10, 20, 50, 100];
  const columns = ["Email", "Group", "Issue Date", "Status", "Name"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPageSizeDropdown(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettingsDropdown(false);
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
          <h1 className="font-bold text-lg text-slate-800">Groups</h1>
          <Button 
            onClick={() => navigate('/groups/new')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-9 px-4 flex items-center gap-2 text-xs"
          >
            <Plus size={16} />
            Create Group
          </Button>
        </header>

        <div className="p-8 space-y-6 max-w-[1400px] mx-auto">
          {/* Action Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="outline" className="h-9 px-4 bg-white border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2">
                <ArrowUpDown size={14} />
                Newest Created
              </Button>
              <Button variant="outline" className="h-9 px-4 bg-white border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2">
                <Filter size={14} />
                Filter
              </Button>
            </div>
          </div>

          {/* Table Header Section */}
          <div className="flex items-center justify-between">
             <span className="text-sm font-bold text-slate-700">0 groups</span>
             <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search groups" 
                    className="h-9 w-64 bg-white border border-slate-200 rounded-md pl-9 pr-8 text-xs focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-50 rounded cursor-pointer">
                    <Search size={12} className="text-slate-400" />
                  </div>
                </div>

                <div className="flex items-center border border-slate-200 rounded-md bg-white overflow-hidden shadow-sm">
                   <button className="p-2 hover:bg-slate-50 border-r border-slate-200 opacity-20 disabled:cursor-not-allowed"><ChevronLeft size={16} /></button>
                   <div className="px-3 py-1.5 text-xs font-medium text-slate-600">
                      <span className="font-bold">1</span> / <span className="opacity-60">0</span>
                   </div>
                   <button className="p-2 hover:bg-slate-50 border-l border-slate-200 opacity-20 disabled:cursor-not-allowed"><ChevronRight size={16} /></button>
                </div>

                <div className="relative" ref={dropdownRef}>
                  <div 
                    onClick={() => setShowPageSizeDropdown(!showPageSizeDropdown)}
                    className={`flex items-center border rounded-md bg-white px-3 py-1.5 text-xs font-bold text-slate-600 gap-6 cursor-pointer hover:bg-slate-50 transition-all shadow-sm ${
                      showPageSizeDropdown ? "border-blue-500 ring-2 ring-blue-50" : "border-slate-200"
                    }`}
                  >
                      <span className="opacity-80">{pageSize} / page</span>
                      <ChevronDown size={14} className={`text-slate-400 transition-transform ${showPageSizeDropdown ? "rotate-180" : ""}`} />
                  </div>

                  {showPageSizeDropdown && (
                    <div className="absolute top-full mt-1 left-0 w-full bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-30 overflow-hidden animate-in fade-in zoom-in duration-100">
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
                   <button className="p-2 hover:bg-slate-50 border-r border-slate-200"><LayoutGrid size={16} className="text-slate-400" /></button>
                   <button className="p-2 bg-slate-50 text-slate-600"><List size={16} /></button>
                </div>
             </div>
          </div>

          {/* Renaming Announcement Banner */}
          <div className="bg-[#fcfaff] rounded-xl border border-[#e9e3ff] p-6 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden group shadow-sm transition-all hover:shadow-md">
             <button className="absolute top-4 right-4 p-1 hover:bg-white rounded-full text-slate-300">
               <X size={16} />
             </button>
             
             <div className="max-w-lg">
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#7246ff] uppercase tracking-widest mb-4">
                   <Zap size={12} className="fill-[#7246ff]" />
                   Coming Soon
                </div>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-[#1a1523] font-display mb-4 tracking-tight leading-tight">
                  Groups &rarr; Credential Templates
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
                   Soon, Groups will be renamed to Credential Templates to better reflect what they represent. This is a naming update only — functionality remains the same.
                </p>
             </div>

             <div className="w-full lg:w-[480px] h-[240px] bg-white rounded-2xl border border-slate-200 shadow-2xl p-2 rotate-2 group-hover:rotate-0 transition-transform duration-500 overflow-hidden">
                <div className="w-full h-full bg-slate-50 p-4 flex flex-col gap-3">
                   <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2"><div className="w-4 h-4 bg-slate-200 rounded"/> <div className="w-16 h-2 bg-slate-200 rounded"/></div>
                      <div className="w-12 h-4 bg-blue-100 rounded"/>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="border border-slate-200 rounded-md p-3 bg-white space-y-2">
                         <div className="w-full h-12 bg-slate-50 border border-slate-100 rounded" />
                         <div className="w-20 h-2 bg-slate-200 rounded"/>
                      </div>
                      <div className="border border-slate-200 rounded-md p-3 bg-white space-y-2">
                         <div className="w-full h-12 bg-slate-50 border border-slate-100 rounded" />
                         <div className="w-20 h-2 bg-slate-200 rounded"/>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Empty State Illustration Section */}
          <div className="flex flex-col items-center justify-center pt-20 pb-20 text-center">
             <div className="relative mb-8">
                <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center opacity-40 blur-2xl absolute inset-0 -z-10" />
                <div className="w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100 relative translate-y-[-10px]">
                   <div className="flex flex-col gap-2">
                      <div className="w-12 h-2 bg-blue-100 rounded-full" />
                      <div className="w-10 h-2 bg-slate-100 rounded-full" />
                      <div className="w-14 h-2 bg-slate-100 rounded-full" />
                   </div>
                   <div className="absolute top-2 right-2 flex gap-1">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      <div className="w-1.5 h-1.5 bg-blue-200 rounded-full" />
                      <div className="w-1.5 h-1.5 bg-blue-200 rounded-full" />
                   </div>
                   {/* Magnifying Glass Overlay */}
                   <div className="absolute -right-6 -bottom-6 w-16 h-16 pointer-events-none">
                      <Search size={48} className="text-blue-500 opacity-20" />
                   </div>
                </div>
             </div>
             
             <h2 className="text-xl font-extrabold text-slate-800 mb-4 font-display">You have no groups yet</h2>
             <p className="text-slate-400 text-sm max-w-sm mb-8 leading-relaxed font-medium">
                A group stores your credential details and settings — such as name, design, and description — along with advanced options like expiration management, recipient permissions, and more.
             </p>
             <Button variant="outline" className="h-11 px-8 border-blue-600 text-blue-600 hover:bg-blue-50 font-extrabold flex items-center gap-2 text-sm rounded-lg transition-all active:scale-95">
                <Plus size={18} />
                Create Group
             </Button>
          </div>
        </div>

        {/* Floating Help Button */}
        <div className="fixed bottom-6 right-6">
           <div className="w-12 h-12 bg-blue-600 rounded-full shadow-2xl shadow-blue-600/40 flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 group">
              <HelpCircle className="text-white" size={24} />
           </div>
        </div>
      </main>
    </div>
  );
};

export default Groups;
