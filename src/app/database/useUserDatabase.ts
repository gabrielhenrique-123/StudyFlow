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

export type TestsDatabase = {
  id: number
  name: string
  subject: string
  date: string
}

export function useTestDatabase(){
  const database = useSQLiteContext();
  
  async function createTests(data: Omit<TestsDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO tests (name, subject, date) VALUES ($name, $subject, $date)"
    )

    try{
      const result = await statement.executeAsync({
        $name: data.name,
        $subject: data.subject,
        $date: data.date
      })

      const inserteRowId = result.lastInsertRowId.toLocaleString()

      return {inserteRowId}
    } catch(error){;
        throw error
    }
  }

  async function searchTests(){
    try{
      const query = "SELECT * FROM tests"
      const response = await database.getAllAsync<TestsDatabase>(query);
      return response;
    }catch(error){
      throw error
    } 
  }
  
  async function update(data: TestsDatabase) {
    const statement = await database.prepareAsync(
      "UPDATE products SET name = $name, subject = $subject, date = $date WHERE id = $id"
    )

    try {
      await statement.executeAsync({
        $id: data.id,
        $name: data.name,
        $subject: data.subject,
        $date: data.date,
      })
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function remove(id: number) {
    try {
      await database.execAsync("DELETE FROM tests WHERE id = " + id)
    } catch (error) {
      throw error
    }
  }

  async function show(id: number) {
    try {
      const query = "SELECT * FROM tests WHERE id = ?"

      const response = await database.getFirstAsync<TestsDatabase>(query, [
        id,
      ])

      return response
    } catch (error) {
      throw error
    }
  }

  async function searchByName(name: String) {
    try {
      const query = "SELECT * FROM tests WHERE name LIKE ?"

      const response = await database.getAllAsync<TestsDatabase>(
        query,
        `%${name}%`
      )

      return response
    } catch (error) {
      throw error
    }
  }


  return { createTests, searchTests, update, remove, show, searchByName }
}
