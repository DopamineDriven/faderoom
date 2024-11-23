export function b64toBlob<const T extends string>(b64Data: T) {
  const sliceSize = 512;
  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  const typeMatch = b64Data.match(/^data:(image|application|video|text|font)\/[A-Za-z0-9+-.]+;base64,/);
  const type = typeMatch?.[1];
  console.log(type ?? "");
  if (!typeMatch) {
    throw new Error(`${b64Data} is not a valid data Url`);
  }
  const byteCharacters = Buffer.from(b64Data, "base64").toString("utf-8");
  const byteArrays = Array.of<Uint8Array>();

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = Array.of<number>();
    byteNumbers.push(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: type });
  // const file = new File([blob], `someblob.fileextension`);
  return blob;
}
