import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Lock, User, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (success: boolean, role: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Hardcoded credentials for the admin panel
    if (username === 'sadmin' && password === '12345') {
       setTimeout(() => {
        setIsLoading(false);
        onLogin(true, 'sadmin');
      }, 500);
    } else if (username === 'admin' && password === '987654') {
      // Simulate network delay
      setTimeout(() => {
        setIsLoading(false);
        onLogin(true, 'admin');
      }, 500);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setError('Invalid username or password');
      }, 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background with Indian education theme images */}
      <div className="absolute inset-0 z-0">
        <div className="grid grid-cols-2 lg:grid-cols-3 h-full gap-2 opacity-10 grayscale hover:grayscale-0 transition-all duration-1000">
          <img 
            src="https://picsum.photos/seed/coaching1/800/600" 
            alt="Classroom"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://picsum.photos/seed/student/800/600" 
            alt="Students"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://picsum.photos/seed/university/800/600" 
            alt="University"
            className="w-full h-full object-cover hidden lg:block"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://picsum.photos/seed/books/800/600" 
            alt="Study"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://picsum.photos/seed/writing/800/600" 
            alt="Exam"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://picsum.photos/seed/library/800/600" 
            alt="Library"
            className="w-full h-full object-cover hidden lg:block"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFFBEB]/90 via-[#FFFBEB]/80 to-[#FFFBEB]/70" />
      </div>

      <Card className="w-full max-w-md shadow-2xl border-none z-10 relative bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center pb-8 pt-10">
          <div className="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-primary/20">
            <Lock className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-[#4A3728]">Admin Access</CardTitle>
          <CardDescription className="text-[#8C7E6A]">
            Enter your credentials to access Sakshi Computer Center portal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="username"
                  placeholder="admin"
                  className="pl-10 h-11 border-gray-200 focus:border-primary/50"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••"
                  className="pl-10 h-11 border-gray-200 focus:border-primary/50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-xs font-medium text-destructive bg-destructive/10 p-3 rounded-lg animate-in fade-in zoom-in-95">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <Button type="submit" className="w-full h-11 mt-4 text-base font-semibold shadow-lg shadow-primary/20" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 pb-10 pt-4">
          <div className="text-center text-xs text-[#8C7E6A] space-y-1">
            <p className="font-semibold text-primary/80">Sakshi Computer Center</p>
            <p className="font-medium text-foreground/80">Digital Communique Private Limited</p>
            <p>© 2026 All rights reserved.</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
