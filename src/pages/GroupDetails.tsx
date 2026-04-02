import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Users, Mail, CheckCircle2, 
  Clock, Send, Award, Trash2, ShieldCheck, 
  Plus, X, UploadCloud, ChevronDown, Copy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/dashboard/Sidebar";
import { db } from "@/lib/firebase";
import { ref, onValue, update, set, push, remove } from "firebase/database";
import { toast } from "sonner";
import * as xlsx from 'xlsx';

const GroupDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addMode, setAddMode] = useState<'single' | 'excel'>('single');
  const [singleEmail, setSingleEmail] = useState("");
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [emailColumn, setEmailColumn] = useState("Email");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    const groupRef = ref(db, `groups/${id}`);
    const unsubscribe = onValue(groupRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setGroup({ id: snapshot.key, ...data });
      } else {
        toast.error("Group not found");
        navigate('/groups');
      }
      setIsLoading(false);
    });

    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [id, navigate]);

  const sendAutoInviteFromRelay = async (toEmail: string, token: string) => {
    try {
      const inviteLink = `${window.location.origin}/accept-invitation?groupId=${id}&email=${encodeURIComponent(toEmail)}&token=${token}`;
      
      const response = await fetch('http://localhost:5000/api/send-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: toEmail,
          groupName: group?.name || 'the Group',
          inviteLink: inviteLink
        })
      });

      if (!response.ok) throw new Error('Email Relay failed');
      return true;
    } catch (error) {
      console.error("Auto-Invite Relay Error:", error);
      return false;
    }
  };

  const handleAddSingle = async () => {
    if (!singleEmail || !id) return;
    setIsSubmitting(true);
    try {
      const membersRef = ref(db, `groups/${id}/members`);
      const newMemberRef = push(membersRef);
      const token = Math.random().toString(36).substring(2, 15);
      
      // Step 1: Save to Realtime Database
      await set(newMemberRef, { 
        email: singleEmail, 
        token, 
        status: 'invitation_sent' 
      });

      // Step 2: Automated Email Dispatch (via local relay)
      const invited = await sendAutoInviteFromRelay(singleEmail, token);
      
      if (invited) {
        toast.success(`Identity Registry updated. ${singleEmail} has been automatically invited.`);
      } else {
        toast.warning(`Registry updated, but the automated email failed. Is your server/index.js running?`);
      }

      setShowAddModal(false);
      setSingleEmail("");
    } catch (error: any) {
      toast.error("Process failed.");
    } finally { setIsSubmitting(false); }
  };

  const handleAddExcel = async () => {
    if (!excelFile || !emailColumn || !id) return;
    setIsSubmitting(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = xlsx.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const rows: any[] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        const membersRef = ref(db, `groups/${id}/members`);
        
        let successCount = 0;
        for (const row of rows) {
          const email = row[emailColumn];
          if (email) {
            const newMemberRef = push(membersRef);
            const token = Math.random().toString(36).substring(2, 15);
            await set(newMemberRef, { email, token, status: 'invitation_sent' });
            
            // Dispatch automated email for each member
            await sendAutoInviteFromRelay(email, token);
            successCount++;
          }
        }
        
        toast.success(`Batch Registry Update Complete. ${successCount} automated invitations dispatched.`);
        setShowAddModal(false);
        setExcelFile(null);
      } catch (error) { toast.error("Processing failed"); }
      finally { setIsSubmitting(false); }
    };
    reader.readAsArrayBuffer(excelFile);
  };

  const handleIssueCertificates = async () => {
    if (!id || !group) return;
    const members = group.members || {};
    const acceptedKeys = Object.keys(members).filter(key => members[key].status === 'accepted');
    if (acceptedKeys.length === 0) {
      toast.warning("No accepted registry entries for issuance.");
      return;
    }
    setIsSubmitting(true);
    try {
      const updates: any = {};
      acceptedKeys.forEach(key => {
        updates[`groups/${id}/members/${key}/status`] = 'credential_issued';
        updates[`groups/${id}/members/${key}/issuedAt`] = new Date().toISOString();
      });
      await update(ref(db), updates);
      toast.success("All certificates issued via Realtime Registry!");
    } catch (error) { toast.error("Issuance protocol failed."); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-800">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative">
        <header className="flex items-center justify-between px-8 py-3 bg-white border-b border-slate-200 sticky top-0 z-20">
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
            <button onClick={() => navigate('/groups')} className="flex items-center gap-1.5 text-slate-400 hover:text-blue-600 transition-colors"><ArrowLeft size={14} /> Groups</button>
            <span className="text-slate-200">/</span><span className="text-slate-800">{group?.name || 'Registry Portal'}</span>
          </div>
          <div className="flex items-center gap-3">
             <Button onClick={handleIssueCertificates} disabled={isSubmitting || !group} className="h-8 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] uppercase font-black tracking-widest rounded-md shadow-md shadow-emerald-500/10 transition-all active:scale-95">
                <Send size={14} className="mr-1.5" /> Issue Credentials
             </Button>
          </div>
        </header>

        <div className="p-8 max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500">
           {isLoading ? (
             <div className="h-64 flex flex-col items-center justify-center border-4 border-dashed border-slate-50 rounded-[48px] animate-pulse">
                <div className="w-10 h-10 border-4 border-slate-50 border-b-blue-600 rounded-full animate-spin mb-4" />
                <div className="font-bold text-slate-300 uppercase tracking-[0.2em] text-[10px]">Realtime Registry Sync...</div>
             </div>
           ) : group ? (
             <>
               <div className="bg-white rounded-[40px] border border-slate-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row">
                  <div className={`w-full md:w-1/3 h-64 md:h-auto ${group.designDetails?.color || 'bg-blue-600'} flex items-center justify-center relative p-12 overflow-hidden`}>
                     {group.designDetails?.bgImage && <img src={group.designDetails.bgImage} className="absolute inset-0 w-full h-full object-cover opacity-50" />}
                     <div className="z-10 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl relative w-full animate-in zoom-in slide-in-from-bottom-2 duration-700">
                        <Award size={48} className="text-white mb-6 opacity-80" />
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white opacity-60 mb-2 leading-none">Registry Protocol</p>
                        <p className="text-2xl font-black text-white leading-none uppercase">{group.designDetails?.name || 'Standard'}</p>
                     </div>
                  </div>
                  <div className="p-12 flex-1 space-y-8">
                     <div><h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase mb-4">{group.name}</h1><p className="text-slate-500 font-medium leading-relaxed max-w-xl">{group.description || 'Active directory connected to Realtime Database.'}</p></div>
                     <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 pt-8 border-t border-slate-50">
                        <div><p className="text-[10px] uppercase font-black text-slate-300 tracking-widest mb-2 leading-none">Registry Count</p><p className="text-2xl font-black text-slate-900 leading-none">{Object.keys(group.members || {}).length}</p></div>
                        <div><p className="text-[10px] uppercase font-black text-slate-300 tracking-widest mb-2 leading-none">Status: Issued</p><p className="text-2xl font-black text-emerald-600 leading-none">{Object.keys(group.members || {}).filter(k=>group.members[k].status==='credential_issued').length}</p></div>
                        <div><p className="text-[10px] uppercase font-black text-slate-300 tracking-widest mb-2 leading-none">Status: Accepted</p><p className="text-2xl font-black text-blue-600 leading-none">{Object.keys(group.members || {}).filter(k=>group.members[k].status==='accepted').length}</p></div>
                        <div><p className="text-[10px] uppercase font-black text-slate-300 tracking-widest mb-2 leading-none">Registry Init</p><p className="text-[11px] font-black text-slate-800 uppercase leading-none">{group.createdAt ? new Date(group.createdAt).toLocaleDateString() : 'Active'}</p></div>
                     </div>
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="flex items-center justify-between px-2">
                     <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Active Registry Entries</h2>
                     <Button onClick={() => setShowAddModal(true)} className="h-10 px-6 bg-black text-white font-black uppercase text-[10px] tracking-widest rounded-xl shadow-xl shadow-black/10 transition-all active:scale-95"><Plus size={16} className="mr-2" /> Add Identity</Button>
                  </div>

                  <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden min-h-[300px]">
                     <table className="w-full text-left">
                        <thead className="bg-slate-50/50 border-b border-slate-100"><tr className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]"><th className="px-10 py-6">Member Identity</th><th className="px-10 py-6">Registry Status</th><th className="px-10 py-6">Protocol Action</th><th className="px-10 py-6"></th></tr></thead>
                        <tbody className="divide-y divide-slate-50">
                           {!group.members || Object.keys(group.members).length === 0 ? (
                              <tr><td colSpan={4} className="py-24 text-center text-slate-300 font-bold uppercase text-[10px] tracking-widest opacity-40">No entries in registry</td></tr>
                           ) : (
                              Object.keys(group.members).map((key) => {
                                 const member = group.members[key];
                                 return (
                                    <tr key={key} className="text-xs font-bold text-slate-600 hover:bg-slate-50/50 transition-colors group/row border-b border-slate-50/50">
                                       <td className="px-10 py-6 font-black uppercase tracking-tight">{member.email}</td>
                                       <td className="px-10 py-6">
                                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ring-1 ${member.status === 'credential_issued' ? 'bg-emerald-50 text-emerald-600 ring-emerald-100' : member.status === 'accepted' ? 'bg-blue-50 text-blue-600 ring-blue-100' : 'bg-orange-50 text-orange-400 ring-orange-100'}`}>
                                             {member.status.replace('_', ' ')}
                                          </span>
                                       </td>
                                       <td className="px-10 py-6">
                                          <div className="flex items-center gap-2">
                                             <button onClick={() => {
                                                const link = `${window.location.origin}/accept-invitation?groupId=${id}&email=${encodeURIComponent(member.email)}&token=${member.token}`;
                                                navigator.clipboard.writeText(link);
                                                toast.success("Invite link copied.");
                                             }} className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-100 text-slate-300 hover:text-blue-600" title="Copy Link"><Copy size={12}/></button>
                                             <Mail size={12} className="ml-1 text-slate-200" />
                                          </div>
                                       </td>
                                       <td className="px-10 py-6 text-right"><button onClick={()=>remove(ref(db, `groups/${id}/members/${key}`))} className="text-slate-200 hover:text-red-500 transition-all opacity-0 group-hover/row:opacity-100"><Trash2 size={16} /></button></td>
                                    </tr>
                                 );
                              })
                           )}
                        </tbody>
                     </table>
                  </div>
               </div>
             </>
           ) : (
             <div className="h-64 flex flex-col items-center justify-center font-bold text-slate-300 uppercase tracking-widest text-[10px] opacity-50">Active Registry Not Found.</div>
           )}
        </div>

        {showAddModal && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
              <div className="bg-white rounded-[56px] w-full max-w-xl p-12 overflow-hidden shadow-2xl relative animate-in zoom-in duration-300 border border-slate-100">
                 <div className="flex justify-between items-center mb-10"><h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">Add Identity</h2><X className="cursor-pointer text-slate-300 hover:text-slate-900 transition-colors" onClick={()=>setShowAddModal(false)} /></div>
                 <div className="flex gap-10 border-b border-slate-100 mb-10">
                    <button onClick={()=>setAddMode('single')} className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${addMode === 'single' ? 'text-blue-600' : 'text-slate-400'}`}>Single {addMode === 'single' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full" />}</button>
                    <button onClick={()=>setAddMode('excel')} className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${addMode === 'excel' ? 'text-blue-600' : 'text-slate-400'}`}>Bulk Import {addMode === 'excel' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full" />}</button>
                 </div>
                 {addMode === 'single' ? (
                    <div className="space-y-10">
                       <input value={singleEmail} onChange={(e)=>setSingleEmail(e.target.value)} placeholder="Member Identity Email..." className="w-full h-16 bg-slate-50 border border-slate-100 rounded-3xl px-8 text-sm font-black outline-none focus:ring-4 focus:ring-blue-50 transition-all font-display" />
                       <Button onClick={handleAddSingle} disabled={isSubmitting || !singleEmail} className="w-full h-16 bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-[32px] shadow-2xl shadow-blue-600/20 active:scale-95 transition-all">Add & Dispatch Invitation</Button>
                    </div>
                 ) : (
                    <div className="space-y-8">
                       <div className={`border-4 border-dashed rounded-[48px] p-16 flex flex-col items-center justify-center transition-all ${excelFile ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100 hover:border-blue-100'}`}>
                          <UploadCloud size={48} className={excelFile ? 'text-emerald-500' : 'text-slate-200'} />
                          <p className="mt-8 text-xs font-black text-slate-900 uppercase tracking-tight">{excelFile ? excelFile.name : 'Bulk Data Pipeline'}</p>
                          <input type="file" id="bulk" className="hidden" onChange={(e)=>e.target.files && setExcelFile(e.target.files[0])} />
                          <button onClick={()=>document.getElementById('bulk')?.click()} className="mt-4 text-[10px] font-black uppercase text-blue-600 tracking-widest leading-none">Select Archive</button>
                       </div>
                       <input value={emailColumn} onChange={(e)=>setEmailColumn(e.target.value)} placeholder="Email Column Header (e.g. Email)..." className="w-full h-12 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-blue-100" />
                       <Button onClick={handleAddExcel} disabled={isSubmitting || !excelFile} className="w-full h-16 bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-[32px] shadow-2xl shadow-blue-600/20 active:scale-95 transition-all">Batch Sync Sync</Button>
                    </div>
                 )}
              </div>
           </div>
        )}
      </main>
    </div>
  );
};

export default GroupDetails;
