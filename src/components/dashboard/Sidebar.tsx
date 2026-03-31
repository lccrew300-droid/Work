import { 
  LayoutDashboard, 
  Users, 
  Map, 
  Award, 
  Palette, 
  Mail, 
  BarChart3, 
  Puzzle, 
  Zap, 
  Search, 
  ChevronDown,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Groups", badge: "Credential Templates", path: "/groups" },
    { icon: Map, label: "Pathways", path: "/pathways" },
    { icon: Award, label: "Credentials", path: "/credentials" },
    { icon: Palette, label: "Designs", path: "/designs" },
    { icon: Mail, label: "Emails", path: "/emails" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Puzzle, label: "Integrations", path: "/integrations" },
    { icon: Zap, label: "Automations", path: "/automations" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden lg:flex">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded transition-colors w-full">
          <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center font-bold text-slate-600">H</div>
          <span className="font-bold text-sm text-slate-700">hello</span>
          <ChevronDown size={14} className="ml-auto text-slate-400" />
        </div>
      </div>

      <div className="p-4 space-y-1 overflow-y-auto flex-1">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <div className="w-full h-9 bg-slate-50 border border-slate-200 rounded-md pl-9 pr-3 flex items-center justify-between text-xs text-slate-400 cursor-pointer">
            <span>Quick Search</span>
            <span className="bg-white border border-slate-200 px-1 rounded text-[9px] font-mono">Ctrl+K</span>
          </div>
        </div>

        <nav className="space-y-0.5">
          {sidebarItems.map((item) => {
            const active = location.pathname.startsWith(item.path);
            return (
              <div 
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors group ${
                  active ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <item.icon size={18} className={active ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"} />
                <span className="text-[13px] font-semibold">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto text-[10px] text-slate-400 font-medium hidden group-hover:block">{item.badge}</span>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="bg-white p-3 rounded-lg border border-slate-200 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-700">Getting Started</span>
            <span className="text-[10px] text-slate-400">33%</span>
          </div>
          <Progress value={33} className="h-1 lg:h-1.5 mb-3" />
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[11px] text-slate-500 line-through opacity-60">
               <div className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center bg-emerald-500 border-emerald-500">
                  <Zap size={8} className="text-white" />
               </div>
               Create account
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-700 font-bold">
               <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-600" />
               Create group
               <span className="ml-auto bg-blue-600 text-white px-1.5 rounded-sm p-[1px] text-[8px] uppercase tracking-tighter">First Step</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
               <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-200" />
               Issue credentials
            </div>
          </div>
        </div>

        <div className="mb-4">
           <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
              <span>Credential Usage</span>
              <span>0 / 250</span>
           </div>
           <Progress value={0} className="h-1.5" />
        </div>

        <Button className="w-full bg-black hover:bg-slate-800 text-white text-[11px] font-extrabold uppercase tracking-widest h-9">
          Upgrade
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
