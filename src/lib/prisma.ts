import { Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
//import dotenv from 'dotenv'
import WebSocket from "ws"

//otenv.config()
//neonConfig.webSocketConstructor = ws
const connectionString = `${process.env.POSTGRES_PRISMA_URL};`

const pool = new Pool({ connectionString: connectionString })
const adapter = new PrismaNeon(pool,{ WebSocket })
const prisma = new PrismaClient({ adapter })

export default prisma;