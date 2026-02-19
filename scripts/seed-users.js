import bcrypt from "bcryptjs"
import { writeFileSync, mkdirSync, existsSync } from "fs"
import { join } from "path"

const dataDir = join(process.cwd(), "data")
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true })
}

const passwordHash = bcrypt.hashSync("admin1234", 12)

const users = [
  {
    id: "user-001",
    username: "admin",
    passwordHash,
  },
]

writeFileSync(join(dataDir, "users.json"), JSON.stringify(users, null, 2))
console.log("Users seeded successfully.")
console.log("Default credentials: admin / admin123")
