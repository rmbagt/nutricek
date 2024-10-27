import { NextResponse } from "next/server";
import chalk from "chalk";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2 } from "@/lib/r2";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export async function POST(request: Request) {
  try {
    const { filename, fileType, fileSize } = await request.json();

    if (!filename || !fileType || !fileSize) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate file size
    if (fileSize > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 },
      );
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(fileType)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPG, JPEG, and PNG are allowed" },
        { status: 400 },
      );
    }

    console.log(chalk.yellow(`Generating upload URL for ${filename}`));

    const key = `${Date.now()}-${filename}`;
    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        ContentType: fileType,
      }),
      { expiresIn: 60 },
    );

    console.log(chalk.green(`Success generating upload URL!`));

    return NextResponse.json({ url: signedUrl, key });
  } catch (err) {
    console.error("Error generating upload URL:", err);
    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 500 },
    );
  }
}
