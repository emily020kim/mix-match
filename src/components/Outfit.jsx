import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'

import { client } from '../client'
import { Spinner } from '@chakra-ui/react'
import { clothesCategoryQuery } from '../utils/data'

import { Carousel } from "react-responsive-carousel"
import { Image } from "@chakra-ui/react"


const Outfit = ({ user }) => {
    const [clothes, setClothes] = useState();
    const [category, setCategory] = useState();
    const { categoryId } = useParams();

    const fetchClothesByCategory = () => {
        const query = clothesCategoryQuery(categoryId);

        if (query) {
            client.fetch(`${query}`).then((data) => {
                setCategory(data[0]);
                console.log(data);
            });
        }
    };

    useEffect(() => {
        fetchClothesByCategory();
    }, [categoryId]);

    if (!clothes) return <Spinner />;

    return (
        <div className="m-2">
            {user ? (
                <div className="flex fel-col w-full h-full items-center justify-center">
                    <Carousel infiniteLoop>
                        {clothes
                            .filter(cloth => cloth.categoryId === "tops")
                            .map((cloth, index) => {
                                return <Image key={index} src={cloth.image} height="auto" width="800px" />;
                        })}
                    </Carousel>
                </div>
            ) : (
                <h2>No clothes in that category.</h2>
            )}
        </div>
    )
}

export default Outfit