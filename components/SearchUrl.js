import React from 'react'
import {Button, Flex, FormControl, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { ArrowForwardIcon,SearchIcon } from '@chakra-ui/icons'

function SearchUrl({show,setload,load}) {
  return (
    <form method='get' action='/api/download'>
      <FormControl>
         <Flex flexDirection={["column","row"]} justifyContent="center" width={["100%","85%"]} mx="auto" gap={4} >
                  <InputGroup  overflow="hidden">
                          <InputLeftElement
                              pointerEvents='none'
                              children={<SearchIcon />}
                              />
                          <Input  onChange={(e)=>{show(e.target.value)}} name="url" type='url' fontWeight="bold" color='black' fontSize={["12px","16px"]} placeholder='Paste Youtube link' autoComplete="none" borderRadius="none" border="1px" borderColor='gray.400'  />
                    </InputGroup>
                  <Button type='submit'  rightIcon={<ArrowForwardIcon />} colorScheme='red' borderRadius="none" variant='solid'> Start</Button>
          </Flex>
      </FormControl>
    </form>
        
  
  )
}

export default SearchUrl