import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // REPLACE MODEL NAME
    console.log("Running the model...");
    const output = await replicate.run(
      "sundai-club/test1:93ffc3c7204e38f5ea5ce755ed3dbe91c6280545aec1f3793c97bd820557dafc",
      {
        input: {
          prompt: prompt,
          num_inference_steps: 8,
          model: "schnell",
        },
      }
    );

    const img_url = String(output);
    return NextResponse.json({ imageUrl: img_url });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
