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

      const insertedRowId = result.lastInsertRowId.toLocaleString()

      return {insertedRowId}
    } catch(error){;
        throw error
    }
  }

  async function searchVerify(user: string, password: string){
    try{
      const query = "SELECT * FROM users WHERE user = ? AND password = ?"
      const response = await database.getFirstAsync<UserDatabase>(query, [user, password]);
      return response;
    }catch(error){
      throw error
    } 
  }

  async function searchName(id: number){
    try{
      const query = "SELECT name FROM user WHERE id = ?"
      const response = await database.getFirstAsync<UserDatabase>(query, `%${id}%`)
      return response
    } catch(error){
      console.log("Não encontrado")
    }
  }
  
  return {create, searchVerify, searchName}    
}

