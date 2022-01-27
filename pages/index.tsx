//pages/index.js
import Head from "next/head";
import { Box, Center, Container, Text, Wrap, WrapItem, Stack, HStack, VStack, Button, ButtonGroup } from "@chakra-ui/react";
import React, { useState } from "react";
import Router from 'next/router'
import Image from "next/image";

import {getCuratedPhotos} from "../lib/api";

export default function Home({data, pageNumber}) {
  var pageIndex = 1;
  const [photos, setPhotos] = useState(data);
  const [totPages, setTotPages] = useState(pageNumber);
  const myLoader=({src})=>{
    return `https://www.artic.edu/${src}`;
  }
  const myLoader_1=({src})=>{
    return `https://artic-web.imgix.net/${src}`;
  }  
  const loadMore = async () => {
    console.log("Loading More...")
    pageIndex += 1
    if (pageIndex < totPages) {
      const [_data, _pageNumber] = await getCuratedPhotos(pageIndex)
      setPhotos(photos.concat(_data))  
    }
  }
  const clickItem = () => {
    // Router.push('/about')
  }

  return (
    <div>
      <Head>
        <title> NextJS Image Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box overflow="hidden" bg="purple.100" minH="100vh">
        <Container maxW='container.xl' justify="center">
          <VStack>
            <Text
              color="pink.800"
              fontWeight="semibold"
              mb="1rem"
              textAlign="center"
              textDecoration="underline"
              fontSize={["4xl", "4xl", "5xl", "5xl"]}
            >
              NextJS Image Gallery
            </Text>
            <Wrap px="1rem" spacing={4} justify="center">
              {photos.map((pic) => (
                <WrapItem
                  key={pic.id}
                  boxShadow="base"
                  overflow="hidden"
                  _hover={{ boxShadow: "dark-lg" }}
                  onClick={clickItem}
                >
                  <VStack spacing='24px' justify="left">
                    {
                      pic.image_id === null && (pic.hasOwnProperty('image_url') && pic.image_url !== null) ? 
                      (<Image my="1" loader={myLoader_1} 
                        src={`${pic.image_url.replace("https://artic-web.imgix.net", "")}`} 
                        height={200} width={200} alt={pic.id} />) :
                      (<Image my="1" loader={myLoader} 
                        src={`/iiif/2/${pic.image_id}/full/843,/0/default.jpg`} 
                        height={200} width={200} alt={pic.id}/>)
                    }                    
                    <Text fontSize='sm' my="1"> {pic.title.length > 10 ? pic.title.substr(0, 11) : pic.title} </Text> 
                    <Text fontSize='xs' my="1"> {pic.aic_start_at.substr(0, 10)} -  {pic.aic_end_at ? pic.aic_end_at.substr(0, 10) : "Present"}</Text> 
                  </VStack>               
                </WrapItem>
              ))}
            </Wrap>         
            <Button colorScheme='teal' variant='ghost' justify="center" my="40" onClick={loadMore}>
              Loading more exhibitions...
            </Button>
          </VStack>
        </Container>
      </Box>
    </div>
  );
}

export async function getServerSideProps() {
  const [data, pageNumber] = await getCuratedPhotos(1);
  // console.log(data)
  return {
    props: {
      data,
      pageNumber,
    },
  };
}