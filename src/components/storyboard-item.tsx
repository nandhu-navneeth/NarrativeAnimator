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
import { Image as ImageIcon, Loader2, Volume2, Wand2 } from 'lucide-react';
import NextImage from 'next/image';
import { useToast } from '@/hooks/use-toast';

interface StoryboardItemProps {
  scene: Scene;
  index: number;
}

export function StoryboardItem({ scene, index }: StoryboardItemProps) {
  const { updateScene, aiSettings } = useApp();
  const { toast } = useToast();

  const handleGenerateImage = async () => {
    updateScene(index, { isImageLoading: true });
    const result = await generateImagesAction({
      text: `${aiSettings.imagePrompt}\n\nScene: ${scene.text}`,
    });
    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Image Generation Failed',
        description: result.error,
      });
      updateScene(index, { isImageLoading: false });
    } else if (result.data) {
      updateScene(index, {
        imageUrl: result.data.imageUrl,
        isImageLoading: false,
      });
    }
  };

  const handleGenerateNarration = async () => {
    updateScene(index, { isNarrationLoading: true });
    const result = await generateNarrationAction(
      `${aiSettings.narrationPrompt}\n\nNarration: ${scene.text}`
    );
    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Narration Generation Failed',
        description: result.error,
      });
      updateScene(index, { isNarrationLoading: false });
    } else if (result.data) {
      updateScene(index, {
        narrationUrl: result.data.media,
        isNarrationLoading: false,
      });
    }
  };

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
                onClick={handleGenerateImage}
                disabled={scene.isImageLoading || scene.isNarrationLoading}
              >
                {scene.isImageLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate Visual
              </Button>
              <Button
                variant="outline"
                onClick={handleGenerateNarration}
                disabled={scene.isImageLoading || scene.isNarrationLoading}
              >
                {scene.isNarrationLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Volume2 className="mr-2 h-4 w-4" />
                )}
                Generate Narration
              </Button>
            </div>
            {scene.narrationUrl && !scene.isNarrationLoading && (
              <audio controls src={scene.narrationUrl} className="w-full" />
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