import { cookies } from "next/headers";
import React from "react";
import TodoItem from "../components/TodoItem";
import axios from "axios";

const fetchTodo = async (token) => {
  try {
    const { data } = await axios.get(`${process.env.URL}/api/mytask`, {
      headers: { Cookie: `token=${token}` },
      withCredentials: true, // Ensures cookies are sent with the request
    });

    return data.success ? data.tasks : [];
  } catch (error) {
    console.error("Error fetching tasks:", error.response?.data?.message || error.message);
    return [];
  }
};

const Todos = async () => {
  const token = cookies().get("token")?.value;
  const tasks = await fetchTodo(token);

  return (
    <section className="todos-container">
      {tasks.length > 0 ? (
        tasks.map((i) => (
          <TodoItem
            title={i.title}
            description={i.description}
            dueDate={i.dueDate}
            status={i.status}
            id={i._id}
            key={i._id}
          />
        ))
      ) : (
        <p className="no-tasks">No tasks found. Add some tasks!</p>
      )}
    </section>
  );
};

export default Todos;
