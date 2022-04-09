// Buildin with nodejs
const cp = require('child_process');
const readline = require('readline');

const fs = require('fs');
const express = require('express')
const next = require('next')
const ytdl = require('ytdl-core')
var bodyParser = require('body-parser');
const ffmpeg = require('ffmpeg-static');



const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({
    dev
})
const handle = app.getRequestHandler()


const yt_url = "https://www.youtube.com/watch?v="



const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

app.prepare().then(() => {
    const server = express()

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({
        extended: false
    }));

    server.get('/api/quality/:id', async (req, res) => {
        video_id = req.params.id
        let video_quality = []

        let info = await ytdl.getInfo(video_id);
        info.formats.map(format => {
            if (typeof format.qualityLabel === 'string' && !format.hasAudio  && format.container === "mp4" && format.fps <= 30 && format.codecs.includes('avc1') && format.contentLength>0) {
                video_quality.push({
                    format: format,
                    size: formatBytes(format.contentLength)
                })
            }


        })
        res.json({
            quality: video_quality
        })



    })

    server.get('/api/download', async (req, res) => {
        let itag = req.query.itag;
        let url = req.query.url;

        // Get audio and video streams
        const audio = ytdl(url, {
            quality: 'highestaudio'
        })

        const video = ytdl(url, {
            quality: itag
        })

        video.on('info', (info, format) => {
            res.set({
                'content-disposition': `attachment; filename=${itag}.mp4`,
                'content-length': format.contentLength,
            })
          });
    
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
        ffmpegProcess.stdio[1].pipe(res);

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





    })


    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})