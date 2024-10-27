import { GetObjectCommand } from "@aws-sdk/client-s3";
import chalk from "chalk";
import { NextResponse } from "next/server";
import { r2 } from "@/lib/r2";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json({ error: "No key provided" }, { status: 400 });
    }

    console.log(chalk.yellow(`Retrieving image from R2!`));

    const image = await r2.send(
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
      }),
    );

    if (!image || !image.Body) {
      throw new Error("Image not found.");
    }

    // Stream the image data
    return new Response(image.Body.transformToWebStream(), {
      headers: {
        "Content-Type": image.ContentType || "image/jpeg",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (err) {
    console.error("Error retrieving image:", err);
    return NextResponse.json(
      { error: "Failed to retrieve image" },
      { status: 500 },
    );
  }
}
