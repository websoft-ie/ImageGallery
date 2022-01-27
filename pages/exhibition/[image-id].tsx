// exibition/:image-id
import { useRouter } from 'next/router';
import React, { useState } from "react";
import { Box, Center, Container, Text, Wrap, WrapItem, Flex, Stack, HStack, VStack, Button, ButtonGroup } from "@chakra-ui/react";
import Image from "next/image";
import {getCuratedPhotos} from "../../lib/api";

export default function IndexedImage(data) {
  const { query } = useRouter();
  const [photo, setPhoto] = useState(data);
  const myLoader=({src})=>{
    return `https://www.artic.edu/${src}`;
  }
  
  if (photo.data === "404 Error") {
    return (
      <div>
        <h1>{photo.data}</h1>
      </div>
    )
  }
  return (
    <div>
      <Box overflow="hidden" bg="purple.100" minH="100vh">
        <Container maxW='container.xl' mt={40}>
          <VStack>
            <HStack width={800}>
              <Text>{photo.data.title}</Text>
              <Text fontSize='xs' my="1"> {photo.data.aic_start_at.substr(0, 10)} -  {photo.data.aic_end_at ? photo.data.aic_end_at.substr(0, 10) : "Present"}</Text> 
            </HStack>
            <Flex>
              <Box>
                <Wrap px="1rem" spacing={4}>
                  <WrapItem
                    key={photo.data.id}
                    boxShadow="base"
                    overflow="hidden"
                    _hover={{ boxShadow: "dark-lg" }}
                  >
                    <VStack spacing='24px'>
                      <Image my="1" loader={myLoader} src={`/iiif/2/${photo.data.image_id}/full/843,/0/default.jpg`} height={200} width={200} alt={photo.data.id} />
                      </VStack>               
                  </WrapItem>
                </Wrap> 
              </Box>
              <Box>
                <Text width={600}>
                  {photo.data.description}
                </Text>
              </Box>
            </Flex>
          </VStack>  
        </Container>
      </Box>      
    </div>
  );
}

export async function getServerSideProps(context) {
  const query = context.query;
  const res = await fetch(
    `https://api.artic.edu/api/v1/exhibitions/${query['image-id']}`
  );
  console.log(res.status)
  let data = "404 Error"
  if (res.status !== 200) {
    return {
      props: {
        data
      }
    }
  }
  else {
    const responseJson = await res.json();
    data = responseJson.data
    return {
      props: {
        data
      },
    };
  }

}