'use client';

import { useApp } from '@/components/app-provider';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { generateImagesAction, generateNarrationAction } from '@/lib/actions';
import type { Scene } from '@/types';
import { Image as ImageIcon, Loader2, Sparkles, Volume2, Wand2 } from 'lucide-react';
import NextImage from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useRef } from 'react';

interface StoryboardItemProps {
  scene: Scene;
  index: number;
}

export function StoryboardItem({ scene, index }: StoryboardItemProps) {
  const { updateScene, aiSettings } = useApp();
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleGenerateScene = async () => {
    updateScene(index, { isImageLoading: true, isNarrationLoading: true });

    const imagePromise = generateImagesAction({
      text: `${aiSettings.imagePrompt}\n\nScene: ${scene.text}`,
    });

    const narrationPromise = generateNarrationAction(
      `${aiSettings.narrationPrompt}\n\nNarration: ${scene.text}`
    );

    const [imageResult, narrationResult] = await Promise.all([
      imagePromise,
      narrationPromise,
    ]);

    const updates: Partial<Scene> = {};
    let hadError = false;

    if (imageResult.error) {
      toast({
        variant: 'destructive',
        title: 'Image Generation Failed',
        description: imageResult.error,
      });
      updates.isImageLoading = false;
      hadError = true;
    } else if (imageResult.data) {
      updates.imageUrl = imageResult.data.imageUrl;
      updates.isImageLoading = false;
    }

    if (narrationResult.error) {
      toast({
        variant: 'destructive',
        title: 'Narration Generation Failed',
        description: narrationResult.error,
      });
      updates.isNarrationLoading = false;
      hadError = true;
    } else if (narrationResult.data) {
      updates.narrationUrl = narrationResult.data.media;
      updates.isNarrationLoading = false;
    }
    
    updateScene(index, updates);

    if (!hadError && audioRef.current) {
        audioRef.current.play().catch(e => console.error("Audio playback failed", e));
    }
  };

  useEffect(() => {
    if (scene.narrationUrl && !scene.isNarrationLoading && audioRef.current) {
      audioRef.current.load();
    }
  }, [scene.narrationUrl, scene.isNarrationLoading]);


  return (
    <Card className="overflow-hidden shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative aspect-video bg-muted/30 flex items-center justify-center border-b lg:border-b-0 lg:border-r overflow-hidden">
          {scene.isImageLoading ? (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p>Generating visual...</p>
            </div>
          ) : scene.imageUrl ? (
            <NextImage
              src={scene.imageUrl}
              alt={`AI generated image for scene: ${scene.text.substring(
                0,
                50
              )}...`}
              fill
              className="object-cover animate-ken-burns"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <ImageIcon className="h-12 w-12" />
              <p>No image generated yet</p>
            </div>
          )}
        </div>
        <div className="flex flex-col p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="font-headline text-xl">
              Scene {index + 1}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow p-0 mb-6">
            <p className="text-foreground/80 leading-relaxed">{scene.text}</p>
          </CardContent>
          <CardFooter className="p-0 flex flex-col items-start gap-4 mt-auto">
            <div className="flex w-full flex-wrap items-center gap-4">
              <Button
                onClick={handleGenerateScene}
                disabled={scene.isImageLoading || scene.isNarrationLoading}
              >
                {scene.isImageLoading || scene.isNarrationLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Scene
              </Button>
            </div>
            {scene.narrationUrl && !scene.isNarrationLoading && (
              <audio controls src={scene.narrationUrl} className="w-full" ref={audioRef} />
            )}
            {scene.isNarrationLoading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground w-full pt-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generating audio... This may take a moment.</span>
              </div>
            )}
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
