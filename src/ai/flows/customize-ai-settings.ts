'use server';

/**
 * @fileOverview Flow for customizing AI settings, such as prompting, to fine-tune image and narration generation.
 *
 * - customizeAISettings - A function that allows users to adjust AI settings.
 * - CustomizeAISettingsInput - The input type for the customizeAISettings function.
 * - CustomizeAISettingsOutput - The return type for the customizeAISettings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CustomizeAISettingsInputSchema = z.object({
  imagePrompt: z
    .string()
    .describe('The prompt used for image generation.'),
  narrationPrompt: z
    .string()
    .describe('The prompt used for narration generation.'),
});
export type CustomizeAISettingsInput = z.infer<
  typeof CustomizeAISettingsInputSchema
>;

const CustomizeAISettingsOutputSchema = z.object({
  imagePrompt: z
    .string()
    .describe('The adjusted prompt used for image generation.'),
  narrationPrompt: z
    .string()
    .describe('The adjusted prompt used for narration generation.'),
});
export type CustomizeAISettingsOutput = z.infer<
  typeof CustomizeAISettingsOutputSchema
>;

export async function customizeAISettings(
  input: CustomizeAISettingsInput
): Promise<CustomizeAISettingsOutput> {
  return customizeAISettingsFlow(input);
}

const customizeAISettingsPrompt = ai.definePrompt({
  name: 'customizeAISettingsPrompt',
  input: {schema: CustomizeAISettingsInputSchema},
  output: {schema: CustomizeAISettingsOutputSchema},
  prompt: `You are an AI settings customization tool. The user will provide the imagePrompt and narrationPrompt that they want to use for the Book-to-Movie converter app.

  Image Prompt: {{{imagePrompt}}}
  Narration Prompt: {{{narrationPrompt}}}`,
});

const customizeAISettingsFlow = ai.defineFlow(
  {
    name: 'customizeAISettingsFlow',
    inputSchema: CustomizeAISettingsInputSchema,
    outputSchema: CustomizeAISettingsOutputSchema,
  },
  async input => {
    const {output} = await customizeAISettingsPrompt(input);
    return output!;
  }
);
