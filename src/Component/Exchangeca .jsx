import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react'
import React from 'react'

function Exchangeca() {
  return (
  <Alert
  status='error'
  position={"fixed"}
  bottom={"4"}
  left={"50%"}
  transform={"translateX(-50%)"}
  w={"container.lg"} >

      <AlertIcon>
          Error 
      </AlertIcon>
  </Alert>
  )
}

export default Exchangeca 