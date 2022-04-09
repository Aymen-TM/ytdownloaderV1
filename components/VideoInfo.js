import { Box, Button, IconButton, Spinner, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { FaFilm } from "react-icons/fa"



function VideoInfo({video_id}) {
const [info, setInfo] = useState(null)
const [isloading, setIsLoading] = useState(true)
useEffect(() => {
const get_video_inf = async (video_id)=>{
setIsLoading(true)
let response = await fetch("api/quality/"+video_id)
.then(res => res.json()).then(data => setInfo(data))
setIsLoading(false)
}
if(video_id != null){
    get_video_inf(video_id)
}
},[video_id])

const download =(itag,video_id)=>{
    window.location.href = `http://localhost:3000/api/download?itag=${itag}&url=https://www.youtube.com/watch?v=${video_id}`
}

if(isloading){
return(
<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='red.500' size='xl' />
)
}

return (
!isloading && <Table variant='simple' size="sm">
    <Thead>
        <Tr>
            <Th>Quality</Th>
            <Th>File size</Th>
            <Th>Status</Th>
        </Tr>
    </Thead>
    <Tbody>
        {info.quality.map((quality)=>(
        <Tr key={quality.format.itag}>
            <Td>{quality.format.qualityLabel}</Td>
            <Td>{typeof quality.size=='string'?quality.size:""}</Td>
            <Td><Button onClick={()=>download(quality.format.itag,video_id)} colorScheme='red' size="md" aria-label='Convert video' display={["none","flex"]} leftIcon={<FaFilm />}
                >Download</Button>
                <IconButton onClick={()=>download(quality.format.itag,video_id)} display={["flex","none"]} icon={<FaFilm />} />
            </Td>
        </Tr>
        ))}
    </Tbody>
</Table>
)

}

export default VideoInfo