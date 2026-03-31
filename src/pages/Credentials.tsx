import { useState, useRef, useEffect } from "react";
import { 
  Plus, 
  Search, 
  ArrowUpDown, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  HelpCircle,
  FileBadge,
  ChevronDown,
  Settings,
  GripVertical,
  Eye,
  Pin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/dashboard/Sidebar";

const Credentials = () => {
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
          <h1 className="font-bold text-lg text-slate-800">Credentials</h1>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-9 px-4 flex items-center gap-2 text-xs">
            Issue Credentials
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
             <span className="text-sm font-bold text-slate-700">0 credentials</span>
             <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search credentials" 
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

                {/* Settings Dropdown Area */}
                <div className="relative" ref={settingsRef}>
                   <div 
                     onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
                     className={`p-2 border rounded-md bg-white hover:bg-slate-50 cursor-pointer shadow-sm text-slate-400 hover:text-slate-600 transition-all ${
                       showSettingsDropdown ? "border-blue-500 ring-2 ring-blue-50 text-blue-600" : "border-slate-200"
                     }`}
                   >
                      <Settings size={16} />
                   </div>

                   {showSettingsDropdown && (
                    <div className="absolute top-full mt-1 right-0 w-[240px] bg-white border border-slate-200 rounded-xl shadow-2xl z-40 overflow-hidden animate-in fade-in zoom-in duration-100">
                       {/* Search Input */}
                       <div className="p-3 border-b border-slate-100">
                          <div className="relative">
                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                             <input 
                               type="text" 
                               placeholder="Search columns" 
                               className="w-full h-8 bg-slate-50 border border-slate-200 rounded-md pl-8 pr-3 text-xs placeholder:text-slate-400 focus:ring-1 focus:ring-blue-100 outline-none"
                             />
                          </div>
                       </div>
                       
                       {/* Visible Columns */}
                       <div className="py-2">
                          <div className="px-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Visible in table</div>
                          {columns.map((col) => (
                            <div key={col} className="flex items-center gap-3 px-3 py-1.5 hover:bg-slate-50 group cursor-pointer transition-colors">
                               <GripVertical size={14} className="text-slate-300 group-hover:text-slate-400" />
                               <span className="text-xs font-semibold text-slate-700 flex-1">{col}</span>
                               <div className="flex items-center gap-2">
                                  <Pin size={14} className="text-slate-300 hover:text-slate-500 transition-colors" />
                                  <Eye size={14} className="text-blue-500 fill-blue-50 transition-colors" />
                               </div>
                            </div>
                          ))}
                       </div>

                       {/* Hidden Columns Section */}
                       <div className="border-t border-slate-100 py-2">
                          <div className="px-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Hidden from table</div>
                          <div className="px-4 py-4 text-[10px] text-slate-300 italic text-center">No columns hidden</div>
                       </div>

                       {/* Footer Action */}
                       <div className="border-t border-slate-100">
                          <button className="w-full px-4 py-3 text-xs font-bold text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors">
                             <Plus size={14} className="text-slate-400" />
                             Create Attribute
                          </button>
                       </div>
                    </div>
                  )}
                </div>
             </div>
          </div>

          {/* Empty State Illustration Section */}
          <div className="flex flex-col items-center justify-center pt-32 pb-20 text-center">
             <div className="relative mb-8">
                <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center opacity-40 blur-2xl absolute inset-0 -z-10" />
                <div className="w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100 relative translate-y-[-10px]">
                   <div className="relative">
                      <div className="w-14 h-16 border-2 border-slate-200 rounded p-1 flex flex-col gap-1">
                         <div className="w-2 h-2 bg-blue-400 rounded-sm mb-1" />
                         <div className="w-full h-1 bg-slate-100 rounded-full" />
                         <div className="w-8 h-1 bg-slate-100 rounded-full" />
                         <div className="w-full h-1 bg-slate-100 rounded-full" />
                      </div>
                   </div>
                   {/* Magnifying Glass Overlay */}
                   <div className="absolute -right-6 -bottom-6 w-16 h-16 pointer-events-none">
                      <Search size={48} className="text-blue-500 opacity-20" />
                   </div>
                </div>
             </div>
             
             <h2 className="text-xl font-extrabold text-slate-800 mb-4 font-display">You have no issued credentials yet</h2>
             <p className="text-slate-400 text-sm max-w-sm mb-8 leading-relaxed font-medium">
                Credentials section lets you manage the credentials you've issued — edit, resend, delete, or export them as PDFs.
             </p>
             <Button variant="outline" className="h-11 px-8 border-blue-600 text-blue-600 hover:bg-blue-50 font-extrabold flex items-center gap-2 text-sm rounded-lg transition-all active:scale-95">
                <Plus size={18} />
                Issue Credentials
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

export default Credentials;
