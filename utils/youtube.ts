
export function getVideoId(youtubeUrl: string): string {
    return youtubeUrl.replace("https://www.youtube.com/watch?v=", "")
}

export function getThumbnailUrl(videoId: string): string {
    return "https://i.ytimg.com/vi/" + videoId + "/hqdefault.jpg"
}

export function getEmbedUrl(videoId: string): string {
    return "https://www.youtube.com/embed/" + videoId + "?origin=https://aaconsl.com"
}
