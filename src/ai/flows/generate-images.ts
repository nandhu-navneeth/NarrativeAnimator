// src/ai/flows/generate-images.ts
'use server';
/**
 * @fileOverview Image generation flow to produce visuals from text input.
 *
 * - generateImages - A function that handles the image generation process.
 * - GenerateImagesInput - The input type for the generateImages function.
 * - GenerateImagesOutput - The return type for the generateImages function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImagesInputSchema = z.object({
  text: z.string().describe('The text to generate images from.'),
});
export type GenerateImagesInput = z.infer<typeof GenerateImagesInputSchema>;

const GenerateImagesOutputSchema = z.object({
  imageUrl: z.string().describe('The URL of the generated image.'),
  progress: z.string().describe('Progress summary of the image generation'),
});
export type GenerateImagesOutput = z.infer<typeof GenerateImagesOutputSchema>;

export async function generateImages(input: GenerateImagesInput): Promise<GenerateImagesOutput> {
  return generateImagesFlow(input);
}

const generateImagesFlow = ai.defineFlow(
  {
    name: 'generateImagesFlow',
    inputSchema: GenerateImagesInputSchema,
    outputSchema: GenerateImagesOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: input.text,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media) {
      throw new Error('No image was generated.');
    }

    return {
      imageUrl: media.url,
      progress: 'Generated an image from the given text input.',
    };
  }
);
