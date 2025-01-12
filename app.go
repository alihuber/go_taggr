package main

import (
	"context"
	"fmt"
	"log"

	"github.com/wailsapp/wails/v2/pkg/runtime"

	"github.com/bogem/id3v2/v2"
)

type Metadata struct {
	Index       int    `json:"index"`
	Album       string `json:"album"`
	Artist      string `json:"artist"`
	AlbumArtist string `json:"albumArtist"`
	Comment     string `json:"comment"`
	Cover       string `json:"cover"`
	FileName    string `json:"fileName"`
	Genre       string `json:"genre"`
	Selected    bool   `json:"selected"`
	Title       string `json:"title"`
	Track       string `json:"track"`
	Year        string `json:"year"`
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

func (a *App) OpenFiles() []Metadata {
	context := a.ctx
	var fileFilter = []runtime.FileFilter{{DisplayName: "MP3", Pattern: "*.mp3"}}
	var options = runtime.OpenDialogOptions{Title: "Open files", CanCreateDirectories: false, ShowHiddenFiles: false, Filters: fileFilter}
	var res, err = runtime.OpenMultipleFilesDialog(context, options)
	var metadataList []Metadata
	var emptyResult []Metadata
	if err != nil {
		log.Println("Error while opening files: ", err)
		return emptyResult
	}

	for idx, filename := range res {
		tag, err := id3v2.Open(filename, id3v2.Options{Parse: true})
		if err != nil {
			log.Println("Error while opening files: ", err)
			return emptyResult
		}
		defer tag.Close()

		// Read frames.
		fmt.Println()
		fmt.Println(filename)
		fmt.Println(tag.Artist())
		fmt.Println(tag.Title())
		metadata := Metadata{
			Index: idx,
			Title: tag.Title(),
			// filename,
			Track: tag.GetTextFrame(tag.CommonID("TRCK")).Text,
		}
		metadataList = append(metadataList, metadata)
	}
	fmt.Println("returning ", metadataList)
	return metadataList
}
