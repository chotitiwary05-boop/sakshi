import React from 'react';
import { 
  Printer, 
  X, 
  QrCode, 
  ShieldCheck, 
  Building2, 
  Phone, 
  MapPin, 
  Download 
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Student } from '@/src/types';

interface StudentIdCardModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function StudentIdCardModal({ student, isOpen, onClose }: StudentIdCardModalProps) {
  if (!student) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-slate-900 border-none shadow-2xl">
        <div className="p-4 bg-slate-900 flex justify-between items-center text-white print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm">Digital Student ID Card</span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={handlePrint} className="gap-1.5 h-8 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950">
              <Printer className="w-3.5 h-3.5" />
              Print Card
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-white" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Printable ID Card Body */}
        <div className="p-6 bg-slate-100 flex justify-center">
          <div 
            id="printable-id-card"
            className="w-[320px] bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-slate-300 relative font-sans flex flex-col"
            style={{ minHeight: '480px' }}
          >
            {/* Top Branding Banner */}
            <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white p-4 text-center relative border-b-4 border-amber-400">
              <div className="flex justify-center items-center gap-2 mb-1">
                <div className="w-7 h-7 bg-amber-400 rounded-lg flex items-center justify-center font-black text-slate-950 text-sm shadow">
                  S
                </div>
                <h3 className="font-black text-base tracking-tight text-amber-100">SAKSHI</h3>
              </div>
              <p className="text-[11px] font-extrabold uppercase tracking-widest text-amber-300">Computer Institute</p>
              <p className="text-[9px] text-amber-200/90 font-medium mt-0.5">Reg. No. 6281 • Pawai & Mohindra, Panna (M.P.)</p>
              <div className="mt-1 bg-amber-400/20 text-amber-200 text-[8px] font-bold py-0.5 px-2 rounded-full inline-block uppercase tracking-wider">
                Affiliated with MCU Bhopal
              </div>
            </div>

            {/* Student Photo & Details */}
            <div className="p-4 flex-1 flex flex-col items-center text-center space-y-3">
              {/* Photo Box */}
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl border-4 border-amber-500 shadow-md overflow-hidden bg-slate-100 flex items-center justify-center">
                  <img 
                    src={student.photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} 
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 bg-slate-900 text-amber-400 text-[9px] font-bold px-2.5 py-0.5 rounded-full border border-amber-400">
                  STUDENT
                </div>
              </div>

              {/* Name & Reg */}
              <div className="pt-1">
                <h4 className="font-extrabold text-slate-900 text-base leading-snug">{student.name}</h4>
                {student.nameHindi && <p className="text-xs text-amber-800 font-bold">{student.nameHindi}</p>}
                <p className="text-[10px] font-black text-slate-500 tracking-wider uppercase mt-1">
                  REG NO: <span className="text-slate-900 font-mono font-bold">{student.regNo || 'ASI-6281-2024'}</span>
                </p>
              </div>

              {/* Key Details Grid */}
              <div className="w-full bg-amber-50/60 rounded-xl p-3 border border-amber-200/60 text-left text-xs space-y-1.5">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-medium">Course:</span>
                  <span className="font-extrabold text-slate-900">{student.courseName || 'D.C.A.'}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-medium">Batch Timing:</span>
                  <span className="font-bold text-slate-800">{student.batchTiming || '08:00 AM - 10:00 AM'}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-medium">Father's Name:</span>
                  <span className="font-bold text-slate-800">{student.fatherName || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-medium">Mobile / WhatsApp:</span>
                  <span className="font-mono font-bold text-slate-800">{student.whatsappNo || student.phone || '+91 9926654640'}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-medium">Address:</span>
                  <span className="font-medium text-slate-800 text-[10px] truncate max-w-[170px]">{student.address || 'Panna (M.P.)'}</span>
                </div>
              </div>

              {/* QR Code & Validity */}
              <div className="w-full flex items-center justify-between pt-2 border-t border-slate-200">
                <div className="flex items-center gap-2 text-left">
                  <div className="p-1 bg-slate-100 rounded border">
                    <QrCode className="w-8 h-8 text-slate-800" />
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase">Valid Session</p>
                    <p className="text-[10px] font-black text-amber-700">2024 - 2025</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-16 border-b border-slate-400 mb-0.5"></div>
                  <p className="text-[8px] font-bold text-slate-600 uppercase">Director Sign</p>
                  <p className="text-[7px] text-slate-400">Santosh Kushwaha</p>
                </div>
              </div>
            </div>

            {/* Bottom Strip */}
            <div className="bg-slate-900 text-white p-2 text-center text-[8px] font-bold uppercase tracking-wider">
              If lost, return to: Near Jain Mandir, Mohindra / Near Bus Stand, Pawai
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
