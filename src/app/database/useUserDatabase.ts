import { useSQLiteContext } from "expo-sqlite"

export type UserDatabase = {
  id: number
  name: string
  cpf: string
  user: string
  password: string
}

export function useUserDatabase(){
  const database = useSQLiteContext();
  
  async function create(data: Omit<UserDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO users (name, cpf, user, password) VALUES ($name, $cpf, $user, $password)"
    )

    try{
      const result = await statement.executeAsync({
        $name: data.name,
        $cpf: data.cpf,
        $user: data.user,
        $password: data.password,
      })

      const inserteRowId = result.lastInsertRowId.toLocaleString()

      return {inserteRowId}
    } catch(error){;
        throw error
    }
  }

  async function searchByName(name: string){
    try{
      const query = "SELECT * FROM users WHERE name LIKE ?"

      const response = await database.getAllAsync<UserDatabase>(query, `%${name}%`)

      return response
    }catch(error){
      throw error
    } 
  }
  
  return {create, searchByName}    
}