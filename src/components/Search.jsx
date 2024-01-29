import { useEffect, useState } from 'react';

import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import { Spinner } from '@chakra-ui/react'
import MasonryLayout from '../components/MasonryLayout'

const Search = ({ searchTerm }) => {
  const [clothes, setClothes] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm !== '') {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setClothes(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setClothes(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner />}
      {clothes?.length !== 0 && <MasonryLayout clothes={clothes} />}
      {clothes?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl">No Clothes Found!</div>
      )}
    </div>
  );
};

export default Search;