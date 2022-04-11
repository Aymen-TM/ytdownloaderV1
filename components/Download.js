import { Box, Button, HStack, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { useState } from "react"


import SearchUrl from "./SearchUrl"
import VideoContainer from "./VideoContainer"

function Download() {
  const [load, setload] = useState(false)
  const [video_id,setVideo_id] = useState(null)
  

  const show = (input)=>{
    if(input != null && input !=""){
      let url = new URL(input)
      var video_id = url.searchParams.get("v");
      setVideo_id(video_id)
      setload(true)
    }else{
      setload(false)
      
    }
  }

  return (
      <Box w="100%" border='1px' borderColor='gray.400'  my={10} px={5} pt={10} >
          <Box as="h2" width="fit-content" fontSize={["24px","32px"]}  mx="auto"  mb={5}>
          Youtube Downloader
          </Box>
          <SearchUrl show ={show} setload={setload} load={load} />
          <Box as='p' textAlign="center" mt={3}>
          By using our service you are accepting our terms of service.
        </Box>
        <VideoContainer load={load} video_id={video_id} />
      </Box>
  )
}

export default Download