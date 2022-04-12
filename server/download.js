// Buildin with nodejs
const cp = require('child_process');
const readline = require('readline');

const ytdl = require('ytdl-core')
const ffmpeg = require('ffmpeg-static');

let download = (itag, url,response) => {
    // Get audio and video streams
    const audio = ytdl(url, {
        quality: 'highestaudio'
    })

    const video = ytdl(url, {
        quality: itag
    })

    // add informations to the request header
    video.on('info', (info, format) => {
        response.set({
            'content-disposition': `attachment; filename=${itag}.mp4`,
            'content-length': format.contentLength,
        })
    });

    // ffmepg to merge audio with video
    const ffmpegProcess = cp.spawn(ffmpeg, [
        '-i', `pipe:3`,
        '-i', `pipe:4`,
        '-map', '0:v',
        '-map', '1:a',
        '-c:v', 'copy',
        '-c:a', 'libmp3lame',
        '-crf', '27',
        '-preset', 'veryfast',
        '-movflags', 'frag_keyframe+empty_moov',
        '-f', 'mp4',
        '-loglevel', 'error',
        '-'
    ], {
        stdio: [
            'pipe', 'pipe', 'pipe', 'pipe', 'pipe',
        ],
    });

    video.pipe(ffmpegProcess.stdio[3]);
    audio.pipe(ffmpegProcess.stdio[4]);
    // send mp4 video stream to the client for download
    ffmpegProcess.stdio[1].pipe(response);


    // errors log
    let ffmpegLogs = ''

    ffmpegProcess.stdio[2].on(
        'data',
        (chunk) => {
            ffmpegLogs += chunk.toString()
        }
    )

    ffmpegProcess.on(
        'exit',
        (exitCode) => {
            if (exitCode === 1) {
                console.error(ffmpegLogs)
            }
        }
    )


}

module.exports = download