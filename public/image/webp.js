import imagemin from "imagemin";
import webp from "imagemin-webp";

const convertImages = async () => {
	const files = ["./thumbnail/*.{jpg,png}"];
	const config = {
		destination: "./thumbnail/",
		plugins: [webp({ quality: 75 })],
	};

	console.log("開始轉換圖片⋯⋯");
	await imagemin(files, config);
	console.log("已將圖片轉成 WebP！");
};

convertImages();
