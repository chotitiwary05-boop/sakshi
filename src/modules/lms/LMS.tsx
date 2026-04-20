import React from 'react';
import { 
  Search, 
  Filter, 
  Play, 
  Clock, 
  Tag, 
  Download, 
  MoreVertical,
  Plus,
  Video
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MOCK_VIDEOS } from '@/src/lib/mockData';
import { cn } from '@/lib/utils';

export default function LMS() {
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search lectures by title or subject..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Subject
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Upload Lecture
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_VIDEOS.map((video) => (
          <Card key={video.id} className="overflow-hidden group">
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                  <Play className="w-6 h-6 fill-current" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-[10px] font-bold rounded">
                {video.duration}
              </div>
            </div>
            <CardHeader className="p-4">
              <div className="flex justify-between items-start gap-2">
                <Badge variant="outline" className="text-[10px] h-5">{video.subject}</Badge>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
              <CardTitle className="text-base mt-2 line-clamp-1">{video.title}</CardTitle>
              <CardDescription className="text-xs line-clamp-2">{video.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex flex-wrap gap-1">
                {video.tags.map(tag => (
                  <span key={tag} className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Tag className="w-3 h-3" /> {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 border-t flex justify-between items-center mt-auto">
              <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-2">
                <Clock className="w-3 h-3" /> 2 days ago
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                <Download className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
        
        {/* Empty State / Add New Placeholder */}
        <button className="border-2 border-dashed border-muted rounded-xl flex flex-col items-center justify-center p-8 text-muted-foreground hover:border-primary hover:text-primary transition-colors min-h-[300px]">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <Video className="w-6 h-6" />
          </div>
          <p className="font-medium">Upload New Lecture</p>
          <p className="text-xs">MP4, MKV or YouTube Link</p>
        </button>
      </div>
    </div>
  );
}
