import React from 'react';
import { 
  Users, 
  IndianRupee, 
  Clock, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Layout,
  ExternalLink
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MOCK_STUDENTS, MOCK_BATCHES, MOCK_TRANSACTIONS } from '@/src/lib/mockData';
import { cn } from '@/lib/utils';

const admissionData = [
  { month: 'Jan', count: 45 },
  { month: 'Feb', count: 52 },
  { month: 'Mar', count: 38 },
  { month: 'Apr', count: 65 },
  { month: 'May', count: 48 },
  { month: 'Jun', count: 72 },
];

const revenueData = [
  { month: 'Jan', amount: 120000 },
  { month: 'Feb', amount: 150000 },
  { month: 'Mar', amount: 135000 },
  { month: 'Apr', amount: 180000 },
  { month: 'May', amount: 165000 },
  { month: 'Jun', amount: 210000 },
];

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: { value: string; positive: boolean };
  description: string;
}

const StatCard = ({ title, value, icon: Icon, trend, description }: StatCardProps) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          <h3 className="text-xl font-black mt-1 text-slate-800 tracking-tight">{value}</h3>
        </div>
        <div className="p-3 bg-primary/10 rounded-xl">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        {trend && (
          <span className={cn(
            "flex items-center text-xs font-medium",
            trend.positive ? "text-green-600" : "text-red-600"
          )}>
            {trend.positive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
            {trend.value}
          </span>
        )}
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
    </CardContent>
  </Card>
);

export default function Dashboard({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  const totalStudents = MOCK_STUDENTS.length * 10; // Mocking more
  const totalRevenue = MOCK_TRANSACTIONS.reduce((acc, curr) => curr.type === 'income' ? acc + curr.amount : acc, 0);
  const activeBatches = MOCK_BATCHES.length;
  const pendingFees = MOCK_STUDENTS.reduce((acc, curr) => acc + (curr.totalFees - curr.feesPaid), 0);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Students" 
          value={totalStudents.toString()} 
          icon={Users}
          trend={{ value: "12%", positive: true }}
          description="from last month"
        />
        <StatCard 
          title="Total Revenue" 
          value={`₹${totalRevenue.toLocaleString()}`} 
          icon={IndianRupee}
          trend={{ value: "8%", positive: true }}
          description="this month"
        />
        <StatCard 
          title="Pending Fees" 
          value={`₹${pendingFees.toLocaleString()}`} 
          icon={Clock}
          trend={{ value: "5%", positive: false }}
          description="needs attention"
        />
        <StatCard 
          title="Active Batches" 
          value={activeBatches.toString()} 
          icon={TrendingUp}
          description="currently running"
        />
      </div>

      {/* Website Manager Access Banner */}
      <Card className="border-none bg-gradient-to-r from-slate-900 to-slate-800 text-white overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-8 opacity-10 scale-150 rotate-12 group-hover:scale-175 transition-transform duration-500 pointer-events-none">
           <Globe className="w-32 h-32" />
        </div>
        <CardContent className="p-5 md:p-6 relative z-10 flex flex-col xl:flex-row items-center xl:items-start justify-between gap-6">
          <div className="space-y-1 text-center xl:text-left">
            <h3 className="text-lg md:text-xl font-bold flex items-center justify-center xl:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Website Manager Panel
            </h3>
            <p className="text-slate-400 font-medium max-w-xl text-xs md:text-sm">
              Control your public-facing institute website. Update courses, announcements, hero sliders, and gallery sections directly from this dedicated panel.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 w-full xl:w-auto">
             <Button 
               variant="outline" 
               className="flex-1 sm:flex-none bg-white/10 hover:bg-white/20 border-white/20 text-white font-bold px-4 h-10 gap-2 text-[10px] md:text-xs"
               onClick={() => window.open('/', '_blank')}
             >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Site
             </Button>
             <Button 
               className="flex-1 sm:flex-none bg-primary hover:bg-primary/90 text-white font-black px-6 h-10 gap-2 shadow-2xl shadow-primary/20 text-[10px] md:text-xs uppercase"
               onClick={() => setActiveTab?.('website-manager')}
             >
                <Layout className="w-3.5 h-3.5" />
                Open Manager
             </Button>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Admissions</CardTitle>
            <CardDescription>Number of new students enrolled per month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={admissionData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <Tooltip 
                    cursor={{ fill: '#F3F4F6' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="count" fill="#166534" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Monthly income growth analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#166534" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#166534" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#166534" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity / Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
            <CardDescription>Schedule for the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'Unit Test - Calculus', batch: 'Math-A1', date: 'Tomorrow, 10:00 AM', status: 'ready' },
                { title: 'NEET Mock Test', batch: 'NEET-P1', date: '15th March, 02:00 PM', status: 'pending' },
                { title: 'Chemistry Quiz', batch: 'JEE-C2', date: '18th March, 11:30 AM', status: 'ready' },
              ].map((exam, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg border border-secondary/30">
                  <div>
                    <p className="font-semibold">{exam.title}</p>
                    <p className="text-sm text-muted-foreground">{exam.batch} • {exam.date}</p>
                  </div>
                  <Button variant="outline" size="sm">Details</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fee Defaulters</CardTitle>
            <CardDescription>Students with pending payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_STUDENTS.filter(s => s.totalFees > s.feesPaid).map((student, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{student.name}</p>
                    <p className="text-xs text-destructive font-semibold">Pending: ₹{(student.totalFees - student.feesPaid).toLocaleString()}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
