import { Box, Container, HStack } from "@chakra-ui/react"
import {FaYoutube} from "react-icons/fa";


function Header() {

  return (
    <Box as="div"  padding={1} bgColor='white' boxShadow="md">
        <Container maxW={["320px","700px","900px"]} centerContent>
            <HStack color="red.500">
                <FaYoutube size={60}/>
                <Box as="h3"  fontWeight="bold"  fontSize={["lg","2xl","3xl "]} >
                YT downloader
                </Box>
            </HStack>
        </Container>
    </Box>
  )
}

export default Header