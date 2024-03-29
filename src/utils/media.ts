import { v4 as uuid } from 'uuid';
import assert from '@/utils/assert';

export const verifyMedia = async (
  media: Buffer,
  acceptedFileTypes: Array<'video' | 'image'>,
): Promise<{ extension: string; id: string; type: 'IMAGE' | 'VIDEO' }> => {
  const fileType = await (await import('file-type')).fromBuffer(media);

  // check file type
  assert(
    acceptedFileTypes.includes('image')
      ? fileType.mime.includes('image')
      : acceptedFileTypes.includes('video')
      ? fileType.mime.includes('video')
      : false,
    `File type must be ${acceptedFileTypes.join(', ')} !`,
  );

  const type = fileType.mime.includes('video')
    ? 'VIDEO'
    : fileType.mime.includes('image')
    ? 'IMAGE'
    : undefined;

  assert(!!type, 'File type not recognized.');

  if (type === 'IMAGE') {
    // TODO resize ?
    //media = await sharp(media).resize(512).rotate().toBuffer();

    // 2 MB
    assert(media.byteLength <= 2 * (1000 * 1000), 'File is too big');
  } else {
    // 100 MB
    assert(media.byteLength <= 100 * (1000 * 1000), 'File is too big');
  }

  return {
    id: uuid(),
    extension: fileType.ext,
    type,
  };
};
