"use client";

import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import { Context } from "../../components/Clients";
import axios from "axios";

const EditTodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const { user } = useContext(Context);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await axios.get(`/api/task/${id}`);
        if (data.success) {
          setTitle(data.task.title);
          setDescription(data.task.description);
          setDueDate(data.task.dueDate);
          setStatus(data.task.status);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch task.");
      }
    };
    fetchTask();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title || !description || !dueDate || !status) return toast.error("All fields are required!");

    try {
      const { data } = await axios.put(
        `/api/task/${id}`,
        { title, description, dueDate, status },
        { headers: { "Content-Type": "application/json" } }
      );

      if (!data.success) return toast.error(data.message);

      toast.success("Task updated successfully!");
      router.push("/todos");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update task.");
    }
  };

  if (!user._id) return redirect("/login");

  return (
    <div className="edit-task-form">
      <section>
        <form onSubmit={submitHandler}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Task Title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
          />
          <input
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            type="date"
            placeholder="Due Date"
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button type="submit">Update Task</button>
        </form>
      </section>
    </div>
  );
};

export default EditTodoForm;
