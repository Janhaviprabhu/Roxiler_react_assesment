import { Box, Button, Flex, Heading, HStack, Image, Input, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTodo } from '../Redux/actions'

const Todo = () => {
 const {task,isLoading,isError} = useSelector((store) =>store.todo)
 const dispatch =useDispatch()
 const [user,setUser]=useState([])
 const [order,setOrder]=useState('asc')
 const [search,setSearch]=useState('')


    async function getUser(id){
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    setUser(res.data)
    console.log(res.data)   
}
 const handleSortClick = (order) => {
    setOrder(order);
  };

   let sortedTodos = task.sort((a, b) =>
    order === "asc" ? a.id - b.id : b.id - a.id
  );

    useEffect(()=>{
       dispatch(getTodo())
    },[])

    if (search) {
    sortedTodos = sortedTodos.filter((ele) => {
      return (
        ele.id.toString().includes(search) ||
        ele.title.toLowerCase().includes(search.toLowerCase()) ||
        ele.completed.toString().includes(search)
      );
    });
  }
  function handleClick(){
    setSearch('')
  }

    if(isLoading){
        return <Box mt={20} ><Image mt={20} width="20%" margin="auto" src="https://media.tenor.com/0iK9a1WkT40AAAAM/loading-white.gif"/></Box>
    }
    if (isError){
        return <Box mt={20} ><Image  width="20%" margin="auto" src="https://media.tenor.com/5JunKCV2DEIAAAAC/error404-404.gif"/></Box>
    }

  return (
    <div >
        <Flex p={10} width={"30%"} margin="auto" gap={5}><Button color={'white'} backgroundColor={'black'}  _hover={{bg: 'gray.600'}} onClick={() => handleSortClick("asc")}>
          Sort by ID (Ascending)
        </Button>
        <Button color={'white'} backgroundColor={'black'}  _hover={{bg: 'gray.600'}} onClick={() => handleSortClick("desc")}>
          Sort by ID (Descending)
        </Button></Flex>
        
    <Input p={2} variant={'flushed'}  width={'20%'} placeholder='Search todo here' value={search} onChange={(e) => setSearch(e.target.value)}/><Button color={'white'} backgroundColor={'black'}  _hover={{bg: 'gray.600'}}  onClick={handleClick}>Clear</Button>
      <Flex p={5}>
        <Box   width={"60%"} margin='auto'>
            <Heading p={2} color={'black'} fontSize={'md'} noOfLines={1}>Todos</Heading>
        <TableContainer border='1px solid gray'>
        <Table variant='simple'>
            <Thead>
            <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Status</Th>
                <Th >Action</Th>
            </Tr>
            </Thead>
            <Tbody>
                {sortedTodos.map((ele)=>{
                    return (
                        <>
                    <Tr key={ele.id}>
                    <Td>{ele.id}</Td>
                    <Td>{ele.title}</Td>
                    <Td >{ele.completed?"Complete":"Incomplete"}</Td>
                    <Td><Button color={'white'} backgroundColor={'black'}  _hover={{bg: 'gray.600'}} onClick={()=>getUser(ele.id)}>View User</Button></Td>
            </Tr>
            </>
                )
                })}
            </Tbody>
            
        </Table>
        </TableContainer>
        </Box>
        <Box width={"32%"}>
        <Box
        w="xs"
        rounded={'sm'}
        my={5}
        mx={[0, 5]}
        overflow={'hidden'}
        bg="white"
        border={'1px'}
        borderColor="black"
      >
        
        <Box p={4}>
          <Box
            display={'inline-block'}
            px={2}
            py={1}
            mb={2}>
            <Text fontSize={'md'} fontWeight="medium">
            Todo ID : {user.id}
            </Text>
          </Box>
           <Text  px={2}
            py={1}  mb={2} fontSize={'md'} fontWeight="medium">
            User  ID : {user.id}
            </Text>
          <Heading color={'black'} fontSize={'md'} noOfLines={1}>Name : {user.name}</Heading>
        </Box>
        <HStack  display={"inline-block"} borderTop={'1px'} color="black">
          <Flex
            p={4}
            roundedBottom={'sm'}
            cursor={'pointer'}
            w="full">
            <Text   fontSize={'md'} fontWeight={'semibold'}>
             Email : {user.email}
            </Text>
          </Flex>
          
        </HStack>
      </Box>
         
        
        </Box>
      </Flex>
   
                
          
      
    </div>
  )
}

export default Todo
