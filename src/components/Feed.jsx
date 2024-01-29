import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'

import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import { Spinner } from '@chakra-ui/react'
import { feedQuery, searchQuery } from '../utils/data'

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [clothes, setClothes] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    if(categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query)
        .then((data) => {
          setClothes(data);
          setLoading(false)
        })

    } else {
      client.fetch(feedQuery)
        .then((data) => {
          setClothes(data);
          setLoading(false);
        })
    }
  }, [categoryId])

  if (loading) return <Spinner />

  if (!clothes?.length) return <h2>No clothes available.</h2>

  return (
    <div>
      {clothes && <MasonryLayout clothes={clothes} />}
    </div>
  )
}

export default Feed