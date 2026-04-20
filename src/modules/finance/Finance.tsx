import React from 'react';
import { 
  IndianRupee, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Download, 
  Filter, 
  Plus,
  Search,
  TrendingUp,
  TrendingDown,
  Wallet
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MOCK_TRANSACTIONS } from '@/src/lib/mockData';
import { cn } from '@/lib/utils';

export default function Finance() {
  const totalIncome = MOCK_TRANSACTIONS.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = MOCK_TRANSACTIONS.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const netProfit = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      {/* Finance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-green-50 border-green-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Total Income</p>
                <h3 className="text-2xl font-bold text-green-900 mt-1">₹{totalIncome.toLocaleString()}</h3>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <ArrowUpCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-green-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Total Expenses</p>
                <h3 className="text-2xl font-bold text-red-900 mt-1">₹{totalExpense.toLocaleString()}</h3>
              </div>
              <div className="p-3 bg-red-100 rounded-xl">
                <ArrowDownCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-red-700">
              <TrendingDown className="w-3 h-3 mr-1" />
              <span>+5.2% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">Net Profit</p>
                <h3 className="text-2xl font-bold mt-1">₹{netProfit.toLocaleString()}</h3>
              </div>
              <div className="p-3 bg-white/10 rounded-xl">
                <Wallet className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs opacity-80">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>Healthy cash flow</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search transactions..." className="pl-10" />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Category
          </Button>
          
          <Dialog>
            <DialogTrigger
              render={
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Transaction
                </Button>
              }
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Transaction</DialogTitle>
                <DialogDescription>Record a new income or expense entry.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Amount (₹)</label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fees">Student Fees</SelectItem>
                      <SelectItem value="salary">Staff Salary</SelectItem>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="bills">Utility Bills</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Description</label>
                  <Input placeholder="Enter details..." />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input type="date" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Save Transaction</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transaction Ledger</CardTitle>
              <CardDescription>Detailed record of all financial activities.</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Download GST Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_TRANSACTIONS.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="text-sm text-muted-foreground">{transaction.date}</TableCell>
                  <TableCell className="font-medium">{transaction.description}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{transaction.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {transaction.type === 'income' ? (
                        <ArrowUpCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowDownCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span className={transaction.type === 'income' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className={cn(
                    "text-right font-bold",
                    transaction.type === 'income' ? "text-green-700" : "text-red-700"
                  )}>
                    {transaction.type === 'income' ? '+' : '-'} ₹{transaction.amount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
