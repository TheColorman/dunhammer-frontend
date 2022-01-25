import { NextApiRequest, NextApiResponse } from "next";

const response = {
    collections: [
        {
            id: 1,
            name: "Collection 1",
            description: "This is a collection",
            backgrounds: [
                {
                    id: 1,
                    name: "Background 1",
                    description: "This is a background in collection 1",
                    price: 1000,
                    thumbnail: "https://i.imgur.com/wSTFkRM.png",
                    image: "https://i.imgur.com/wSTFkRM.png",

                }, {
                    id: 2,
                    name: "Background 2",
                    description: "This is a background in collection 1",
                    price: 1000,
                    thumbnail: "https://i.imgur.com/wSTFkRM.png",
                    image: "https://i.imgur.com/wSTFkRM.png",
                }, {
                    id: 3,
                    name: "Background 3",
                    description: "This is a background in collection 1",
                    price: 1000,
                    thumbnail: "https://i.imgur.com/wSTFkRM.png",
                    image: "https://i.imgur.com/wSTFkRM.png",
                }, {
                    id: 4,
                    name: "Background 4",
                    description: "This is a background in collection 1",
                    price: 1000,
                    thumbnail: "https://i.imgur.com/wSTFkRM.png",
                    image: "https://i.imgur.com/wSTFkRM.png",
                }, {
                    id: 5,
                    name: "Background 5",
                    description: "This is a background in collection 1",
                    price: 1000,
                    thumbnail: "https://i.imgur.com/wSTFkRM.png",
                    image: "https://i.imgur.com/wSTFkRM.png",
                }, {
                    id: 6,
                    name: "Background 6",
                    description: "This is a background in collection 1",
                    price: 1000,
                    thumbnail: "https://i.imgur.com/wSTFkRM.png",
                    image: "https://i.imgur.com/wSTFkRM.png",
                }
            ]
        }, {
            id: 2,
            name: "Collection 2",
            description: "This is a collection",
            backgrounds: [
                {
                    id: 1,
                    name: "Background 1",
                    description: "This is a background in collection 2",
                    price: 1000,
                    thumbnail: "https://i.imgur.com/wSTFkRM.png",
                    image: "https://i.imgur.com/wSTFkRM.png",
                }, {
                    id: 2,
                    name: "Background 2",
                    description: "This is a background in collection 2",
                    price: 1000,
                    thumbnail: "https://i.imgur.com/wSTFkRM.png",
                    image: "https://i.imgur.com/wSTFkRM.png",
                }, {
                    id: 3,
                    name: "Background 3",
                    description: "This is a background in collection 2",
                    price: 1000,
                    thumbnail: "https://i.imgur.com/wSTFkRM.png",
                    image: "https://i.imgur.com/wSTFkRM.png",
                }
            ]
        }
    ],
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse  
) {
    res.status(200).json(response)
}