import { createClient } from "redis";


const client = createClient({
    host: 'localhost',
    port: 6379
})

// client.connect()
client.on('erro no redis', (e) => console.log(e))

const redis = {
    async getAsync(key) {
        client.connect()
        const response = await client.get(key);
        client.disconnect()
        return response
    },
    async setAsync(key, value) {
        const ONE_MINUTE = 60 * 1;
        client.connect()
        const response = await client.set(key, value, { EX: ONE_MINUTE })
        client.disconnect()
        return response
    }
}

export default redis
