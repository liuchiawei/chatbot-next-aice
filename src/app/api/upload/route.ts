import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";
import sharp from "sharp";

// ディレクトリの存在確認と作成
async function ensureUploadDir() {
  const uploadDir = path.join(process.cwd(), "public", "upload", "image");

  try {
    // ディレクトリの存在確認
    await fs.promises.access(uploadDir, fs.constants.W_OK);
  } catch {
    // ディレクトリが存在しないか、書き込み権限がない場合
    try {
      // ディレクトリを作成
      await mkdir(uploadDir, { recursive: true });
      console.log("Upload directory created successfully");
    } catch (error) {
      console.error("Failed to create upload directory:", error);
      throw new Error("Failed to create upload directory");
    }
  }
}

// 画像アップロードAPI
export async function POST(req: NextRequest) {
  try {
    // アップロードディレクトリの確認
    await ensureUploadDir();

    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ message: "画像を選択してください" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "upload", "image");
    const filename = `upload_image_${Date.now()}.webp`;
    const filepath = path.join(uploadDir, filename);

    // WebP形式に変換して圧縮
    await sharp(buffer)
      .webp({ quality: 80 }) // 品質を80%に設定
      .toFile(filepath);

    return NextResponse.json({ filename });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ message: "アップロードに失敗しました" }, { status: 500 });
  }
}
