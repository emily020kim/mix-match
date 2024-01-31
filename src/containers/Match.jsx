import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Search from '../components/Search'
import Feed from '../components/Feed'
import CreateClothes from '../components/CreateClothes'
import ClothesDetail from '../components/ClothesDetail'
import Outfit from '../components/Outfit'

const Match = ({ user }) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div>
            <div className='bg-gray-700'>
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user && user} />
            </div>
            <div className='h-full'>
                <Routes>
                    <Route path="/" element={<Feed />} />
                    <Route path="/category/:categoryId" element={<Feed />} />
                    <Route path="/clothes-detail/:clothesId" element={<ClothesDetail user={user && user} />} />
                    <Route path="/create-clothes" element={<CreateClothes user={user && user} />} />
                    <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
                    <Route path="/outfit" element={<Outfit user={user && user} />} />
                </Routes>
            </div>
        </div>
    )
}

export default Match