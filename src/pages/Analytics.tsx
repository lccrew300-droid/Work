import { useState } from "react";
import { 
  BarChart3, 
  LineChart, 
  Activity, 
  Users, 
  Share2, 
  MousePointer2, 
  TrendingUp, 
  Calendar, 
  ChevronDown, 
  Download, 
  ExternalLink,
  Award,
  HelpCircle,
  Clock,
  LayoutGrid,
  List,
  CheckCircle2,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/dashboard/Sidebar";

const Analytics = () => {
  const stats = [
    { label: "Total Issued", value: "24,892", growth: "+12.5%", icon: Award, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Credentials Claimed", value: "18,450", growth: "+8.2%", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Total Shares", value: "5,210", growth: "+15.3%", icon: Share2, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Average Open Rate", value: "68.4%", growth: "+2.1%", icon: Mail, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  const engagementData = [
    { label: "LinkedIn", value: "64%", color: "bg-blue-600" },
    { label: "Twitter / X", value: "18%", color: "bg-slate-900" },
    { label: "Direct Links", value: "12%", color: "bg-emerald-500" },
    { label: "Others", value: "6%", color: "bg-slate-300" },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 sticky top-0 z-20">
          <div className="flex items-center gap-3">
             <h1 className="font-bold text-lg text-slate-800">Analytics</h1>
             <div className="bg-blue-50 text-blue-600 text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full border border-blue-100">Live Insights</div>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="h-9 px-4 bg-white border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2">
                <Calendar size={14} />
                Last 30 Days
                <ChevronDown size={14} />
             </Button>
             <Button variant="outline" className="h-9 px-4 bg-white border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2">
                <Download size={14} />
                Export
             </Button>
          </div>
        </header>

        <div className="p-8 space-y-8 max-w-[1400px] mx-auto">
          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer group">
                 <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                       <stat.icon size={24} />
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                       <TrendingUp size={12} />
                       {stat.growth}
                    </div>
                 </div>
                 <div className="space-y-1">
                    <div className="text-[13px] font-bold text-slate-400">{stat.label}</div>
                    <div className="text-3xl font-extrabold text-slate-900 font-display">{stat.value}</div>
                 </div>
                 {/* Sparkline decoration */}
                 <div className="mt-6 h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                    <div className={`h-full ${stat.color.replace('text', 'bg')} opacity-40`} style={{ width: '70%', borderRadius: 'inherit' }} />
                 </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Main Engagement Chart Placeholder (SVG) */}
             <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm relative overflow-hidden group">
                <div className="flex items-center justify-between mb-10">
                   <div>
                      <h3 className="text-lg font-extrabold text-slate-800">Engagement Overview</h3>
                      <p className="text-xs text-slate-400 font-medium">Daily credential views and claims activity.</p>
                   </div>
                   <div className="flex items-center gap-2 border border-slate-100 bg-slate-50 p-1 rounded-lg">
                      <button className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-white rounded text-blue-600 shadow-sm transition-all active:scale-95">Views</button>
                      <button className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600 transition-all active:scale-95">Claims</button>
                   </div>
                </div>

                <div className="h-64 mt-4 relative flex items-end justify-between px-2">
                   {/* Custom SVG/CSS Bar Chart visual */}
                   {[40, 25, 60, 45, 80, 55, 70, 35, 50, 65, 40, 55].map((h, i) => (
                     <div key={i} className="group/bar relative flex flex-col items-center gap-3">
                        <div 
                          className="w-12 bg-blue-100 rounded-t-xl group-hover/bar:bg-blue-600 transition-all duration-300 relative border-t-2 border-transparent group-hover/bar:border-white shadow-sm"
                          style={{ height: `${h * 2}px` }}
                        >
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-all pointer-events-none whitespace-nowrap">
                               {h * 123} views
                            </div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-300 uppercase">{['Jan','Feb','Mar','Apr','May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}</span>
                     </div>
                   ))}
                   
                   {/* Grid Lines */}
                   <div className="absolute inset-0 z-[-1] flex flex-col justify-between pt-1 pb-10">
                      {[1,2,3,4].map(l => <div key={l} className="w-full border-t border-slate-50" />)}
                   </div>
                </div>
             </div>

             {/* Sharing Platforms */}
             <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex flex-col">
                <h3 className="text-lg font-extrabold text-slate-800 mb-2">Top Sharing</h3>
                <p className="text-xs text-slate-400 font-medium mb-8">Where recipients share their achievements.</p>
                
                <div className="space-y-8 flex-1">
                   {engagementData.map((data, i) => (
                      <div key={i} className="space-y-3 group/platform cursor-pointer">
                         <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-700 transition-colors group-hover/platform:text-blue-600">{data.label}</span>
                            <span className="text-xs font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">{data.value}</span>
                         </div>
                         <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${data.color} transition-all duration-700 delay-150 rounded-full opacity-80 group-hover/platform:opacity-100`} 
                              style={{ width: data.value }} 
                            />
                         </div>
                      </div>
                   ))}
                </div>

                <Button variant="outline" className="mt-10 w-full h-11 text-xs font-extrabold text-blue-600 border-blue-100 hover:bg-blue-50 flex items-center gap-2 group transform active:scale-95 transition-all">
                   View Detailed Report
                   <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
             </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-10 overflow-hidden relative group">
             {/* Decorative Background */}
             <div className="absolute top-0 right-0 w-[500px] h-full bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none" />
             <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="max-w-xl text-center md:text-left">
                   <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border border-blue-500/20 mb-6">
                      <TrendingUp size={12} />
                      Performance Boost
                   </div>
                   <h2 className="text-3xl md:text-4xl font-extrabold text-white font-display mb-4 leading-tight tracking-tight">
                      Maximise Recipient <br />Engagement
                   </h2>
                   <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm mb-10">
                      Learn how to increase your credential sharing rates by 40% with our proven design and notification strategies.
                   </p>
                   <Button className="h-12 px-10 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-xl text-sm transition-all transform active:scale-95 shadow-xl shadow-blue-600/30">
                      Download Guide
                   </Button>
                </div>

                <div className="w-full md:w-[480px] h-[300px] bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl p-8 flex flex-col animate-pulse">
                   <div className="flex items-center gap-4 mb-10">
                      <div className="w-12 h-12 bg-white/10 rounded-xl" />
                      <div className="flex-1 space-y-2">
                         <div className="w-32 h-3 bg-white/10 rounded-full" />
                         <div className="w-16 h-2 bg-white/5 rounded-full" />
                      </div>
                   </div>
                   <div className="space-y-6">
                      <div className="w-full h-8 bg-blue-600/10 rounded-lg flex items-center px-4">
                         <div className="w-4 h-4 rounded-full bg-blue-500/30 mr-3" />
                         <div className="w-24 h-2 bg-blue-500/20 rounded-full" />
                      </div>
                      <div className="w-full h-8 bg-blue-600/10 rounded-lg flex items-center px-4">
                         <div className="w-4 h-4 rounded-full bg-blue-500/30 mr-3" />
                         <div className="w-24 h-2 bg-blue-500/20 rounded-full" />
                      </div>
                      <div className="grid grid-cols-2 gap-6 pt-4">
                         <div className="h-20 bg-emerald-500/5 border border-emerald-500/10 rounded-xl" />
                         <div className="h-20 bg-blue-500/5 border border-blue-500/10 rounded-xl" />
                      </div>
                   </div>
                </div>
             </div>
          </div>
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

export default Analytics;
