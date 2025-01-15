package main

import (
	"context"
	"encoding/base64"
	"errors"
	"log"
	"os"

	"github.com/wailsapp/wails/v2/pkg/runtime"

	"github.com/bogem/id3v2/v2"
)

type Metadata struct {
	Index    int    `json:"index"`
	Album    string `json:"album"`
	Artist   string `json:"artist"`
	Comment  string `json:"comment"`
	Cover    string `json:"cover"`
	FileName string `json:"fileName"`
	Genre    string `json:"genre"`
	Selected bool   `json:"selected"`
	Title    string `json:"title"`
	Track    string `json:"track"`
	Year     string `json:"year"`
}

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) OpenMusicFiles() ([]Metadata, error) {
	context := a.ctx
	var fileFilter = []runtime.FileFilter{{DisplayName: "MP3", Pattern: "*.mp3"}}
	var options = runtime.OpenDialogOptions{Title: "Open files", CanCreateDirectories: false, ShowHiddenFiles: false, Filters: fileFilter}
	var res, err = runtime.OpenMultipleFilesDialog(context, options)
	var metadataList []Metadata
	if err != nil {
		log.Println("Error while opening files: ", err)
		return nil, err
	}

	for idx, filename := range res {
		tag, err := id3v2.Open(filename, id3v2.Options{Parse: true})
		if err != nil {
			log.Println("Error while opening files: ", err)
			return nil, err
		}
		defer tag.Close()

		pictures := tag.GetFrames(tag.CommonID("Attached picture"))
		var encodedPictureString string
		if len(pictures) > 0 {
			picture := pictures[0]
			pic, ok := picture.(id3v2.PictureFrame)
			if !ok {
				log.Println("Couldn't assert picture frame")
				return nil, errors.New("couldn't assert picture frame")
			}
			encodedPictureString = base64.StdEncoding.EncodeToString(pic.Picture)
		}

		comments := tag.GetFrames(tag.CommonID("Comments"))
		var commentString string
		for _, f := range comments {
			comment, ok := f.(id3v2.CommentFrame)
			if !ok {
				log.Println("Couldn't assert comment frame")
				return nil, errors.New("couldn't assert comment frame")
			}
			commentString = comment.Text
		}

		metadata := Metadata{
			Index:    idx,
			Album:    tag.Album(),
			Artist:   tag.Artist(),
			Comment:  commentString,
			Cover:    encodedPictureString,
			FileName: filename,
			Genre:    tag.Genre(),
			Selected: false,
			Title:    tag.Title(),
			Track:    tag.GetTextFrame(tag.CommonID("TRCK")).Text,
			Year:     tag.Year(),
		}
		metadataList = append(metadataList, metadata)
	}
	return metadataList, nil
}

func (a *App) OpenImageFile() (string, error) {
	context := a.ctx
	var fileFilter = []runtime.FileFilter{{DisplayName: "Images", Pattern: "*.jpeg;*.jpg;*.png"}}
	var options = runtime.OpenDialogOptions{Title: "Open files", CanCreateDirectories: false, ShowHiddenFiles: false, Filters: fileFilter}
	var res, err = runtime.OpenFileDialog(context, options)
	if err != nil {
		log.Println("Error while opening file: ", err)
		return "", err
	}
	if len(res) == 0 {
		return "", nil
	}
	file, err := os.ReadFile(res)
	if err != nil {
		log.Println("Error while reading file: ", err)
		return "", err
	}
	encodedPictureString := base64.StdEncoding.EncodeToString(file)
	return encodedPictureString, nil
}

func (a *App) SaveMetadata(metadata []Metadata) (bool, error) {
	for _, data := range metadata {
		tag, err := id3v2.Open(data.FileName, id3v2.Options{Parse: true})
		if err != nil {
			log.Println("Error while opening files: ", err)
			return false, err
		}
		defer tag.Close()

		comment := id3v2.CommentFrame{
			Encoding:    id3v2.EncodingUTF8,
			Language:    "eng",
			Description: "",
			Text:        data.Comment,
		}

		tag.DeleteFrames(tag.CommonID("Attached picture"))
		if len(data.Cover) != 0 {
			imageBlob, err := base64.StdEncoding.DecodeString(data.Cover)
			if err != nil {
				log.Println("Error while decoding image: ", err)
				return false, err
			}
			pic := id3v2.PictureFrame{
				Encoding:    id3v2.EncodingUTF8,
				MimeType:    "image/jpeg",
				PictureType: id3v2.PTFrontCover,
				Description: "Front cover",
				Picture:     imageBlob,
			}
			tag.AddAttachedPicture(pic)
		}

		tag.AddCommentFrame(comment)
		tag.SetAlbum(data.Album)
		tag.SetArtist(data.Artist)
		tag.AddCommentFrame(comment)
		tag.SetGenre(data.Genre)
		tag.SetTitle(data.Title)
		tag.AddTextFrame(tag.CommonID("TRCK"), id3v2.EncodingUTF16, data.Track)
		tag.SetYear(data.Year)

		tag.Save()
	}
	return true, nil
}
