'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
import "../app/globals.css"
import { firestore } from '../lib/firebase'

import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'


import SearchInventory from './SearchInventory'
 


export default function Inventory() {
  const [inventory, setInventory] = useState([]) 
  const [filteredInventory, setFilteredInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id, 
        ...doc.data(),
      })    
    })
    setInventory(inventoryList)
    setFilteredInventory(inventoryList)
  }


  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      }
      else {
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }
    await updateInventory()
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + 1})
    }
    else {
      await setDoc(docRef, {quantity: 1})
    }
    await updateInventory()
  }


  useEffect(() => { 
    updateInventory()
  }, [])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  

  // We'll add our component logic here
  return (
    <Box 
    width="100vw"
    height="100vh"
    display = {'flex'}
    justifyContent={'center'}
    alignItems={'center'}
    flexDirection={'column'}
    gap={2}
    >
      <SearchInventory onSearch={setSearchQuery}/>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box 
          position = {'absolute'}
          top = {'50%'}
          left={'50%'}
          sx= {{
          transform: 'translate(-50%, -50%)'
          }}
          width={'400px'}
          bgcolor={'#f0f0f0'}
          borders={'1px solid black'}
          boxShadow={24}
          p={4}
          display={'flex'}
          flexDirection="column"
          gap={3}
        >
          <Typography variant={'h6'}>Add item</Typography>
          <Stack component="div" width= {'100%'} direction={'row'} spacing={2}>
            <TextField variant = {'outlined'}
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            />
            <Button variant = {'outlined'}
            onClick={() => {
              addItem(itemName)
              setItemName('')
              handleClose()
            }}
            >Add</Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant={'outlined'} onClick={()=>{
        handleOpen()
      }}>
        Add New item
      </Button>
      <Box border={'1px solid black'}>
      <Box
          width={'800px'} 
          height={'100px'} 
          bgcolor="#ADD8E6" 
          display={'flex'}
          alignItems={'center'} 
          justifyContent={'center'}>
          <Typography variant={'h2'}>Inventory Item</Typography>
      </Box>
      <Stack width = '800px' height='300px' spacing={2} overflow='auto'>
          {inventory.map(({name, quantity}) => (
            <Box key={name}
              width={'100%'}
              minHeight='150px'
              display={'flex'}
              justifyContent={'space-between'}
              padding={5}>
              <Typography 
                variant={'h3'} 
                color='333' 
                textAlign={'center'}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography 
                variant={'h3'} 
                color='333' 
                textAlign={'center'}>
                  {quantity}
              </Typography>
              <Stack direction={'row'} spacing={2}>
              <Button
                variant={'outlined'} 
                onClick={() => {
                  removeItem(name)
                  }}
              >Remove
              </Button>
              <Button
                variant={'outlined'}
                onClick={() => {
                  addItem(name)
                }}>
                  Add
                </Button>
              </Stack>
            </Box>
          ))}
      </Stack>
      </Box>
    </Box>
  )
}

