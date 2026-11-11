/** Convertit une image (jpeg/png/gif/…) en fichier WebP via le canvas du navigateur. */
export async function convertImageToWebp(
  source: Blob,
  fileName = 'image.webp',
  quality = 0.82,
): Promise<File> {
  const name = toWebpFileName(fileName);

  if (source.type === 'image/webp') {
    return source instanceof File
      ? source
      : new File([source], name, { type: 'image/webp' });
  }

  const bitmap = await createImageBitmap(source);
  try {
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas non disponible pour la conversion WebP');
    }
    ctx.drawImage(bitmap, 0, 0);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) =>
          result
            ? resolve(result)
            : reject(new Error('Conversion WebP impossible dans ce navigateur')),
        'image/webp',
        quality,
      );
    });

    return new File([blob], name, { type: 'image/webp' });
  } finally {
    bitmap.close();
  }
}

function toWebpFileName(fileName: string): string {
  const base = fileName.replace(/\.[^.]+$/, '').trim() || 'image';
  return `${base}.webp`;
}
