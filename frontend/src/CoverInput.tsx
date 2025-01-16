import { Button, Card, CardContent, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from './hooks';
import { removeImage, setImage } from './features/metadataSlice';
import { OpenImageFile } from '../wailsjs/go/main/App';
import { setMessage } from './features/messageSlice';

export const CoverInput = () => {
  const dispatch = useAppDispatch();
  const metadataList = useAppSelector((state) => state.metadata.metadataList);
  const selectedMetadata = useAppSelector((state) => state.metadata.selectedMetadata);
  const loadedFileSize = metadataList?.length || 0;
  const selectedCount = metadataList?.filter((data) => data.selected).length || 0;
  const filesLoaded = loadedFileSize !== 0;
  const oneSelected = selectedCount === 1;
  const moreThanOneSelected = selectedCount > 1;
  const allSelected = loadedFileSize !== 0 && loadedFileSize === selectedCount;

  const allImages = metadataList.map((data) => {
    if (data.selected && data.cover) {
      return data.cover;
    } else {
      return '';
    }
  });

  const openImageDialog = () => {
    OpenImageFile().then(
      (result) => {
        dispatch(setImage(result));
      },
      (error) => {
        dispatch(setMessage({ message: error, severity: 'error' }));
      }
    );
  };

  const removeImg = () => {
    dispatch(removeImage());
  };

  const imagesEqual = (arr: string[]) => arr.every((v) => v === arr[0]);
  const allImagesNull = (arr: string[]) => arr.every((v) => v.length === 0);

  const emptyImage = (
    <div className="coverDiv">
      <Card>
        <CardContent>
          <Button variant="outlined" color="inherit" onClick={() => openImageDialog()}>
            <Typography variant="subtitle1">Click here to set an image</Typography>
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
            <Typography variant="subtitle1">Multiple Images set. Click here to replace</Typography>
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
            <Typography variant="subtitle1">Click here to set an image</Typography>
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const displayImage = (imageString: string) => (
    <div className="coverDiv">
      <img src={`data:image/jpeg;base64,${imageString}`} width={230} height={200} />
      <br />
      <Button variant="outlined" size="small" color="inherit" onClick={() => removeImg()}>
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
    if (allImages.length !== 0) {
      if (imagesEqual(allImages) && !allImagesNull(allImages)) {
        const firstCover = metadataList.find((m) => m.selected && m.cover.length !== 0)?.cover || '';
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
