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
    } else if (req.method === "POST") {
        const session = (await getSession({ req })) as ExtendedSession

        if (!session) {
            res.status(401).json({ error: 'Not authenticated' })
            return
        }

        if (!session.user.discordId) {
            res.status(401).json({ error: 'No Discord ID linked to session. (Try re-authenticating.)' })
            return
        }

        if (!["298842558610800650", "458207669778382849", "850106314650812456"].includes(session.user.discordId)) {
            res.status(401).json({ error: 'You do not have permission to do this.' })
            return
        }

        const { collections } = req.body as { collections: ShopCollection[] }

        try {
            for (const collection of collections) {
                if (typeof collection.id !== "number" || typeof collection.name !== "string" || typeof collection.description !== "string" || !Array.isArray(collection.backgrounds) || collection.backgrounds.length === 0) {
                    res.status(400).json({ error: 'Invalid collection', message: 'One or more collections are missing required fields.', data: collection })
                    return
                }
                await query({
                    query: "INSERT INTO `collections` (`id`, `name`, `description`, `valid`) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE `name` = ?, `description` = ?, `valid` = ?",
                    values: [collection.id, collection.name, collection.description, collection.valid, collection.name, collection.description, collection.valid]
                })
                for (const background of collection.backgrounds) {
                    if (typeof background.id !== "number" || typeof background.name !== "string" || typeof background.description !== "string" || !(typeof background.price == "number" || background.price == null) || !(typeof background.thumbnail == "string" || background.thumbnail == null) || typeof background.image !== "string") {
                        res.status(400).json({ error: 'Invalid background', message: 'One or more backgrounds in collection with id "' + collection.id + '" are missing required fields.', data: background })
                        return
                    }
                    await query({
                        query: "INSERT INTO `backgrounds` (`id`, `name`, `description`, `price`, `thumbnail`, `image`) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE `name` = ?, `description` = ?, `price` = ?, `thumbnail` = ?, `image` = ?",
                        values: [background.id, background.name, background.description, background.price, background.thumbnail, background.image, background.name, background.description, background.price, background.thumbnail, background.image]
                    })
                    await query({
                        query: "INSERT INTO `background_collection` (`background_id`, `collection_id`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `collection_id` = ?",
                        values: [background.id, collection.id, collection.id]
                    })
                }
            }
            res.status(200).json({ success: true })
        } catch (e) {
            console.error(e)
            res.status(500).json({ error: 'An error occurred.' })
        }
    } else if (req.method === "DELETE") {
        const session = (await getSession({ req })) as ExtendedSession

        if (!session) {
            res.status(401).json({ error: 'Not authenticated' })
            return
        }
        if (!session.user.discordId) {
            res.status(401).json({ error: 'No Discord ID linked to session. (Try re-authenticating.)' })
            return
        }
        if (!["298842558610800650", "458207669778382849", "850106314650812456"].includes(session.user.discordId)) {
            res.status(401).json({ error: 'You do not have permission to do this.' })
            return
        }

        const { backgroundIds, collectionIds } = req.body as { backgroundIds: string[], collectionIds: string[] }
        if (!backgroundIds && !collectionIds) {
            res.status(400).json({ error: 'Invalid request' })
            return
        }

        try {
            if (collectionIds) {
                for (const collectionId of collectionIds) {
                    await query({
                        query: "DELETE FROM `background_collection` WHERE `collection_id` = ?",
                        values: [collectionId]
                    })
                    await query({
                        query: "DELETE FROM `collections` WHERE `id` = ?",
                        values: [collectionId]
                    })
                }
            }
            if (backgroundIds) {
                for (const backgroundId of backgroundIds) {
                    await query({
                        query: "DELETE FROM `background_collection` WHERE `background_id` = ?",
                        values: [backgroundId]
                    })
                    await query({
                        query: "DELETE FROM `backgrounds` WHERE `id` = ?",
                        values: [backgroundId]
                    })
                }
            }
            res.status(200).json({ success: true })
        } catch (e) {
            console.error(e)
            res.status(500).json({ error: 'An error occurred.' })
        }
    }
}