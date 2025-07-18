// src/ai/flows/generate-narration-flow.ts
'use server';
/**
 * @fileOverview Generates narration from text input.
 *
 * - generateNarration - A function that generates narration from text input.
 * - GenerateNarrationInput - The input type for the generateNarration function.
 * - GenerateNarrationOutput - The return type for the generateNarration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const GenerateNarrationInputSchema = z.string().describe('The text to generate narration from.');
export type GenerateNarrationInput = z.infer<typeof GenerateNarrationInputSchema>;

const GenerateNarrationOutputSchema = z.object({
  media: z.string().describe('The audio data URI of the generated narration.'),
  progress: z.string().describe('A short summary of what was generated.')
});
export type GenerateNarrationOutput = z.infer<typeof GenerateNarrationOutputSchema>;

export async function generateNarration(input: GenerateNarrationInput): Promise<GenerateNarrationOutput> {
  return generateNarrationFlow(input);
}

const generateNarrationFlow = ai.defineFlow(
  {
    name: 'generateNarrationFlow',
    inputSchema: GenerateNarrationInputSchema,
    outputSchema: GenerateNarrationOutputSchema,
  },
  async (query) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: query,
    });
    if (!media) {
      throw new Error('no media returned');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const wavDataUri = 'data:audio/wav;base64,' + (await toWav(audioBuffer));
    return {
      media: wavDataUri,
      progress: 'Generated narration from the given text input.',
    };
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
