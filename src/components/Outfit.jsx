import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'

import { client } from '../client'
import { Spinner } from '@chakra-ui/react'
import { clothesCategoryQuery } from '../utils/data'

import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Image } from "@chakra-ui/react"


const Outfit = ({ user }) => {
    const [clothes, setClothes] = useState();
    const { categoryId } = useParams();

    const fetchClothesByCategory = () => {
        const query = clothesCategoryQuery(categoryId);

        if (query) {
            client.fetch(`${query}`).then((data) => {
                setClothes(data);
                console.log(data);
            }).catch(error => console.error("Error fetching clothes: ", error));
        }
    };

    useEffect(() => {
        fetchClothesByCategory();
    }, [categoryId]);

    if (!clothes) return <Spinner />;

    return (
        <div className="m-4">
            {user ? (
                <div className="flex flex-col w-full h-full items-center justify-center">
                    <Carousel infiniteLoop showArrows={true}>
                        {clothes
                            .map((item, index) => {
                                return <Image key={index} src={item.image.asset.url} objectFit='contain' height="300px" width="600px" />;
                        })}
                    </Carousel>
                    <Carousel infiniteLoop>
                        {clothes
                            .map((item, index) => {
                                return <Image key={index} src={item.image.asset.url} objectFit='contain' height="300px" width="600px" />;
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