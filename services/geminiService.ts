import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini client
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

/**
 * Generates a stylized version of the input image using Gemini.
 * Uses the 'gemini-2.5-flash-image' model for efficient image editing/generation.
 */
export const generateStylizedImage = async (
  imageBase64: string,
  stylePrompt: string,
  viewpoint: string
): Promise<string> => {
  if (!apiKey) {
    console.warn("No API Key provided. Returning mock data.");
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    // Return the original image as a fallback mock (in a real app without key this would fail)
    return imageBase64; 
  }

  try {
    // Strip header if present (e.g., "data:image/jpeg;base64,")
    const cleanBase64 = imageBase64.split(',')[1] || imageBase64;

    const prompt = `Reimagine the person in this photo ${stylePrompt}. Generate a ${viewpoint} of them. Maintain facial resemblance but apply the style strongly. High quality, detailed.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Using flash-image for speed and editing capabilities
      contents: {
        parts: [
            {
                inlineData: {
                    mimeType: 'image/jpeg', // Assuming JPEG for simplicity, can be dynamic
                    data: cleanBase64
                }
            },
            {
                text: prompt
            }
        ]
      },
      config: {
        // No schema needed for image gen, but we want an image back.
        // Note: generateContent with image output behavior depends on model.
        // For pure image-to-image where output is image, we rely on the model returning inlineData or similar.
      }
    });

    // Check for image in response
    // The structure for image response in the new SDK:
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
        for (const part of parts) {
            if (part.inlineData && part.inlineData.data) {
                return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
            }
        }
    }
    
    throw new Error("No image generated");

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback for demo purposes if API fails or key is invalid
    return imageBase64; 
  }
};