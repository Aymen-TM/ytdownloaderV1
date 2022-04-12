
const express = require('express')
const next = require('next')
const ytdl = require('ytdl-core')
const bodyParser = require('body-parser');
const download = require("./download")






const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({
    dev
})
const handle = app.getRequestHandler()



// function to convert video content-length from bytes to (KB,MB,GB)
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

    
    // route to get video information (file_size,video_quality)
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

        download(itag,url,res)
    })


    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})