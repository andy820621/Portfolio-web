import sharp from "sharp";
import { readdir } from "fs/promises";
import { join, parse } from "path";

const convertImages = async () => {
	const sourceDir = "./0_Me";
	const files = await readdir(sourceDir);

	const imageFiles = files.filter((file) => /\.(jpg|jpeg|png)$/i.test(file));

	console.log("開始轉換圖片⋯⋯");

	for (const file of imageFiles) {
		const inputPath = join(sourceDir, file);
		const { name } = parse(file);
		const outputPath = join(sourceDir, `${name}.webp`);

		try {
			await sharp(inputPath).webp({ quality: 75 }).toFile(outputPath);
			console.log(`✓ 已轉換: ${file} → ${name}.webp`);
		} catch (error) {
			console.error(`✗ 轉換失敗: ${file}`, error.message);
		}
	}

	console.log("已將圖片轉成 WebP！");
};

convertImages();
