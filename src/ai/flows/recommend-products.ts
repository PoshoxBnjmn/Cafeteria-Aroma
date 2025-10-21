'use server';
/**
 * @fileOverview Product recommendation AI agent based on order history.
 *
 * - recommendProducts - A function that handles the product recommendation process.
 * - RecommendProductsInput - The input type for the recommendProducts function.
 * - RecommendProductsOutput - The return type for the recommendProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendProductsInputSchema = z.object({
  orderHistory: z.array(
    z.object({
      productId: z.string().describe('The ID of the product ordered.'),
      productName: z.string().describe('The name of the product ordered.'),
      quantity: z.number().describe('The quantity of the product ordered.'),
    })
  ).describe('The user order history.'),
});
export type RecommendProductsInput = z.infer<typeof RecommendProductsInputSchema>;

const RecommendProductsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      productId: z.string().describe('The ID of the recommended product.'),
      productName: z.string().describe('The name of the recommended product.'),
      reason: z.string().describe('The reason for the recommendation.'),
    })
  ).describe('A list of recommended products.'),
});
export type RecommendProductsOutput = z.infer<typeof RecommendProductsOutputSchema>;

export async function recommendProducts(input: RecommendProductsInput): Promise<RecommendProductsOutput> {
  return recommendProductsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendProductsPrompt',
  input: {schema: RecommendProductsInputSchema},
  output: {schema: RecommendProductsOutputSchema},
  prompt: `You are an AI assistant specializing in product recommendations for Cafeteria Aroma.
  Based on the customer's order history, identify products that they might like to reorder or discover new ones.
  Consider the frequency and quantity of past orders to determine the customer's preferences.

  Order History:
  {{#each orderHistory}}
  - Product ID: {{productId}}, Product Name: {{productName}}, Quantity: {{quantity}}
  {{/each}}

  Provide recommendations with a brief explanation of why each product is recommended.
  Format your response as a JSON object that adheres to the following schema:
  ${JSON.stringify(RecommendProductsOutputSchema.description)}
`,
});

const recommendProductsFlow = ai.defineFlow(
  {
    name: 'recommendProductsFlow',
    inputSchema: RecommendProductsInputSchema,
    outputSchema: RecommendProductsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
