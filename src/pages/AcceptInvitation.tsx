import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { CheckCircle2, AlertCircle, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { ref, get, update } from "firebase/database";

const AcceptInvitation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'already_accepted'>('loading');
  const [groupName, setGroupName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const groupId = searchParams.get('groupId');

  useEffect(() => {
    const handleAccept = async () => {
      if (!email || !token || !groupId) {
        setStatus('error');
        setErrorMsg("Missing invitation parameters in the link.");
        return;
      }

      try {
        const groupRef = ref(db, `groups/${groupId}`);
        const groupSnap = await get(groupRef);

        if (!groupSnap.exists()) {
          setStatus('error');
          setErrorMsg("The group associated with this invite no longer exists.");
          return;
        }

        const groupData = groupSnap.val();
        const members = groupData.members || {};
        
        const memberKey = Object.keys(members).find(key => 
          members[key].email === email && members[key].token === token
        );

        if (!memberKey) {
          setStatus('error');
          setErrorMsg("No matching invitation record found for this link.");
          return;
        }

        const member = members[memberKey];
        if (member.status === 'accepted' || member.status === 'credential_issued') {
          setStatus('already_accepted');
          setGroupName(groupData.name);
          return;
        }

        const memberRef = ref(db, `groups/${groupId}/members/${memberKey}`);
        await update(memberRef, {
           status: 'accepted',
           acceptedAt: new Date().toISOString()
        });

        setStatus('success');
        setGroupName(groupData.name);
      } catch (error: any) {
        setStatus('error');
        setErrorMsg("Communication error with the Realtime Registry.");
      }
    };

    handleAccept();
  }, [email, token, groupId]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 font-sans">
      <div className="max-w-lg w-full bg-white rounded-[64px] shadow-[0_32px_120px_-20px_rgba(0,0,0,0.1)] p-16 text-center space-y-12 animate-in slide-in-from-bottom-10 duration-700 border border-white">
        {status === 'loading' && (
          <div className="py-20 flex flex-col items-center gap-10">
            <div className="w-20 h-20 border-4 border-slate-50 border-b-blue-600 rounded-full animate-spin"></div>
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-[0.3em] leading-none">Access Registry...</h1>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-12 animate-in zoom-in duration-500 delay-200">
            <div className="w-32 h-32 bg-emerald-50 text-emerald-600 rounded-[48px] flex items-center justify-center mx-auto shadow-inner"><CheckCircle2 size={56} className="animate-in slide-in-from-bottom-2 duration-1000 delay-500" /></div>
            <div>
               <h1 className="text-4xl font-black text-slate-900 leading-none uppercase mb-6 tracking-tight">Verified!</h1>
               <p className="text-slate-400 font-bold max-w-xs mx-auto leading-relaxed">
                  Registry synchronization for <span className="text-slate-800 uppercase font-black">{groupName}</span> is complete.
               </p>
            </div>
          </div>
        )}

        {(status === 'already_accepted' || status === 'success') && (
           <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 delay-700">
              {status === 'already_accepted' && (
                <div className="space-y-8">
                    <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-[32px] flex items-center justify-center mx-auto opacity-60"><Award size={48} /></div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Active Enrollment</h2>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest leading-none">Status: Enrolled in {groupName}</p>
                </div>
              )}
              <Button onClick={() => navigate('/credentials')} className="w-full h-16 bg-black hover:bg-slate-800 text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-[32px] flex items-center justify-center gap-4 active:scale-95 transition-all shadow-2xl shadow-black/10 mt-12">
                Access Credentials <ArrowRight size={20} />
              </Button>
           </div>
        )}

        {status === 'error' && (
          <div className="space-y-12 py-10 animate-in shake-in duration-500">
            <div className="w-24 h-24 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto ring-4 ring-white"><AlertCircle size={48} /></div>
            <div><h1 className="text-2xl font-black text-slate-900 uppercase mb-4 tracking-tight leading-none leading-none">Security Fault</h1><p className="text-red-500 font-bold bg-white p-8 rounded-[40px] border border-red-50 text-xs uppercase tracking-widest leading-loose">{errorMsg}</p></div>
            <Link to="/" className="inline-block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-blue-600 transition-colors">Return to Root Portal</Link>
          </div>
        )}
      </div>
      <div className="mt-16 flex items-center gap-4 text-slate-300 opacity-60"><div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"/><p className="text-[10px] font-black uppercase tracking-[0.4em]">RTDB Secure Stack 2.4 - Sync Active</p></div>
    </div>
  );
};

export default AcceptInvitation;
