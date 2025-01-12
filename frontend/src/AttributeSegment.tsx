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
  // console.log('### metadata', metadata);
  // console.log('### selectedMetadata', selectedMetadata);
  const loadedFileSize = metadata?.length !== 0 || 0;
  const selectedCount = metadata?.filter((data) => data.selected).length || 0;
  const filesLoaded = loadedFileSize !== 0;
  const oneSelected = selectedCount === 1;
  const moreThanOneSelected = selectedCount > 1;
  const allSelected = loadedFileSize === selectedCount;
  const fields = ['title', 'artist', 'albumArtist', 'album', 'genre', 'year', 'comment'];

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
