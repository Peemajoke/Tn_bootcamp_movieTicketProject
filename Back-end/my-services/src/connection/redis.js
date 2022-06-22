import Redis from 'ioredis'

import apicache from 'apicache-plus'

const cacheWithRedis = apicache.options({
redisClient: new Redis('redis://Peem:Joke-0858@redis-14784.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:14784'),
})

export {
cacheWithRedis,
}