'use server';

import {
  generateImages,
  GenerateImagesInput,
} from '@/ai/flows/generate-images';
import {
  generateNarration,
  GenerateNarrationInput,
} from '@/ai/flows/generate-narration-flow';
import {
  customizeAISettings,
  CustomizeAISettingsInput,
} from '@/ai/flows/customize-ai-settings';

type FormState<T> = {
  data?: T;
  error?: string;
};

export async function generateImagesAction(
  input: GenerateImagesInput
): Promise<FormState<Awaited<ReturnType<typeof generateImages>>>> {
  try {
    const result = await generateImages(input);
    return { data: result };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || 'An unknown error occurred during image generation.' };
  }
}

export async function generateNarrationAction(
  input: GenerateNarrationInput
): Promise<FormState<Awaited<ReturnType<typeof generateNarration>>>> {
  try {
    const result = await generateNarration(input);
    return { data: result };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || 'An unknown error occurred during narration generation.' };
  }
}

export async function customizeAISettingsAction(
  input: CustomizeAISettingsInput
): Promise<FormState<Awaited<ReturnType<typeof customizeAISettings>>>> {
  try {
    const result = await customizeAISettings(input);
    return { data: result };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || 'An unknown error occurred while saving settings.' };
  }
}
