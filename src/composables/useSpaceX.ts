
import type { Launch, Payload, Launchpad } from '@/types/launch'

export function useSpaceX() {
    const BASE_URL = 'https://api.spacexdata.com/v5'

    const getNextLaunch = async (): Promise<Launch> => {
        const response = await fetch(`${BASE_URL}/launches/next`)
        return await response.json()
    }

    const getLatestLaunches = async (limit: number = 10): Promise<Launch[]> => {
        const query = {
            query: {},
            options: {
                limit,
                sort: {
                    date_utc: 'desc'
                }
            }
        }

        const response = await fetch(`${BASE_URL}/launches/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        })

        const data = await response.json()
        return data.docs
    }

    const getPayloadDetails = async (payloadId: string): Promise<Payload> => {
        const response = await fetch(`${BASE_URL}/payloads/${payloadId}`)
        return await response.json()
    }

    const getLaunchpadDetails = async (launchpadId: string): Promise<Launchpad> => {
        const response = await fetch(`${BASE_URL}/launchpads/${launchpadId}`)
        return await response.json()
    }

    return {
        getNextLaunch,
        getLatestLaunches,
        getPayloadDetails,
        getLaunchpadDetails
    }
}