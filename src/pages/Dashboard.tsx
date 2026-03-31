import { 
  LayoutDashboard, 
  Users, 
  Award, 
  Activity, 
  HelpCircle,
  MoreVertical,
  Search,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Download,
  Calendar,
  Leaf,
  Clock,
  Star,
  Share2,
  BookOpen,
  Settings,
  BarChart3,
  Palette,
  Mail,
  Map,
  Zap,
  Plus,
  ChevronDown,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const valueCards = [
    { label: "CO2 Prevented", value: "0.75 kg", icon: Leaf, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Saving Time", value: "6 hours", icon: Clock, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Looking Professional", value: "94% issuers", icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Boosting Brand Awareness", value: "2.42 views per share", icon: Share2, color: "text-violet-500", bg: "bg-violet-50" },
  ];

  const resources = [
    { title: "Where to start?", desc: "Onboarding guides for first steps", icon: HelpCircle },
    { title: "5 Strategies to Drive Traffic", desc: "How to drive traffic with CredentialPro", icon: Map },
    { title: "Pricing & Plans", desc: "Compare plans and features", icon: Plus },
    { title: "Certification Program", desc: "Learn how to create from a 2024 Guide", icon: Award },
    { title: "8 Certificate Design Principles", desc: "Create a Lasting Impression in 2024", icon: Palette },
    { title: "Chat with Support", desc: "Get help from our team", icon: Mail },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 sticky top-0 z-10">
          <h1 className="font-bold text-lg text-slate-800">Dashboard</h1>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2 text-[11px]">
                <span className="text-slate-400 font-medium tracking-tight">Starter Plan (Free) 250 credentials / yr.</span>
                <Link to="#" className="text-blue-600 font-bold hover:underline underline-offset-4">Upgrade</Link>
             </div>
             <div className="flex items-center gap-3">
              <Button 
                onClick={() => navigate('/groups/new')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 px-6 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/10 transition-all active:scale-95 translate-y-0 hover:-translate-y-0.5"
              >
                <Plus size={18} />
                Create Group
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8 max-w-[1400px] mx-auto">
          {/* Top Banner: Empty State */}
          <section className="bg-white rounded-xl border border-slate-200 p-8 flex items-center justify-between overflow-hidden relative group">
             <div className="max-w-md z-10">
                <div className="flex items-center gap-2 text-[10px] font-bold text-violet-600 uppercase tracking-widest mb-3">
                   <Star size={12} className="fill-violet-600" />
                   Start
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 font-display mb-4 tracking-tight">Create a group to issue your first credentials!</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                   A group combines your credential's name, description, design, and advanced settings. Once created, you can use it to issue your first credentials.
                </p>
                <Button onClick={() => navigate('/groups/new')} className="bg-black hover:bg-slate-800 text-white font-bold h-10 px-6 rounded-lg text-sm">
                   Create First Group
                </Button>
             </div>
             <div className="hidden lg:block w-96 h-64 bg-slate-50 rounded-2xl border border-slate-200 p-6 opacity-60 group-hover:opacity-100 transition-opacity">
                {/* Visual Placeholder for Dashboard Group Illustration */}
                <div className="w-full h-full border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center">
                   <Award size={48} className="text-slate-200" />
                </div>
             </div>
          </section>

          {/* Issue Overview & Analytics Empty State */}
          <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
             <div className="p-4 bg-white/50 border border-slate-100 rounded-xl space-y-4">
            <h4 className="text-[11px] font-bold text-slate-800 flex items-center gap-2">
               Getting Started 
               <div className="w-1 h-1 bg-blue-500 rounded-full animate-ping" />
            </h4>
            <div className="space-y-2">
               <Button onClick={() => navigate('/groups/new')} variant="ghost" className="w-full justify-between h-10 px-3 text-xs bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 transition-all group">
                  <div className="flex items-center gap-2 font-bold">
                     <Plus size={14} /> Create group
                  </div>
                  <div className="bg-blue-600 text-white text-[9px] px-2 py-0.5 rounded font-black uppercase">First Step</div>
               </Button>
               <Button variant="ghost" className="w-full justify-start h-10 px-3 text-xs text-slate-400 hover:bg-slate-50 transition-all flex items-center gap-2 font-medium">
                  <HelpCircle size={14} /> Issue credentials
               </Button>
            </div>
          </div>
             <div className="space-y-4">
                {["Issued Credentials", "Opened Credentials", "Shared Credentials", "Downloaded as PDF"].map((label) => (
                  <div key={label} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">{label}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-slate-900 uppercase">0</span>
                      <span className="text-[10px] font-bold text-slate-300">last 12 months</span>
                    </div>
                  </div>
                ))}
             </div>
          </section>

          {/* LinkedIn Performance */}
          <section className="bg-white rounded-xl border border-slate-200">
             <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className="w-6 h-6 bg-[#0077b5] rounded flex items-center justify-center">
                      <Share2 size={12} className="text-white" />
                   </div>
                   <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">LinkedIn Performance</h3>
                </div>
                <Link to="#" className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1">
                   <BarChart3 size={12} />
                   How to Boost LinkedIn Shares
                </Link>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3">
                {["Shared in total", "Added to Profile", "Shared as Post"].map((label, i) => (
                  <div key={label} className={`p-6 border-slate-100 ${i !== 2 ? "md:border-r" : ""}`}>
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
                      <Share2 size={14} className="text-slate-200" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-extrabold text-slate-900">0</span>
                      <span className="text-[10px] font-bold text-slate-300">last 12 months</span>
                    </div>
                  </div>
                ))}
             </div>
          </section>

          {/* Recent Credentials Table */}
          <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
             <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Recent Credentials</h3>
                <Link to="#" className="text-[11px] font-bold text-blue-600 hover:underline">View All Credentials</Link>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead className="bg-slate-50/50 border-b border-slate-100">
                      <tr>
                         {["Name", "Email", "Group", "Issue Date", "Status"].map((h) => (
                           <th key={h} className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">{h}</th>
                         ))}
                      </tr>
                   </thead>
                   <tbody>
                      <tr className="h-48">
                         <td colSpan={5} className="text-center p-8">
                            <div className="flex flex-col items-center">
                               <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                                  <Search size={24} className="text-slate-300" />
                               </div>
                               <p className="text-slate-400 text-sm font-medium mb-4">
                                  Recent Credentials list will be available once you issue your first credentials.
                               </p>
                               <Button variant="outline" className="h-9 px-6 border-slate-200 hover:bg-slate-50 font-bold text-slate-700 text-xs">
                                  Issue Credentials
                               </Button>
                            </div>
                         </td>
                      </tr>
                   </tbody>
                </table>
             </div>
          </section>

          {/* Value Delivered */}
          <section>
             <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-6">Value Delivered</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {valueCards.map((card) => (
                  <div key={card.label} className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between group transition-all hover:shadow-md">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{card.label}</p>
                      <div className={`p-1.5 rounded-lg ${card.bg}`}>
                        <card.icon size={16} className={card.color} />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-2xl font-extrabold text-slate-900 tracking-tight">{card.value}</span>
                    </div>
                  </div>
                ))}
             </div>
          </section>

          {/* Useful Resources */}
          <section>
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Useful Resources</h3>
                <Link to="#" className="text-[11px] font-bold text-blue-600 hover:underline">Explore Knowledge Base</Link>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources.map((item) => (
                  <div key={item.title} className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4 cursor-pointer hover:border-blue-300 hover:bg-blue-50/10 transition-all group">
                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 transition-colors">
                      <item.icon size={18} className="text-slate-400 group-hover:text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 font-medium group-hover:text-slate-500">{item.desc}</p>
                    </div>
                    <ChevronDown size={14} className="ml-auto text-slate-300 -rotate-90 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
             </div>
          </section>
        </div>

        {/* Floating Help Button */}
        <div className="fixed bottom-6 right-6">
           <div className="w-12 h-12 bg-blue-600 rounded-full shadow-2xl shadow-blue-600/40 flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 group">
              <HelpCircle className="text-white" size={24} />
              <div className="absolute right-14 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                 Need help?
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
