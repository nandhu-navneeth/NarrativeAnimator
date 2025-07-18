'use client';

import { useApp } from '@/components/app-provider';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function StoryInput() {
  const { story, setStory } = useApp();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Your Story</CardTitle>
        <CardDescription>
          Enter your story, scene, or narrative below. Each sentence will be
          treated as a separate scene.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="story-input" className="sr-only">Narrative Text</Label>
          <Textarea
            id="story-input"
            placeholder="Once upon a time in a land far, far away..."
            className="min-h-[150px] md:min-h-[200px] text-base"
            value={story}
            onChange={e => setStory(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
