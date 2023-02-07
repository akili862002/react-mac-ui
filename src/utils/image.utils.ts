import { Crop } from "react-image-crop";

export const createImage = (img: string | Blob) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = typeof img === "string" ? img : URL.createObjectURL(img);
  });

/**
 * @param {File} image - Image File url
 * @returns {Object} { file, base64File }
 */
export const cropImage = async (args: {
  image: string;
  /**
   * Crop with % unit
   */
  crop: Crop;
  fileName: string;
}): Promise<{ file: File; base64: string } | null> => {
  let { image: imageSrc, crop, fileName } = args;
  const fileType = detectMimeTypeImage(imageSrc);

  const image: any = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea;
  canvas.height = safeArea;

  if (fileType === "image/jpeg") {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx?.translate(safeArea / 2, safeArea / 2);
  ctx?.translate(-safeArea / 2, -safeArea / 2);

  // draw rotated image and store data.
  ctx?.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );
  const data = ctx?.getImageData(0, 0, safeArea, safeArea);

  const pixelCrop = {
    width: (image.width * crop.width) / 100,
    height: (image.height * crop.height) / 100,
    x: (image.width * crop.x) / 100,
    y: (image.height * crop.y) / 100,
  };

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx?.putImageData(
    data as any,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  );

  // As Base64 string

  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob((blob: any) => {
      try {
        const base64File = canvas.toDataURL(fileType);
        const file = new File(
          [blob],
          `${fileName}.${fileType === "image/jpeg" ? "jpg" : "png"}`,
          {
            type: fileType,
          }
        );
        resolve({ file, base64: base64File });
      } catch (error) {
        console.error(error);
      }
    }, fileType);
  });
};

export const resizeImage = (
  file: File,
  toWidth: number | null,
  toHeight: number | null
): Promise<File | null> => {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      let width = image.width;
      let height = image.height;

      let newWidth = width;
      let newHeight = height;

      if (toWidth) {
        newHeight = height * (toWidth / width);
        newWidth = toWidth;
      } else if (toHeight) {
        newWidth = width * (toHeight / height);
        newHeight = toHeight;
      }

      let canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;

      let context = canvas.getContext("2d");

      (context as any).drawImage(image, 0, 0, newWidth, newHeight);

      canvas.toBlob((blob) => resolve(new File([blob], file.name)), file.type);
    };
    image.onerror = reject;
  });
};

const signatures = {
  JVBERi0: "application/pdf",
  R0lGODdh: "image/gif",
  R0lGODlh: "image/gif",
  iVBORw0KGgo: "image/png",
  "/9j/": "image/jpg",
};

export function detectMimeTypeImage(base64: string) {
  for (var s in signatures) {
    if (base64.indexOf(s) === 0) {
      return signatures[s];
    }
  }
}

export const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
