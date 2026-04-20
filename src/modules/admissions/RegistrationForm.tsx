import React from 'react';
import { 
  Building2, 
  User, 
  MapPin, 
  Phone, 
  GraduationCap, 
  CheckSquare, 
  FileText,
  Printer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function RegistrationForm() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl font-bold text-primary italic uppercase underline decoration-2 underline-offset-4">Sakshi Computer Center</h1>
        <p className="text-lg font-bold">PAWAI DIST. PANNA (M.P.)</p>
        <div className="flex justify-between items-center px-4 mt-4 text-sm font-medium">
          <span>Form No. <span className="border-b border-black inline-block w-24"></span></span>
          <span className="text-right">Reg. 6281</span>
        </div>
        <div className="mt-4 border-t-2 border-b-2 border-primary py-2">
          <p className="text-sm font-semibold">Affiliated By :</p>
          <p className="font-bold text-primary">Makhanlal Chaturvedi National University of Journalism & Communication, Bhopal</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8 text-sm font-medium">
        <div className="space-y-1">
          <Label>Admission at session</Label>
          <Input placeholder="2024-25" />
        </div>
        <div className="flex items-center justify-center pt-6">
          <h2 className="text-xl font-bold uppercase tracking-widest border-2 border-black px-4 py-1">Admission Form</h2>
        </div>
        <div className="space-y-1">
          <Label>Date of Admission</Label>
          <Input type="date" />
        </div>
      </div>

      <form className="space-y-6">
        {/* Personal Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 items-center">
            <Label className="font-bold uppercase col-span-1">Name in English</Label>
            <Input className="col-span-3 border-b-2 border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0" placeholder="CAPITAL LETTERS ONLY" />
          </div>
          <div className="grid grid-cols-4 gap-4 items-center">
            <Label className="font-bold uppercase col-span-1">Name in Hindi</Label>
            <Input className="col-span-3 border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0" />
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="grid grid-cols-3 gap-2 items-center">
              <Label className="font-bold uppercase">Father Name</Label>
              <Input className="col-span-2 border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0" />
            </div>
            <div className="grid grid-cols-3 gap-2 items-center">
              <Label className="font-bold uppercase">Mother Name</Label>
              <Input className="col-span-2 border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="grid grid-cols-3 gap-2 items-center">
              <Label className="font-bold uppercase">Husband Name</Label>
              <Input className="col-span-2 border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0" />
            </div>
            <div className="grid grid-cols-3 gap-2 items-center">
              <Label className="font-bold uppercase">Date of Birth</Label>
              <Input type="date" className="col-span-2 border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0" />
            </div>
          </div>

          <div className="grid gap-4 items-center">
            <div className="grid grid-cols-3 gap-2 items-center">
              <Label className="font-bold uppercase">Aadhar No.</Label>
              <Input className="col-span-2 border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0" maxLength={12} />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-bold uppercase">Complete Postal Address</Label>
            <div className="space-y-4">
              <Input className="border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 h-12" />
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Label className="font-bold uppercase shrink-0">Pin Code</Label>
                  <Input className="border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0" />
                </div>
                <div className="flex items-center gap-2">
                  <Label className="font-bold uppercase shrink-0">WhatsApp No.</Label>
                  <Input className="border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Label className="font-bold uppercase shrink-0">M O 1-</Label>
                  <Input className="border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0" />
                </div>
                <div className="flex items-center gap-2">
                  <Label className="font-bold uppercase shrink-0">M O 2-</Label>
                  <Input className="border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Qualification Table */}
        <div className="space-y-4 pt-4">
          <Label className="font-bold uppercase text-lg">Qualification Details</Label>
          <Table className="border collapse">
            <TableHeader>
              <TableRow className="bg-primary/5">
                <TableHead className="border border-gray-300 font-bold text-center">Class</TableHead>
                <TableHead className="border border-gray-300 font-bold text-center">Year of Passing</TableHead>
                <TableHead className="border border-gray-300 font-bold text-center">Subject</TableHead>
                <TableHead className="border border-gray-300 font-bold text-center">Board/University</TableHead>
                <TableHead className="border border-gray-300 font-bold text-center">Division</TableHead>
                <TableHead className="border border-gray-300 font-bold text-center">Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {['10th', '12th', 'Graduation'].map((cls) => (
                <TableRow key={cls}>
                  <TableCell className="border border-gray-300 font-bold p-1 text-center">{cls}</TableCell>
                  <TableCell className="border border-gray-300 p-0"><Input className="border-none focus-visible:ring-0 h-8 rounded-none text-center" /></TableCell>
                  <TableCell className="border border-gray-300 p-0"><Input className="border-none focus-visible:ring-0 h-8 rounded-none text-center" /></TableCell>
                  <TableCell className="border border-gray-300 p-0"><Input className="border-none focus-visible:ring-0 h-8 rounded-none text-center" /></TableCell>
                  <TableCell className="border border-gray-300 p-0"><Input className="border-none focus-visible:ring-0 h-8 rounded-none text-center" /></TableCell>
                  <TableCell className="border border-gray-300 p-0"><Input className="border-none focus-visible:ring-0 h-8 rounded-none text-center" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="grid grid-cols-4 gap-4 items-center pt-2">
            <Label className="font-bold uppercase col-span-1 text-xs">School/College & Place</Label>
            <Input className="col-span-3 border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 h-8" />
          </div>
        </div>

        {/* Selections */}
        <div className="grid grid-cols-2 gap-8 pt-4">
          <div className="space-y-3">
            <Label className="font-bold uppercase">Course :</Label>
            <RadioGroup className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dca" id="dca" />
                <Label htmlFor="dca">DCA</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pgdca" id="pgdca" />
                <Label htmlFor="pgdca">PGDCA</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-3">
            <Label className="font-bold uppercase">Medium :</Label>
            <RadioGroup className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hindi" id="hindi" />
                <Label htmlFor="hindi">Hindi</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="english" id="english" />
                <Label htmlFor="english">English</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="font-bold uppercase">Category :</Label>
          <RadioGroup className="flex gap-8">
            {['SC', 'ST', 'OBC', 'GEN'].map(cat => (
              <div key={cat} className="flex items-center space-x-2">
                <RadioGroupItem value={cat.toLowerCase()} id={cat} />
                <Label htmlFor={cat}>{cat}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="font-bold uppercase">Religion :</Label>
          <RadioGroup className="flex flex-wrap gap-x-8 gap-y-2">
            {['Hindu', 'Muslim', 'Sikh', 'Christian', 'Other'].map(rel => (
              <div key={rel} className="flex items-center space-x-2">
                <RadioGroupItem value={rel.toLowerCase()} id={rel} />
                <Label htmlFor={rel}>{rel}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label className="font-bold uppercase">Handicapped :</Label>
            <RadioGroup className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="h-yes" />
                <Label htmlFor="h-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="h-no" />
                <Label htmlFor="h-no">No</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-3">
            <Label className="font-bold uppercase">Sex :</Label>
            <RadioGroup className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="s-male" />
                <Label htmlFor="s-male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="s-female" />
                <Label htmlFor="s-female">Female</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label className="font-bold uppercase">Nationality :</Label>
            <RadioGroup className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="indian" id="n-indian" />
                <Label htmlFor="n-indian">Indian</Label>
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="n-other" />
                  <Label htmlFor="n-other">Other</Label>
                </div>
                <Input className="border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 h-6 text-xs" placeholder="Specify..." />
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-3">
            <Label className="font-bold uppercase">Marital Status :</Label>
            <RadioGroup className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="married" id="ms-married" />
                <Label htmlFor="ms-married">Married</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unmarried" id="ms-unmarried" />
                <Label htmlFor="ms-unmarried">Unmarried</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Signature Line */}
        <div className="pt-8 flex justify-end">
          <div className="text-center w-48">
            <div className="border-b border-black mb-1 h-8"></div>
            <p className="font-bold text-xs uppercase">Signature of Student</p>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Fees and Rules from Image */}
        <div className="space-y-6 pt-4 bg-gray-50/50 p-6 rounded-lg border border-dashed border-gray-300">
          <div className="grid grid-cols-3 gap-8 text-sm font-bold">
            <div className="space-y-2">
              <p className="underline underline-offset-4">कोर्स–</p>
              <p>प्रवेश शुल्क प्रवेश समय –</p>
              <p>प्रथम सेमेस्टर परीक्षा फार्म के समय –</p>
              <p>द्वितीय सेमेस्टर परीक्षा फार्म के समय –</p>
              <p className="text-base">कुल शुल्क –</p>
            </div>
            <div className="text-center space-y-2">
              <p>डी. सी. ए.</p>
              <p>4500</p>
              <p>3500</p>
              <p>3500</p>
              <p className="text-base underline">11500</p>
            </div>
            <div className="text-center space-y-2">
              <p>पी. जी. डी. सी. ए.</p>
              <p>5500</p>
              <p>3500</p>
              <p>3500</p>
              <p className="text-base underline">12500</p>
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <p className="font-bold underline">नियम–</p>
            <ol className="list-decimal pl-5 space-y-1 text-sm font-medium">
              <li>विद्यार्थी की उपस्थिति 80 प्रतिशत से कम होने पर परीक्षा फार्म नही भरा जायेगा। जिसके जिम्मेदार छात्र/छात्राये स्वयं होगे।</li>
              <li>उपरोक्त शुल्क निर्धारित समय तक जमा न होने पर परीक्षा फार्म नही भरा जायेगा। जिसके जिम्मेदार छात्र/छात्राये स्वयं होगे।</li>
              <li>छात्र/छात्राओं को संस्थान के नियमो का पालन करना होगा।</li>
              <li>किसी भी स्थिति में प्रवेश और शुल्क वापिस नही की जायेगी।</li>
            </ol>
          </div>
        </div>

        {/* Attachments Section */}
        <div className="space-y-4 pt-6">
          <p className="font-bold uppercase text-sm flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-primary" /> Attachment Documents:
          </p>
          <div className="pl-6 space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="doc1" />
              <Label htmlFor="doc1" className="text-sm">Proof for the Date of Birth (10th)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="doc2" />
              <Label htmlFor="doc2" className="text-sm">Qualification Exam Mark sheet (12th / Graduation)</Label>
            </div>
          </div>
        </div>

        {/* Declaration */}
        <div className="space-y-4 pt-6">
          <p className="font-extrabold uppercase text-sm border-b border-black inline-block">Declaration</p>
          <p className="text-sm leading-relaxed text-justify italic font-medium">
            Myself <span className="border-b border-black inline-block w-48 mx-1"></span> (S/O)(D/O) Mr <span className="border-b border-black inline-block w-48 mx-1"></span> 
            Hereby declare all the information this form are correct to the best of my knowledge and belief Declare that l follow all rules and regulation of institute. 
            If I break any rules of institute then institute can take decision against me and I follow all decision take by institute.
          </p>
        </div>

        {/* Final Signatures */}
        <div className="pt-12 flex justify-between items-end pb-8">
          <div className="text-center w-48">
            <div className="border-b border-black mb-1 h-8"></div>
            <p className="font-bold text-xs uppercase">Guardian Signature</p>
          </div>
          <div className="text-center w-48">
            <div className="border-b border-black mb-1 h-8"></div>
            <p className="font-bold text-xs uppercase">Signature of Student</p>
          </div>
        </div>

        <div className="print:hidden pt-8 border-t flex justify-between">
          <Button type="button" variant="outline" className="gap-2" onClick={() => window.print()}>
            <Printer className="w-4 h-4" /> Print Form
          </Button>
          <Button type="submit" className="gap-2">
            <Building2 className="w-4 h-4" /> Finalize Admission
          </Button>
        </div>
      </form>
    </div>
  );
}
