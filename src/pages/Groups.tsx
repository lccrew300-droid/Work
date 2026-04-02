import { useState, useRef, useEffect } from "react";
import { 
  Plus, Search, ArrowUpDown, Filter, ChevronLeft, ChevronRight, LayoutGrid, List, HelpCircle, Zap, X, Award, ChevronDown, Users, Calendar, MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/dashboard/Sidebar";
import { useNavigate } from "react-router-dom";
import { db } from "@/lib/firebase";
import { ref, onValue, off } from "firebase/database";

const Groups = () => {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(100);
  const [showPageSizeDropdown, setShowPageSizeDropdown] = useState(false);
  const [groups, setGroups] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pageOptions = [10, 20, 50, 100];

  useEffect(() => {
    const groupsRef = ref(db, 'groups');
    const unsubscribe = onValue(groupsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const groupsList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        setGroups(groupsList);
      } else {
        setGroups([]);
      }
      setIsLoading(false);
    });

    // Timeout failsafe: If no data in 2 seconds, stop loading
    const timer = setTimeout(() => setIsLoading(false), 2000);

    return () => {
      off(groupsRef);
      clearTimeout(timer);
    };
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

      <main className="flex-1 overflow-y-auto relative">
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 sticky top-0 z-20">
          <h1 className="font-bold text-lg text-slate-800">Groups</h1>
          <Button 
            onClick={() => navigate('/groups/new')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-9 px-4 flex items-center gap-2 text-xs"
          >
            <Plus size={16} /> Create Group
          </Button>
        </header>

        <div className="p-8 space-y-6 max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="outline" className="h-9 px-4 bg-white border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2">
                <ArrowUpDown size={14} /> Newest Created
              </Button>
              <Button variant="outline" className="h-9 px-4 bg-white border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2">
                <Filter size={14} /> Filter
              </Button>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input type="text" placeholder="Search groups" className="h-9 w-64 bg-white border border-slate-200 rounded-md pl-9 pr-8 text-xs focus:ring-2 focus:ring-blue-100 outline-none" />
                </div>
                <div className="relative" ref={dropdownRef}>
                  <div onClick={() => setShowPageSizeDropdown(!showPageSizeDropdown)} className={`flex items-center border rounded-md bg-white px-3 py-1.5 text-xs font-bold text-slate-600 gap-6 cursor-pointer hover:bg-slate-50 transition-all shadow-sm ${showPageSizeDropdown ? "border-blue-500 ring-2 ring-blue-50" : "border-slate-200"}`}>
                      <span className="opacity-80">{pageSize} / page</span>
                      <ChevronDown size={14} className={`text-slate-400 transition-transform ${showPageSizeDropdown ? "rotate-180" : ""}`} />
                  </div>
                  {showPageSizeDropdown && (
                    <div className="absolute top-full mt-1 left-0 w-full bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-30 overflow-hidden animate-in fade-in zoom-in duration-100">
                      {pageOptions.map((opt) => (<div key={opt} onClick={() => { setPageSize(opt); setShowPageSizeDropdown(false); }} className={`px-4 py-2.5 text-xs cursor-pointer ${pageSize === opt ? "bg-blue-50 text-blue-700 font-extrabold" : "text-slate-600 font-medium hover:bg-slate-50"}`}>{opt} / page</div>))}
                    </div>
                  )}
                </div>
                <div className="flex items-center border border-slate-200 rounded-md bg-white shadow-sm h-9 overflow-hidden">
                   <button className="p-2 hover:bg-slate-50 border-r border-slate-200"><LayoutGrid size={16} className="text-slate-400" /></button>
                   <button className="p-2 bg-slate-50 text-slate-600"><List size={16} /></button>
                </div>
            </div>
          </div>

          <div className="bg-[#fcfaff] rounded-xl border border-[#e9e3ff] p-10 flex items-center justify-between gap-8 relative overflow-hidden group shadow-sm transition-all hover:shadow-md">
             <div className="max-w-lg">
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#7246ff] uppercase tracking-widest mb-4"><Zap size={12} className="fill-[#7246ff]" /> Coming Soon</div>
                <h2 className="text-3xl font-extrabold text-[#1a1523] font-display mb-4 tracking-tight leading-tight">Groups &rarr; Templates</h2>
                <p className="text-slate-600 text-sm leading-relaxed max-w-sm">Soon, Groups will be renamed to Credential Templates. This is a naming update only — functionality remains the same.</p>
             </div>
             <div className="w-[480px] h-[240px] bg-white rounded-2xl border border-slate-200 shadow-2xl p-2 rotate-2 group-hover:rotate-0 transition-transform duration-500 overflow-hidden">
                <div className="w-full h-full bg-slate-50 p-4 flex flex-col gap-3">
                   <div className="flex items-center justify-between mb-2"><div className="flex items-center gap-2"><div className="w-4 h-4 bg-slate-200 rounded"/> <div className="w-16 h-2 bg-slate-200 rounded"/></div><div className="w-12 h-4 bg-blue-100 rounded"/></div>
                   <div className="grid grid-cols-2 gap-4"><div className="border border-slate-200 rounded-md p-3 bg-white h-12"/><div className="border border-slate-200 rounded-md p-3 bg-white h-12"/></div>
                </div>
             </div>
          </div>

          {isLoading ? (
            <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[48px] animate-pulse">
               <div className="w-8 h-8 border-4 border-slate-50 border-b-blue-600 rounded-full animate-spin mb-4" />
               <div className="font-bold text-slate-300 uppercase tracking-widest text-[10px]">Registry Syncing...</div>
            </div>
          ) : groups.length === 0 ? (
            <div className="flex flex-col items-center justify-center pt-20 pb-20 text-center">
               <div className="relative mb-8"><div className="w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100"><div className="flex flex-col gap-2"><div className="w-12 h-2 bg-blue-100 rounded-full" /><div className="w-10 h-2 bg-slate-100 rounded-full" /></div></div><div className="absolute -right-6 -bottom-6"><Search size={48} className="text-blue-500 opacity-20" /></div></div>
               <h2 className="text-xl font-extrabold text-slate-800 mb-4">You have no groups yet</h2>
               <p className="text-slate-400 text-sm max-w-sm mb-8 font-medium">Create a group to start issuing certificates in real-time.</p>
               <Button onClick={() => navigate('/groups/new')} variant="outline" className="h-11 px-8 border-blue-600 text-blue-600 hover:bg-blue-50 font-extrabold rounded-lg transition-all active:scale-95"><Plus size={18} className="mr-2"/> Create Group</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <div key={group.id} onClick={() => navigate(`/groups/${group.id}`)} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group overflow-hidden">
                  <div className={`h-32 ${group.designDetails?.color || 'bg-blue-600'} flex items-center justify-center relative`}>
                     {group.designDetails?.bgImage && <img src={group.designDetails.bgImage} className="absolute inset-0 w-full h-full object-cover opacity-50" />}
                     <div className="z-10 bg-white/20 backdrop-blur-md px-6 py-2 rounded-lg border border-white/30 text-white font-black text-xs uppercase tracking-widest">{group.name}</div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between"><h3 className="font-black text-slate-800 text-sm uppercase truncate">{group.name}</h3><MoreVertical size={16} className="text-slate-300" /></div>
                    <p className="text-xs text-slate-400 line-clamp-2 min-h-[32px]">{group.description || "Active realtime registry group."}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-50"><div className="flex items-center gap-1.5 text-slate-500"><Users size={14}/><span className="text-[11px] font-bold">{Object.keys(group.members || {}).length} Members</span></div><div className="flex items-center gap-1.5 text-slate-500"><Calendar size={14}/><span className="text-[11px] font-bold">{group.createdAt ? new Date(group.createdAt).toLocaleDateString() : 'Active'}</span></div></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Groups;
