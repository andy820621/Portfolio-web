import imagemin from "imagemin";
import webp from "imagemin-webp";

const convertImages = async () => {
	const files = ["./0_Me/*.{jpg,png}"];
	const config = {
		destination: "./0_Me/",
		plugins: [webp({ quality: 75 })],
	};

	console.log("開始轉換圖片⋯⋯");
	await imagemin(files, config);
	console.log("已將圖片轉成 WebP！");
};

convertImages();
