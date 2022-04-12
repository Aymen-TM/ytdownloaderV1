import React from 'react'
import {Button, Flex, FormControl, FormErrorMessage, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { ArrowForwardIcon,SearchIcon } from '@chakra-ui/icons'
import { useForm } from 'react-hook-form'

function SearchUrl({show,setload,load}) {
  const {register,handleSubmit,getValues,formState: { errors }} = useForm()

  const search_click = (event,url,error)=>{
    
    if(url && !error){
      show(url)
    }else{
      setload(false)
    }
  
  }
  const onSubmit = (data, e) => console.log(data, e);
  const onError = (errors, e) => console.log(errors, e);
  const isError = true

  

  return (
    <form onSubmit={handleSubmit(onSubmit,onError)}>
      <FormControl isInvalid={errors.url}>
         <Flex flexDirection={["column","row"]} justifyContent="center" width={["100%","85%"]} mx="auto" gap={4} >
                  <InputGroup  overflow="hidden">
                          <InputLeftElement
                              pointerEvents='none'
                              children={<SearchIcon />}
                              />
                          <Input type='url' {...register('url',{required:true,pattern:/https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/i})}  fontWeight="bold" color='black' fontSize={["12px","16px"]} placeholder='Paste Youtube link' autoComplete="none" borderRadius="none" border="1px" borderColor='gray.400'  />
                    </InputGroup>
                  <Button type='submit'  onClick={(e)=>{ search_click(e,getValues('url'),errors.url) }}  rightIcon={<ArrowForwardIcon />} colorScheme='red' borderRadius="none" variant='solid'> Start</Button>
          </Flex>
          <FormErrorMessage  width="fit-content"  maxW="xl" mx="auto" mt={3} >Pleas make sure your input match this pattern https://www.youtube.com/watch?v=.....</FormErrorMessage>
      </FormControl>
    </form>
  )
}

export default SearchUrl