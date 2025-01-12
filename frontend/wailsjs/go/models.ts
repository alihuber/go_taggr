export namespace main {
	
	export class Metadata {
	    index: number;
	    album: string;
	    albumArtist: string;
	    artist: string;
	    comment: string;
	    cover: string;
	    fileName: string;
	    genre: string;
	    selected: boolean;
	    title: string;
	    track: string;
	    year: string;
	
	    static createFrom(source: any = {}) {
	        return new Metadata(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.index = source["index"];
	        this.album = source["album"];
	        this.albumArtist = source["albumArtist"];
	        this.artist = source["artist"];
	        this.comment = source["comment"];
	        this.cover = source["cover"];
	        this.fileName = source["fileName"];
	        this.genre = source["genre"];
	        this.selected = source["selected"];
	        this.title = source["title"];
	        this.track = source["track"];
	        this.year = source["year"];
	    }
	}

}

