import { Box, Grid, GridItem, Skeleton } from "@chakra-ui/react"
import Image from 'next/image'
import VideoInfo from "./VideoInfo"
import useSWR from "swr"


const fetcher = async (video_id)=>{
    let key = process.env.NEXT_PUBLIC_YOUTUBE_KEY
    const response = await fetch("https://www.googleapis.com/youtube/v3/videos?part=snippet&id="+video_id+"&key="+key)
    const json = await response.json()
    return json
}




function VideoContainer({load,video_id}) {
    const {data,error} = useSWR(video_id,fetcher)
   
    const video_info = data?.items[0].snippet
    const title = video_info?.title
    const img = data?.items[0].snippet.thumbnails.high.url





return (
<Grid display={load ?"grid":"none"} templateColumns={["repeat(auto-fill,minmax(200px,1fr))","repeat(auto-fill,minmax(350px,1fr))"]} gap={3} mt={5}>
    <GridItem  >
        
        <Image src={img?img:"/image.jpg"} objectFit="cover" layout="responsive" height="50%" width="100%"/>
        <Box as="h3" textAlign="center" fontWeight="semibold" fontSize={15} mt={5}>
            {title}
        </Box>

    </GridItem>
    <GridItem display="flex" justifyContent="center" alignItems="center" >
        <VideoInfo video_id={video_id} />
    </GridItem>
</Grid>
)
}

export default VideoContainer