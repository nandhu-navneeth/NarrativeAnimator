
'use client';
import { useApp } from '@/components/app-provider';
import { Button } from '@/components/ui/button';
import { Loader2, Pause, Play, X } from 'lucide-react';
import NextImage from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

export function MoviePlayer() {
  const {
    scenes,
    isMoviePlaying,
    stopMovie,
    currentSceneIndex,
    setCurrentSceneIndex,
  } = useApp();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const currentScene = scenes[currentSceneIndex];

  const handleNextScene = useCallback(() => {
    if (currentSceneIndex < scenes.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
    } else {
      stopMovie();
    }
  }, [currentSceneIndex, scenes.length, setCurrentSceneIndex, stopMovie]);

  useEffect(() => {
    if (isMoviePlaying && audioRef.current && currentScene?.narrationUrl) {
      audioRef.current.src = currentScene.narrationUrl;
      audioRef.current.load();
      audioRef.current.play().catch(e => console.error('Audio playback failed', e));
      setIsPaused(false);
    } else if (!isMoviePlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isMoviePlaying, currentScene]);
  

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        stopMovie();
      }
      if (event.key === ' ') {
        togglePause();
      }
    };
    if (isMoviePlaying) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isMoviePlaying, stopMovie]);
  
  const togglePause = () => {
    if (audioRef.current) {
      if(isPaused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsPaused(!isPaused);
    }
  };


  if (!isMoviePlaying) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4 z-20 flex gap-2">
         <Button
            variant="ghost"
            size="icon"
            onClick={togglePause}
            className="text-white hover:bg-white/20 hover:text-white"
          >
            {isPaused ? <Play className="h-8 w-8" /> : <Pause className="h-8 w-8" />}
            <span className="sr-only">{isPaused ? 'Play' : 'Pause'}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={stopMovie}
            className="text-white hover:bg-white/20 hover:text-white"
          >
            <X className="h-8 w-8" />
            <span className="sr-only">Close</span>
          </Button>
      </div>

      <div className="relative w-full h-full">
        {!currentScene?.imageUrl ? (
            <div className="flex flex-col gap-4 items-center justify-center h-full text-white">
                <Loader2 className="w-12 h-12 animate-spin"/>
                <p className="text-xl">Loading scene...</p>
            </div>
        ) : (
          <NextImage
            src={currentScene.imageUrl}
            alt={`Full screen image for scene: ${currentScene.text.substring(0, 50)}...`}
            fill
            className="object-contain animate-ken-burns"
            sizes="100vw"
            key={currentScene.id}
          />
        )}
        
        <div className="absolute bottom-10 left-0 right-0 p-4 flex justify-center">
            <p className="text-white text-2xl font-bold bg-black/60 px-6 py-3 rounded-lg text-center max-w-5xl">
              {currentScene?.text || ''}
            </p>
        </div>
      </div>
      <audio ref={audioRef} onEnded={handleNextScene} />
    </div>
  );
}
