
import { z } from "zod"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { UserNav } from "./components/user-nav"
import { Task, taskSchema } from "./data/schema"
import { useEffect, useState } from "react"


// Simulate a database read for tasks.
async function getTasks() {
  // const data = await fs.readFile(
  //   path.join(process.cwd(), "app/(app)/examples/tasks/data/tasks.json")
  // )

  const res = await fetch('/tasks.json')
  const tasks = await res.json()

  // const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

export default function TaskPage() {

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    (async function() {
      const results = await getTasks().catch((err) => {console.log(err.message); return []});
      console.log(results[0])
      setTasks(results)
    })
  }, [])

  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <img
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}
