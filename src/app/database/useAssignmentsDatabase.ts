import { useSQLiteContext } from "expo-sqlite"

export type AssignmentsDatabase = {
  id: number
  name: string
  subject: string
  date: string
  description: string
}

export function useAssignmentsDatabase(){
  const database = useSQLiteContext();
  
  async function createAssignments(data: Omit<AssignmentsDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO assignments (name, subject, date, description) VALUES ($name, $subject, $date, $description)"
    )

    try{
      const result = await statement.executeAsync({
        $name: data.name,
        $subject: data.subject,
        $date: data.date,
        $description: data.description
      })

      const inserteRowId = result.lastInsertRowId.toLocaleString()

      return {inserteRowId}
    } catch(error){;
        throw error
    }
  }

  async function searchAssignments(){
    try{
      const query = "SELECT * FROM assignments"
      const response = await database.getAllAsync<AssignmentsDatabase>(query);
      return response;
    }catch(error){
      throw error
    } 
  }
  
  async function update(data: AssignmentsDatabase) {
    const statement = await database.prepareAsync(
      "UPDATE assignments SET name = $name, subject = $subject, date = $date, description = $description WHERE id = $id"
    )

    try {
      await statement.executeAsync({
        $id: data.id,
        $name: data.name,
        $subject: data.subject,
        $date: data.date,
        $description: data.description,
      })
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function remove(id: number) {
    try {
      await database.execAsync("DELETE FROM assignments WHERE id = " + id)
    } catch (error) {
      throw error
    }
  }

  async function show(id: number) {
    try {
      const query = "SELECT * FROM assignments WHERE id = ?"

      const response = await database.getFirstAsync<AssignmentsDatabase>(query, [
        id,
      ])

      return response
    } catch (error) {
      throw error
    }
  }

  async function searchByName(name: String) {
    try {
      const query = "SELECT * FROM assignments WHERE name LIKE ?"

      const response = await database.getAllAsync<AssignmentsDatabase>(
        query,
        `%${name}%`
      )

      return response
    } catch (error) {
      throw error
    }
  }
  return { createAssignments, searchAssignments, update, remove, show, searchByName }
}
