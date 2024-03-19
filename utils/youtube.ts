
export function getVideoId(youtubeUrl: string): string {
    return youtubeUrl.replace("https://www.youtube.com/watch?v=", "")
}

export function getThumbnailUrl(videoId: string, quality = "maxresdefault"): string {
    return "https://i.ytimg.com/vi/" + videoId + "/" + quality + ".jpg"
}

export function getEmbedUrl(videoId: string): string {
    return "https://www.youtube.com/embed/" + videoId + "?origin=https://aaconsl.com"
}
