'use client';

import type { Scene } from '@/types';
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';

interface AppContextType {
  story: string;
  setStory: (story: string) => void;
  scenes: Scene[];
  updateScene: (
    index: number,
    scene: Partial<Omit<Scene, 'id' | 'text'>>
  ) => void;
  aiSettings: { imagePrompt: string; narrationPrompt: string };
  setAiSettings: React.Dispatch<
    React.SetStateAction<{ imagePrompt: string; narrationPrompt: string }>
  >;
  selectedMusic: string;
  setSelectedMusic: React.Dispatch<React.SetStateAction<string>>;
  isMoviePlaying: boolean;
  startMovie: () => void;
  stopMovie: () => void;
  currentSceneIndex: number;
  setCurrentSceneIndex: React.Dispatch<React.SetStateAction<number>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_IMAGE_PROMPT = `A vibrant, cinematic, and emotionally resonant digital painting that captures the essence of the following scene. The style should be reminiscent of high-concept animation, with rich colors, dynamic lighting, and a strong sense of atmosphere. Focus on the key characters, actions, and settings described.`;

const DEFAULT_NARRATION_PROMPT = `Please narrate the following text with a clear, engaging, and professional voice. The tone should be appropriate for a captivating story, balancing emotion with clarity.`;

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [story, setStoryState] = useState('');
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [aiSettings, setAiSettings] = useState({
    imagePrompt: DEFAULT_IMAGE_PROMPT,
    narrationPrompt: DEFAULT_NARRATION_PROMPT,
  });
  const [selectedMusic, setSelectedMusic] = useState('epic-cinematic');
  const [isMoviePlaying, setIsMoviePlaying] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);


  const setStory = useCallback((newStory: string) => {
    setStoryState(newStory);
    const sceneTexts = newStory.match(/[^.!?]+[.!?]+/g) || [];
    setScenes(
      sceneTexts.map((text, index) => ({
        id: `scene-${index}`,
        text: text.trim(),
        isImageLoading: false,
        isNarrationLoading: false,
      }))
    );
  }, []);

  const updateScene = useCallback(
    (index: number, newSceneData: Partial<Omit<Scene, 'id' | 'text'>>) => {
      setScenes(prevScenes =>
        prevScenes.map((scene, i) =>
          i === index ? { ...scene, ...newSceneData } : scene
        )
      );
    },
    []
  );
  
  const startMovie = useCallback(() => {
    setCurrentSceneIndex(0);
    setIsMoviePlaying(true);
  }, []);

  const stopMovie = useCallback(() => {
    setIsMoviePlaying(false);
  }, []);


  const value = useMemo(
    () => ({
      story,
      setStory,
      scenes,
      updateScene,
      aiSettings,
      setAiSettings,
      selectedMusic,
      setSelectedMusic,
      isMoviePlaying,
      startMovie,
      stopMovie,
      currentSceneIndex,
      setCurrentSceneIndex,
    }),
    [story, scenes, aiSettings, selectedMusic, setStory, updateScene, isMoviePlaying, startMovie, stopMovie, currentSceneIndex]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
