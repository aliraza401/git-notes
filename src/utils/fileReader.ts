interface FileReaderProps {
  fileUrl: string;
}

async function readFile(fileUrl: string): Promise<string> {
  if (!fileUrl) return "";

  const decoder = new TextDecoder();
  let content = "";

  const res = await fetch(fileUrl);
  if (res.ok) {
    const file = res.body as ReadableStream<Uint8Array>;
    const reader = file.getReader();

    const readStream = async (
      reader: ReadableStreamDefaultReader<Uint8Array>
    ) => {
      const { done, value } = await reader.read();
      if (done) return;
      content += decoder.decode(value, { stream: true });
      await readStream(reader);
    };

    await readStream(reader);
    reader.cancel();
  }

  return content;
}

export const fileReader = ({ fileUrl }: FileReaderProps) => {
  return readFile(fileUrl);
};
