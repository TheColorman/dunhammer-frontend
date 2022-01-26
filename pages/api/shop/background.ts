import { NextApiRequest, NextApiResponse } from "next";
import type { ExtendedSession, ShopCollection, SqlShopCollection } from "../../../lib/types";
import query from "../../../lib/db";
import { getSession } from "next-auth/react";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        // Returns a list of rows 
        const sqlCollection = await query({
            query: "SELECT `cl`.`id` as `collection_id`, `cl`.`name` as `collection_name`, `cl`.`description` AS `collection_description`, `bg`.`id` AS `background_id`, `bg`.`name` AS `background_name`, `bg`.`description` AS `background_description`, `price`, `thumbnail`, `image` FROM `collections` `cl` JOIN `background_collection` `bg_cl` ON `cl`.`id` = `bg_cl`.`collection_id` JOIN `backgrounds` `bg` ON `bg_cl`.`background_id` = `bg`.`id` WHERE `cl`.`valid` = 1",
            values: []
        })
        // Convert to ShopCollection
        let collections: ShopCollection[] = []
        for (const collection of sqlCollection as SqlShopCollection[]) {
            const { collection_id, collection_name, collection_description, background_id, background_name, background_description, price, thumbnail, image } = collection
            const background: ShopCollection["backgrounds"][0] = {
                id: background_id,
                name: background_name,
                description: background_description,
                price,
                thumbnail,
                image
            }
            if (collections.find(c => c.id === collection_id)) {
                collections.find(c => c.id === collection_id)!.backgrounds.push(background)
            } else {
                collections.push({
                    id: collection_id,
                    name: collection_name,
                    description: collection_description,
                    backgrounds: [background]
                })
            }
        }


        res.status(200).json({ collections })
        return

                }
                }
        }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse  
) {
    res.status(200).json(response)
}