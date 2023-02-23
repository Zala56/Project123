import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '..'
import { Container, Heading, HStack, VStack,Image,Text } from '@chakra-ui/react'
import Loader from './Loader'
import Exchangeca from './Exchangeca '

function Exchangr() {

    const[emp,Setemp] = useState([])
    const[loading,Setloading] = useState(true)
    const[error,Seterror] = useState(false)
    useEffect(()=>{

        const fetchExchange  = async()=>{
           try{
            const {data}  = await axios.get(`${server}/exchanges`);
            Setemp(data)
            Setloading(false)
           }catch(error)
           {
            Seterror(true);
            Setloading(false);
              
           }
        }
        fetchExchange()

    },[])

    if(error)
        return <Exchangeca/>
  return (
    
        <Container maxW ={"container.xl"}>
            {
                loading?<Loader/>:(
                    <>
                    <HStack wrap={"wrap"}>
                       {
                        emp.map((i)=>(
                            <Exchangecaa
                              id={i.id}
                              name={i.name}
                              image={i.image} 
                              rank={i.trust_score_rank} url={i.url}/>


                        ))
                       }
                       </HStack>
                    
                    </>
                )
            }

        </Container>
  )
}
const  Exchangecaa=({name,image,rank,url})=>(

<a href={url} target={"_blank"}>

        <VStack w={"52"} shadow={"lg"} p={"8"}  borderRadius={"lg"} transition={"all 0.3s"} 
        
        m ={"4"}
        css ={{
            "&:hover":{
                transform:"scale(1.1)"
            }
        }}
        
        >
            <Image src ={image} w ={"10"} h={"10"} 	 objectFit={"contain"}/>
            <Heading size={"md"} noOfLines={"1"}>{rank}</Heading>
            <Text noOfLines={"1"}>{name}</Text>
        </VStack>
</a>

)

export default Exchangr