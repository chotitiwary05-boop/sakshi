import React from 'react';
import { 
  Printer, 
  X, 
  Building2, 
  CheckCircle2, 
  Share2, 
  Send 
} from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { StudentFeeInstallment, Student } from '@/src/types';

interface DigitalReceiptModalProps {
  receipt: {
    student: Student;
    installment: StudentFeeInstallment;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DigitalReceiptModal({ receipt, isOpen, onClose }: DigitalReceiptModalProps) {
  if (!receipt) return null;

  const { student, installment } = receipt;
  const balance = student.totalFees - student.feesPaid;

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `*SAKSHI COMPUTER INSTITUTE - FEE RECEIPT*\n` +
      `--------------------------------\n` +
      `Receipt No: ${installment.receiptNo}\n` +
      `Date: ${installment.date}\n` +
      `Student Name: ${student.name}\n` +
      `Reg No: ${student.regNo || 'ASI-6281'}\n` +
      `Course: ${student.courseName || 'D.C.A.'}\n` +
      `Installment Amount: ₹${installment.amountPaid.toLocaleString('en-IN')}\n` +
      `Payment Mode: ${installment.paymentMode.toUpperCase()}\n` +
      `--------------------------------\n` +
      `Total Course Fee: ₹${student.totalFees.toLocaleString('en-IN')}\n` +
      `Total Paid Till Date: ₹${student.feesPaid.toLocaleString('en-IN')}\n` +
      `Remaining Balance: ₹${balance > 0 ? balance.toLocaleString('en-IN') : '0 (FULL PAID)'}\n` +
      `--------------------------------\n` +
      `Thank you! Director: Santosh Kushwaha\n` +
      `Near Bus Stand Pawai / Near Jain Mandir Mohindra`
    );
    window.open(`https://wa.me/91${student.whatsappNo || student.phone || '9926654640'}?text=${text}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-slate-900 border-none shadow-2xl">
        {/* Top Control Bar */}
        <div className="p-4 bg-slate-900 flex justify-between items-center text-white print:hidden">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span className="font-bold text-sm">Official Digital Fee Receipt</span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleWhatsAppSend} className="gap-1.5 h-8 text-xs font-bold text-green-400 border-green-500/50 hover:bg-green-500/20">
              <Send className="w-3.5 h-3.5" />
              WhatsApp
            </Button>
            <Button size="sm" onClick={() => window.print()} className="gap-1.5 h-8 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950">
              <Printer className="w-3.5 h-3.5" />
              Print
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-white" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Printable Fee Receipt */}
        <div className="p-6 bg-slate-100 flex justify-center">
          <div 
            id="printable-receipt"
            className="w-[360px] bg-white rounded-xl shadow-lg border-2 border-slate-300 p-5 font-sans space-y-4 text-slate-900 relative"
          >
            {/* Header Branding */}
            <div className="text-center border-b-2 border-slate-900 pb-3">
              <div className="inline-block bg-slate-900 text-amber-400 font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-widest mb-1">
                Fee Receipt
              </div>
              <h3 className="font-black text-lg tracking-tight text-slate-900 uppercase">SAKSHI COMPUTER INSTITUTE</h3>
              <p className="text-[10px] font-bold text-amber-800">Affiliated with MCU Bhopal • Reg. No. 6281</p>
              <p className="text-[9px] text-slate-500">Pawai (Near Bus Stand) & Mohindra (Near Jain Mandir), Dist. Panna (M.P.)</p>
              <p className="text-[9px] font-mono text-slate-600 mt-0.5">Mob: +91 99266 54640</p>
            </div>

            {/* Receipt Metadata */}
            <div className="grid grid-cols-2 text-xs border-b pb-2 gap-y-1">
              <div>
                <span className="text-slate-500 font-medium">Receipt No: </span>
                <span className="font-mono font-bold text-slate-900">{installment.receiptNo}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 font-medium">Date: </span>
                <span className="font-mono font-bold">{installment.date}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Reg No: </span>
                <span className="font-mono font-bold">{student.regNo || 'ASI-6281'}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 font-medium">Mode: </span>
                <span className="font-bold uppercase text-green-700">{installment.paymentMode}</span>
              </div>
            </div>

            {/* Student & Payment Info Table */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b">
                <span className="text-slate-500">Student Name:</span>
                <span className="font-bold text-slate-900">{student.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-slate-500">Father's Name:</span>
                <span className="font-medium">{student.fatherName || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-slate-500">Course Allocated:</span>
                <span className="font-extrabold text-amber-900">{student.courseName || 'D.C.A.'}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-slate-500">Remarks / Installment:</span>
                <span className="font-medium text-slate-800">{installment.remarks || 'Fee Installment'}</span>
              </div>
            </div>

            {/* Amount Box */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-3 text-center my-2">
              <p className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider">Amount Paid Received</p>
              <h2 className="text-2xl font-black text-slate-900 my-0.5">₹{installment.amountPaid.toLocaleString('en-IN')}</h2>
              <p className="text-[9px] text-slate-500 capitalize italic">(In words: {installment.amountPaid} Rupees Only)</p>
            </div>

            {/* Summary Balance Table */}
            <div className="bg-slate-50 rounded-lg p-2 text-[11px] space-y-1 font-medium border text-slate-700">
              <div className="flex justify-between">
                <span>Total Course Fee:</span>
                <span>₹{student.totalFees.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-green-700 font-bold">
                <span>Total Paid Till Date:</span>
                <span>₹{student.feesPaid.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-t pt-1 font-black text-slate-900">
                <span>Remaining Balance Due:</span>
                <span className={balance > 0 ? "text-red-600" : "text-green-600"}>
                  {balance > 0 ? `₹${balance.toLocaleString('en-IN')}` : 'NIL (FULLY CLEARED)'}
                </span>
              </div>
            </div>

            {/* Signatures & Footer */}
            <div className="pt-4 flex justify-between items-end text-[9px]">
              <div>
                <p className="text-slate-400">Received By: Operator</p>
                <p className="text-slate-500 font-bold">Computer System Entry</p>
              </div>
              <div className="text-center">
                <div className="w-20 border-b border-slate-400 mb-0.5"></div>
                <p className="font-extrabold text-slate-900 uppercase">Santosh Kushwaha</p>
                <p className="text-slate-500">Director Signature</p>
              </div>
            </div>

            <div className="text-center text-[8px] text-slate-400 pt-1 border-t">
              * This is a computer generated receipt. Fees once paid are non-refundable.
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
