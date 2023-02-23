import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '..'
import { Container, Heading, HStack, VStack,Image,Text, Button, RadioGroup,Radio } from '@chakra-ui/react'
import Loader from './Loader'
import Exchangeca from './Exchangeca '
import Coincard from './Coincard'

function Coin() {
    const[emp,Setemp] = useState([])
    const[loading,Setloading] = useState(true)
    const[error,Seterror] = useState(false)
    const[page,Setpage] = useState(1)
    const[currency,Setcurrency] = useState("inr")

    const currencySymbol = currency	=== "inr"?"₹":currency	=== "eur"?"€":"$";

    const chanepage=(page)=>{
        Setpage(page);
        Setloading(true);

    }

    const ar = new Array(132).fill(1);

    useEffect(()=>{

        const fetchExchange  = async()=>{
           try{
            const {data}  = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
            Setemp(data)
            Setloading(false)
           }catch(error)
           {
            Seterror(true);
            Setloading(false);
              
           }
        }
        fetchExchange()

    },[currency,page])

    if(error)
        return <Exchangeca/>
  return (
    
        <Container maxW ={"container.xl"}>
            {
                loading?<Loader/>:(
                    <>
                    <HStack spacing={"4"}>
                    <RadioGroup defaultValue={currency} onChange={Setcurrency}>
                        <Radio value ={"inr"}>₹</Radio>
                        <Radio value ={"usd"}>$</Radio>
                        <Radio value ={"eur"}>€</Radio>

                    </RadioGroup>
                    </HStack>
                    <HStack wrap={"wrap"}>
                       {
                        emp.map((i)=>(
                            <Coincard
                              id={i.id}
                              name={i.name}
                              image={i.image} 
                              rank={i.trust_score_rank}
                              symbol={i.symbol} 
                              price	={i.current_price}
                              currencySymbol={currencySymbol}/>


                        ))
                       }
                       </HStack>
                       <HStack>
                        {
                                ar.map((item,index)=>(

                                    <Button  bgColor={"blackAlpha.900"}  color={"white"}  onClick={()=>chanepage(index+1)}>
                                        {index+1}</Button> 
                                    
                                ))


                        }
                       
                       </HStack>

                    
                    </>
                )
            }

        </Container>
  )
}



export default Coin