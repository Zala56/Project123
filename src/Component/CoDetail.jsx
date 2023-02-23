import { Badge, Box, Container, Progress, Stat, StatArrow, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'
import React, { useState,useEffect } from 'react'
import Loader from './Loader'
import { useParams } from 'react-router-dom'
import {Heading, HStack, VStack,Image,Text, Button, RadioGroup,Radio } from '@chakra-ui/react'
import axios from 'axios'
import { server } from '..'
import Exchangeca from './Exchangeca '
import Chart from './Chart'

function CoDetail() {
  const[coin,Setcoin] = useState({})
  const[loading,setLoading] = useState(true)
  const[error,Seterror] = useState(false)
  const[currency,Setcurrency] = useState("inr")
  const[curday,setDays] = useState("24h")
  const[chara,Setchara] = useState([])


  const params = useParams();
  const currencySymbol = currency	=== "inr"?"₹":currency	=== "eur"?"€":"$";
  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  
  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  useEffect(()=>{

    const fetchExchange  = async()=>{
       try{
        const {data}  = await axios.get(`${server}/coins/${params.id}`);
         const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${curday}`
        );
        console.log(chartData)
        Setcoin(data)
        Setchara(chartData.prices)
         setLoading(false)
       }catch(error)
       {
        Seterror(true);
        setLoading(false);
          
       }
    }
    fetchExchange()

},[params.id,currency,chara])
if(error)
return <Exchangeca/>

  return (
   <Container maxW={"container.xl"}>
    {
      loading?<Loader/>:(
                    <>

                    <Box width={"full"} borderWidth	={"1"}>
                    <HStack wrap={"wrap"}>
                       <Chart  arr ={chara} currency={currencySymbol} days={curday}/>
                       </HStack>
                    </Box> 	

                    <HStack>
                      {
                     btns.map((i)=>(
                        <Button
                         disabled={curday === i}
                         key={i}
                          onClick={() => switchChartStats(i)}
                        >
                          {i}
                          
                          
                          </Button> 	

                     ))
                  } 
                      </HStack>

                    <RadioGroup defaultValue={currency} onChange={Setcurrency}>
                        <Radio value ={"inr"}>₹</Radio>
                        <Radio value ={"usd"}>$</Radio>
                        <Radio value ={"eur"}>€</Radio>

                        </RadioGroup>

                        <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
                          <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"}>
                            Last Updated On{Date(coin.market_data.last_updated).split("G")}
                          </Text>
                          <Image src={coin.image.large} h={"16"} w={"16"} objectFit={"contain"}></Image>

                          <Stat>
                            <StatLabel>{coin.name}</StatLabel>
                            <StatNumber>{ currencySymbol}
                            {coin.market_data.current_price[currency]}</StatNumber>

                            <StatHelpText>
                              <StatArrow type	={
                                  coin.market_data.price_change_percentage_24h>0?"increase":"decrease"}>
                                {coin.market_data.price_change_percentage_24h}%

                              </StatArrow>
                            </StatHelpText>
                          </Stat>
                          <Badge 
                           fontSize={"2xl"}
                           bgColor={"blackAlpha.800"}
                           color={"White"} 
                           	>
                            {`#${coin.market_cap_rank}`}
                            </Badge> 	
                                <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} 
                                        low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}/>

                              <Box w ={"full"} p="4">
                               <Item title={"Max Supply"} value={coin.market_data.max_supply}></Item> 
                               <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply}></Item> 
                               <Item title={"Market Cap"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}></Item> 
                               <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`}></Item> 
                               <Item title={"All Time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`}></Item>  
                              </Box> 	
                        </VStack>

                    
                    </>
      )}

   </Container>
  )
}

const Item=({title,value})=>(
    <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
      <Text fontFamily={"bebas"}>{title}</Text>
      <Text paddingRight={"70%"}>{value}</Text>
    </HStack>

)

const CustomBar=({high,low})=>(


  <VStack>
    <Progress value={50} colorScheme={"teal"} w={"full"}>  </Progress>
      <HStack justifyContent={"space-between"} w={"full"}>
        <Badge colorScheme={"red"}>{low}</Badge>
        <Text fontSize={"sm"} >24th Range</Text>
        <Badge children={high} colorScheme={"green"}></Badge>
      </HStack>

  

    





  </VStack>


)

export default CoDetail