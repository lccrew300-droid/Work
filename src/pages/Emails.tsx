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
  Mail,
  ChevronDown,
  Settings,
  Edit,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/dashboard/Sidebar";

const Emails = () => {
  const [pageSize, setPageSize] = useState(100);
  const [showPageSizeDropdown, setShowPageSizeDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pageOptions = [10, 20, 50, 100];
  
  const systemTemplates = [
    { title: "Issuance Notification", desc: "Sent when a new credential is issued.", status: "Active", type: "Transactional" },
    { title: "Renewal Reminder", desc: "Sent before a credential expires.", status: "Draft", type: "Reminder" },
    { title: "Claim Successful", desc: "Sent after a recipient claims their badge.", status: "Active", type: "Transactional" },
  ];

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
          <h1 className="font-bold text-lg text-slate-800">Emails</h1>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-9 px-4 flex items-center gap-2 text-xs">
            Create Template
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
             <span className="text-sm font-bold text-slate-700">0 custom templates</span>
             <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search templates" 
                    className="h-9 w-64 bg-white border border-slate-200 rounded-md pl-9 pr-8 text-xs focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-50 rounded cursor-pointer">
                    <Search size={12} className="text-slate-400" />
                  </div>
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
                        <div key={opt} onClick={() => { setPageSize(opt); setShowPageSizeDropdown(false); }} className={`px-4 py-2.5 text-xs cursor-pointer transition-colors ${ pageSize === opt ? "bg-blue-50 text-blue-700 font-extrabold" : "text-slate-600 font-medium hover:bg-slate-50" }`}>
                          {opt} / page
                        </div>
                      ))}
                    </div>
                  )}
                </div>
             </div>
          </div>

          {/* System Templates Visualization */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systemTemplates.map((template, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all group cursor-pointer relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                   <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                      <Mail size={20} />
                   </div>
                   <div className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${template.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>
                      {template.status}
                   </div>
                </div>
                <h3 className="font-bold text-slate-800 text-[15px] mb-1 group-hover:text-blue-600 transition-colors">{template.title}</h3>
                <p className="text-xs text-slate-400 font-medium mb-4 line-clamp-2">{template.desc}</p>
                <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                   <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 hover:text-blue-600">
                      <Edit size={14} /> Edit
                   </div>
                   <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 hover:text-blue-600">
                      <Eye size={14} /> Preview
                   </div>
                </div>
                {/* Visual Accent */}
                <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-blue-100 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
              </div>
            ))}
          </div>

          {/* Empty State Illustration Section */}
          <div className="flex flex-col items-center justify-center pt-20 pb-20 text-center">
             <div className="relative mb-8">
                <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center opacity-40 blur-2xl absolute inset-0 -z-10" />
                <div className="w-40 h-28 bg-white rounded-2xl shadow-xl border border-slate-100 relative flex items-center justify-center translate-y-[-10px] overflow-hidden">
                   <div className="relative w-full h-full p-6 flex flex-col items-center">
                      <div className="w-full h-2 bg-slate-50 rounded-full mb-3" />
                      <div className="w-4/5 h-2 bg-slate-50 rounded-full mb-3" />
                      <div className="w-2/3 h-2 bg-slate-50 rounded-full" />
                      
                      <div className="absolute bottom-4 left-6">
                         <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Mail size={16} className="text-blue-600" />
                         </div>
                      </div>
                      
                      <div className="absolute bottom-6 right-6 flex -space-x-2">
                         <div className="w-6 h-6 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center"><CheckCircle2 size={12} className="text-emerald-600" /></div>
                         <div className="w-6 h-6 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center"><Clock size={12} className="text-amber-600" /></div>
                      </div>
                   </div>
                </div>
             </div>
             
             <h2 className="text-xl font-extrabold text-slate-800 mb-4 font-display">Customise your email templates</h2>
             <p className="text-slate-400 text-sm max-w-sm mb-8 leading-relaxed font-medium">
                Make your emails as unique as your credentials. Personalise templates with your branding, custom content, and dynamic attributes.
             </p>
             <Button variant="outline" className="h-11 px-8 border-blue-600 text-blue-600 hover:bg-blue-50 font-extrabold flex items-center gap-2 text-sm rounded-lg transition-all active:scale-95">
                <Plus size={18} />
                Create Template
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

export default Emails;
