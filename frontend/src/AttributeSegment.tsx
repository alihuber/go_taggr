import { AttributeInput } from './AttributeInput';
import { useAppSelector } from './hooks';

import type { Metadata } from './features/metadataSlice';

const extractValue = (metadata: Metadata, type: string): string => {
  const metadataObject = metadata as unknown as Record<string, string>;
  return metadataObject[type];
};

export const AttributesSegment = () => {
  const metadata = useAppSelector((state) => state.metadata.value);
  const selectedMetadata = useAppSelector((state) => state.metadata.selectedMetadata);
  const loadedFileSize = metadata?.length || 0;
  const selectedCount = metadata?.filter((data) => data.selected).length || 0;
  const filesLoaded = loadedFileSize !== 0;
  const oneSelected = selectedCount === 1;
  const moreThanOneSelected = selectedCount > 1;
  const allSelected = loadedFileSize !== 0 && loadedFileSize === selectedCount;
  const fields = ['title', 'artist', 'album', 'genre', 'year', 'comment'];

  return (
    <div>
      {fields.map((type) => {
        const value = extractValue(selectedMetadata, type);
        return (
          <AttributeInput
            type={type}
            filesLoaded={filesLoaded}
            oneSelected={oneSelected}
            moreThanOneSelected={moreThanOneSelected}
            allSelected={allSelected}
            key={type}
            value={value}
          />
        );
      })}
    </div>
  );
};
