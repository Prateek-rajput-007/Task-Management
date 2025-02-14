"use client";

import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { Context } from "../components/Clients";
import axios from "axios";

const AddTodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const { user } = useContext(Context);
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title || !description || !dueDate || !status) return toast.error("All fields are required!");

    try {
      const { data } = await axios.post(
        "/api/newtask",
        { title, description, dueDate, status },
        { headers: { "Content-Type": "application/json" } }
      );

      if (!data.success) return toast.error(data.message);

      toast.success("Task added successfully!");
      router.refresh();
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("Pending");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add task.");
    }
  };

  if (!user._id) return redirect("/login");

  return (
    <div className="add-task-form">
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
          <button type="submit">Add Task</button>
        </form>
      </section>
    </div>
  );
};

export default AddTodoForm;
