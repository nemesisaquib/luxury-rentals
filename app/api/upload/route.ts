import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (e) {
      // Ignore if exists
    }

    // Convert to webp at 85% quality using sharp
    const webpBuffer = await sharp(buffer)
      .webp({ quality: 85 })
      .toBuffer();

    // Use .webp extension
    const filename = `${Date.now()}-${file.name.replace(/\.[^/.]+$/, "")}.webp`;
    const path = join(uploadsDir, filename);

    await writeFile(path, webpBuffer);

    return NextResponse.json({
      url: `/uploads/${filename}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
