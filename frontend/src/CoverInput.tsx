import { Button, Card, CardContent, Typography } from '@mui/material';
import { useAppSelector } from './hooks';
import { compact } from 'lodash';

export const CoverInput = () => {
  const metadata = useAppSelector((state) => state.metadata.value);
  const selectedMetadata = useAppSelector((state) => state.metadata.selectedMetadata);
  const loadedFileSize = metadata?.length || 0;
  const selectedCount = metadata?.filter((data) => data.selected).length || 0;
  const filesLoaded = loadedFileSize !== 0;
  const oneSelected = selectedCount === 1;
  const moreThanOneSelected = selectedCount > 1;
  const allSelected = loadedFileSize !== 0 && loadedFileSize === selectedCount;

  const allImages = compact(
    metadata.map((data) => {
      if (data.selected && data.cover) {
        return data.cover;
      } else {
        return null;
      }
    })
  );

  const openImageDialog = () => {
    console.log('open');
  };

  const removeImage = () => {};

  const imagesEqual = (arr: string[]) => arr.every((v) => v === arr[0]);
  const allImagesNull = (arr: string[]) => arr.every((v) => v.length === 0);

  const emptyImage = (
    <div className="coverDiv">
      <Card>
        <CardContent>
          <Button variant="outlined" color="inherit" onClick={() => openImageDialog()}>
            <Typography variant="subtitle1">Click here to open an image</Typography>
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const emptyMultipleImage = (
    <div className="coverDiv">
      <Card>
        <CardContent>
          <Button variant="outlined" color="inherit" onClick={() => openImageDialog()}>
            <Typography variant="subtitle1">Multiple Images set. Click here to open an image</Typography>
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const disabledImage = (
    <div className="coverDiv">
      <Card>
        <CardContent>
          <Button
            disabled={!filesLoaded || !oneSelected || !moreThanOneSelected || !allSelected}
            variant="outlined"
            color="inherit"
            onClick={() => openImageDialog()}
          >
            <Typography variant="subtitle1">Click here to open an image</Typography>
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const displayImage = (imageString: string) => (
    <div className="coverDiv">
      <img src={`data:image/jpeg;base64,${imageString}`} width={230} height={200} />
      <br />
      <Button variant="outlined" size="small" color="inherit" onClick={() => removeImage()}>
        Remove image
      </Button>
    </div>
  );

  if (oneSelected && !moreThanOneSelected) {
    if (selectedMetadata && selectedMetadata.cover && selectedMetadata.cover.length !== 0) {
      return displayImage(selectedMetadata.cover);
    } else {
      return emptyImage;
    }
  } else if (moreThanOneSelected || allSelected) {
    // if in selected songs are images set:
    //   if it is the same image, display that
    //   if it is not the same image or no image: display "multiple" hint and upload button
    // if there are no images: display upload button
    const allimagesEqual = imagesEqual(allImages);
    if (allImages.length !== 0) {
      if (imagesEqual(allImages) && !allImagesNull(allImages)) {
        const firstCover = metadata.find((m) => m.cover.length !== 0)?.cover || '';
        return displayImage(firstCover);
      } else if (allImagesNull(allImages)) {
        return emptyImage;
      } else {
        return emptyMultipleImage;
      }
    } else {
      return emptyImage;
    }
  } else {
    return disabledImage;
  }
};
