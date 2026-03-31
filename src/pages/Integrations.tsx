import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Puzzle, 
  Search, 
  ArrowLeft,
  Settings,
  Database,
  Mail,
  Slack as SlackIcon,
  Video,
  Zap,
  Globe,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  FileSpreadsheet,
  Lock,
  RefreshCw,
  Bell,
  GraduationCap,
  Layout,
  MessageSquare,
  Users,
  Briefcase,
  Monitor
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/dashboard/Sidebar";

const Integrations = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const integrationList = [
    // Spreadsheets & Data
    { id: "google-sheets", name: "Google Sheets", desc: "Sync your data directly from Sheets.", icon: FileSpreadsheet, color: "text-emerald-600", bg: "bg-emerald-50", category: "Spreadsheets" },
    { id: "airtable", name: "Airtable", desc: "Connect with your Airtable bases.", icon: Database, color: "text-blue-500", bg: "bg-blue-50/50", category: "Databases" },
    
    // Automations
    { id: "zapier", name: "Zapier", desc: "Connect with 5000+ apps automatically.", icon: Zap, color: "text-orange-600", bg: "bg-orange-50", category: "Automations" },
    { id: "make", name: "Make.com", desc: "Build visual automation workflows.", icon: RefreshCw, color: "text-indigo-600", bg: "bg-indigo-50", category: "Automations" },
    
    // Webinars & Video
    { id: "zoom", name: "Zoom", desc: "Auto-issue credentials after webinars.", icon: Video, color: "text-blue-600", bg: "bg-blue-50", category: "Webinars" },
    { id: "ms-teams", name: "Microsoft Teams", desc: "Collaborate and issue via Teams.", icon: Monitor, color: "text-indigo-500", bg: "bg-indigo-50/50", category: "Video" },
    
    // Messaging & Collab
    { id: "slack", name: "Slack", desc: "Get real-time issuance notifications.", icon: SlackIcon, color: "text-purple-600", bg: "bg-purple-50", category: "Messaging" },
    { id: "discord", name: "Discord", desc: "Notify your community of new badges.", icon: MessageSquare, color: "text-indigo-500", bg: "bg-indigo-50", category: "Messaging" },
    
    // CRM
    { id: "hubspot", name: "HubSpot", desc: "Sync credentials with your HubSpot CRM.", icon: Database, color: "text-orange-500", bg: "bg-orange-50/50", category: "CRM" },
    { id: "salesforce", name: "Salesforce", desc: "Enterprise-grade CRM integration.", icon: Briefcase, color: "text-blue-500", bg: "bg-blue-50", category: "CRM" },
    
    // LMS & Education
    { id: "canvas", name: "Canvas LMS", desc: "Issue credentials for Canvas courses.", icon: GraduationCap, color: "text-red-600", bg: "bg-red-50", category: "Education" },
    { id: "moodle", name: "Moodle", desc: "Connect with your Moodle LMS site.", icon: Layout, color: "text-orange-700", bg: "bg-orange-50", category: "Education" },
    { id: "thinkific", name: "Thinkific", desc: "Auto-issue for course completions.", icon: Monitor, color: "text-blue-700", bg: "bg-blue-50", category: "Online Courses" },
    
    // Marketing
    { id: "mailchimp", name: "Mailchimp", desc: "Automate certificate email campaigns.", icon: Mail, color: "text-amber-600", bg: "bg-amber-50", category: "Marketing" },
    { id: "activecampaign", name: "ActiveCampaign", desc: "Marketing automation for credentials.", icon: Zap, color: "text-blue-600", bg: "bg-blue-50/50", category: "Marketing" },
    
    // Web
    { id: "webflow", name: "Webflow", desc: "Display badges on your Webflow site.", icon: Globe, color: "text-indigo-600", bg: "bg-indigo-50", category: "Web Services" },
  ];

  const IntegrationGrid = () => (
    <div className="p-8 space-y-10 max-w-[1400px] mx-auto animate-in fade-in duration-300">
      <div className="flex flex-col gap-1.5 border-b border-slate-100 pb-8">
         <div className="flex items-center gap-3 text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-1">
            <Zap size={14} className="fill-blue-600" />
            Marketplace
         </div>
         <h2 className="text-3xl font-extrabold text-slate-900 font-display">Featured Integrations</h2>
         <p className="text-slate-500 text-sm max-w-2xl">Connect your favorite tools to automate your credentialing workflow and streamline your business processes across all platforms.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {integrationList.map((item) => (
          <div 
            key={item.id}
            onClick={() => setSelected(item.id)}
            className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-6 cursor-pointer hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-600/10 transition-all group relative overflow-hidden"
          >
            <div className="flex justify-between items-start z-10">
               <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 border border-transparent group-hover:border-white shadow-sm`}>
                  <item.icon size={24} className={item.color} />
               </div>
               <div className="bg-slate-50 border border-slate-100 px-2 py-1 rounded text-[9px] font-bold text-slate-400 uppercase tracking-wider group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">{item.category}</div>
            </div>
            <div className="z-10">
               <h3 className="text-[16px] font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">{item.name}</h3>
               <p className="text-[12px] text-slate-400 font-medium leading-relaxed line-clamp-2">{item.desc}</p>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 z-10">
               Setup Connection
               <ChevronRight size={14} />
            </div>

            {/* Subtle background decoration */}
            <div className={`absolute -right-8 -bottom-8 w-24 h-24 ${item.bg} rounded-full opacity-0 group-hover:opacity-20 transition-opacity blur-2xl -z-0`} />
          </div>
        ))}
      </div>
    </div>
  );

  const GenericSetup = ({ 
    title, 
    icon: Icon, 
    color, 
    bg, 
    steps, 
    btnText, 
    btnColor 
  }: { 
    title: string, 
    icon: any, 
    color: string, 
    bg: string, 
    steps: string[], 
    btnText: string, 
    btnColor: string 
  }) => (
    <div className="p-8 max-w-4xl mx-auto animate-in slide-in-from-right duration-300">
      <button 
        onClick={() => setSelected(null)}
        className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors mb-8 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Marketplace
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/50">
         <div className={`${bg} px-10 py-12 flex items-center gap-8`}>
            <div className={`w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100`}>
               <Icon size={48} className={color} />
            </div>
            <div>
               <h1 className="text-4xl font-extrabold text-slate-900 font-display mb-2">{title}</h1>
               <div className={`flex items-center gap-2 text-[11px] font-bold ${color} uppercase tracking-widest`}>
                  <Globe size={14} />
                  Official Partner Integration
               </div>
            </div>
            <Button className={`ml-auto ${btnColor} text-white font-extrabold h-12 px-10 rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95`}>
               {btnText}
            </Button>
         </div>

         <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
               <h3 className="text-lg font-bold text-slate-800">Integration Benefits</h3>
               <div className="space-y-6">
                  {steps.map((text, i) => (
                    <div key={i} className="flex gap-4 text-sm text-slate-500 font-medium leading-relaxed">
                       <div className={`w-6 h-6 rounded-lg ${bg} ${color} flex-shrink-0 flex items-center justify-center text-[11px] font-extrabold shadow-sm`}>{i+1}</div>
                       {text}
                    </div>
                  ))}
               </div>
            </div>

            <div className="space-y-8">
               <h3 className="text-lg font-bold text-slate-800">Security & Privacy</h3>
               <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                     <Lock size={20} className="text-slate-400" />
                     <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Enterprise Grade</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-semibold mb-8">
                     CredentialPro uses industry-standard OAuth 2.0 to securely connect with {title}. We never store your passwords and strictly follow your platform's privacy guidelines.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs text-slate-600 font-bold">
                       <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center"><RefreshCw size={14} className="text-blue-600" /></div>
                       Auto-sync every 15 minutes
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-600 font-bold">
                       <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center"><Bell size={14} className="text-blue-600" /></div>
                       Custom event triggers
                    </div>
                  </div>
                  <div className="mt-10 pt-8 border-t border-slate-100">
                    <Link to="#" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-2 transition-colors">
                       <HelpCircle size={14} />
                       Launch the documentation guide
                    </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  const getSetupView = () => {
    switch (selected) {
      case "google-sheets":
        return (
          <GenericSetup 
            title="Google Sheets"
            icon={FileSpreadsheet}
            color="text-emerald-600"
            bg="bg-emerald-50"
            btnText="Install Extension"
            btnColor="bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
            steps={[
              "Pull recipient data dynamically from any sheet in your drive.",
              "Auto-update credential status back to your spreadsheet columns.",
              "Support for custom dynamic attributes and custom schema fields.",
              "Real-time sync every time you publish a new credential group."
            ]}
          />
        );
      case "zapier":
        return (
          <GenericSetup 
            title="Zapier"
            icon={Zap}
            color="text-orange-600"
            bg="bg-orange-50"
            btnText="Authorise Zapier"
            btnColor="bg-orange-600 hover:bg-orange-700 shadow-orange-600/20"
            steps={[
              "Trigger issuance from any of 5000+ available apps and tools.",
              "Update external databases when a credential is claimed or shared.",
              "Build complex multi-step automated workflows with ease.",
              "Get notified across platforms on every single new digital badge."
            ]}
          />
        );
      default:
        // Generic dynamic setup view for other IDs
        const info = integrationList.find(i => i.id === selected);
        return info ? (
          <GenericSetup 
            title={info.name}
            icon={info.icon}
            color={info.color}
            bg={info.bg}
            btnText={`Activate ${info.name}`}
            btnColor="bg-blue-600 hover:bg-blue-700 shadow-blue-600/20"
            steps={[
              `Seamlessly sync your ${info.name} data with the CredentialPro engine.`,
              `Automated workflows based on ${info.name} events and completions.`,
              "Enterprise-grade contact tracking within your dashboard timeline.",
              "Maintains data integrity across multiple platform ecosystems."
            ]}
          />
        ) : null;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 sticky top-0 z-20">
          <div className="flex items-center gap-4">
             <h1 className="font-bold text-lg text-slate-800">Integrations</h1>
          </div>
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
             <input 
               type="text" 
               placeholder="Search from 100+ integrations..." 
               className="h-9 w-72 bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 text-xs placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none"
             />
          </div>
        </header>

        <div className="pb-20">
          {selected ? (
            getSetupView()
          ) : (
            <IntegrationGrid />
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

export default Integrations;
