'use server';
/**
 * @fileOverview A Genkit flow for administrators to automatically generate unique and SEO-optimized product descriptions using AI.
 *
 * - adminGenerateProductDescriptions - A function that handles the generation of product descriptions.
 * - AdminGenerateProductDescriptionsInput - The input type for the adminGenerateProductDescriptions function.
 * - AdminGenerateProductDescriptionsOutput - The return type for the adminGenerateProductDescriptions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AdminGenerateProductDescriptionsInputSchema = z.object({
  productName: z.string().describe("The name of the product."),
  productCategory: z.string().describe("The category the product belongs to (e.g., 'Électronique', 'Vêtements', 'Articles ménagers')."),
  keyFeatures: z.array(z.string()).describe("A list of key features or selling points of the product."),
  targetAudience: z.string().optional().describe("Who is this product for? (e.g., 'jeunes professionnels', 'consommateurs soucieux de l'environnement')."),
  existingDescription: z.string().optional().describe("An existing short description or keywords to elaborate on."),
});
export type AdminGenerateProductDescriptionsInput = z.infer<typeof AdminGenerateProductDescriptionsInputSchema>;

const AdminGenerateProductDescriptionsOutputSchema = z.object({
  generatedDescription: z.string().describe("The SEO-optimized product description in French."),
});
export type AdminGenerateProductDescriptionsOutput = z.infer<typeof AdminGenerateProductDescriptionsOutputSchema>;

export async function adminGenerateProductDescriptions(input: AdminGenerateProductDescriptionsInput): Promise<AdminGenerateProductDescriptionsOutput> {
  return adminGenerateProductDescriptionsFlow(input);
}

const productDescriptionPrompt = ai.definePrompt({
  name: 'productDescriptionPrompt',
  input: { schema: AdminGenerateProductDescriptionsInputSchema },
  output: { schema: AdminGenerateProductDescriptionsOutputSchema },
  prompt: `You are an expert e-commerce copywriter specializing in SEO. Your task is to write a unique, engaging, and SEO-optimized product description in French for a general store. The description should be compelling, highlight the key features, and appeal to the target audience. Focus on clear, concise language and natural keyword integration.

Product Name: {{{productName}}}
Category: {{{productCategory}}}
Key Features:
{{#each keyFeatures}}
- {{{this}}}
{{/each}}
{{#if targetAudience}}
Target Audience: {{{targetAudience}}}
{{/if}}
{{#if existingDescription}}
Existing Info/Keywords: {{{existingDescription}}}
{{/if}}

Please generate a professional, high-quality product description that is between 150 and 250 words. The tone should be luxurious and sophisticated, matching the "Épure Boutique" brand. Do not include any introductory or concluding remarks outside of the description itself.`,
});

const adminGenerateProductDescriptionsFlow = ai.defineFlow(
  {
    name: 'adminGenerateProductDescriptionsFlow',
    inputSchema: AdminGenerateProductDescriptionsInputSchema,
    outputSchema: AdminGenerateProductDescriptionsOutputSchema,
  },
  async (input) => {
    const { output } = await productDescriptionPrompt(input);
    if (!output) {
      throw new Error("Failed to generate product description.");
    }
    return output;
  }
);
