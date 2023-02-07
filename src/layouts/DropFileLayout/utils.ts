export const getFilesFromFileList = (fileList: FileList) => {
  const files: File[] = [];
  for (let i = 0; i < fileList.length; i++) {
    files.push(fileList[i]);
  }
  return files;
};

/**
 * @example
 *  input:
 *    fileName: "image.png"
 *  output:
 *    "png"
 */
export const getFileExtension = (fileName: string): string => {
  let regex = new RegExp("[^.]+$");
  let extension = fileName.match(regex);
  return extension?.[0] || "";
};

/**
 * @example
 *  input:
 *    - fileName: "image.png"
 *    - exts: ["png", "svg", "jpeg"]
 *  output:
 *    true
 */
export const isValidFileExtensionInput = (
  fileName: string,
  exts: string[] | undefined
) => {
  if (!exts?.length) return false;

  let fileNameExt = getFileExtension(fileName).toLowerCase();
  exts = exts.map((ext) => ext.toLowerCase());
  return exts.includes(fileNameExt);
};

export const getContentTypeOfFile = (file: File): string => {
  if (!file) return "";
  const contentTypes: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    zip: "application/zip",
    ief: "image/ief",
    jpe: "image/jpeg",
    svg: "image/svg+xml",
  };

  const ext = getFileExtension(file.name);

  return contentTypes[ext];
};
