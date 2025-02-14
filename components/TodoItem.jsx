"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TodoButton } from "./Clients";
import axios from "axios";
import { toast } from "react-hot-toast";

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

const TodoItem = ({ title, description, dueDate, status, id }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editDueDate, setEditDueDate] = useState(dueDate);
  const [editStatus, setEditStatus] = useState(status);
  const [includeInPdf, setIncludeInPdf] = useState(false);

  useEffect(() => {
    setEditTitle(title);
    setEditDescription(description);
    setEditDueDate(dueDate);
    setEditStatus(status);
  }, [title, description, dueDate, status]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/task/${id}`,
        { title: editTitle, description: editDescription, dueDate: editDueDate, status: editStatus },
        { headers: { "Content-Type": "application/json" } }
      );

      if (!data.success) return toast.error(data.message);

      toast.success("Task updated successfully!");
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update task.");
    }
  };

  const handleIncludeInPdf = async () => {
    try {
      const { data } = await axios.put(
        `/api/task/${id}/includeInPdf`,
        { includeInPdf: !includeInPdf },
        { headers: { "Content-Type": "application/json" } }
      );

      if (!data.success) return toast.error(data.message);

      setIncludeInPdf(!includeInPdf);
      toast.success(
        includeInPdf
          ? "Task removed from PDF."
          : "Task updated for PDF inclusion! You can download the PDF from your profile."
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update task.");
    }
  };

  return (
    <div className={`todo ${editStatus === "Completed" ? "completed" : ""}`}>
      {isEditing ? (
        <form onSubmit={handleEdit} className="edit-task-form">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            type="text"
            placeholder="Task Title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Task Description"
          />
          <input
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            type="date"
            placeholder="Due Date"
          />
          <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <div className="todo-details">
            <h3>{title}</h3>
            <p>{description}</p>
            <p>Due Date: {formatDate(dueDate)}</p>
            <p>Status: {status}</p>
          </div>
          <div className="todo-actions">
            <TodoButton id={id} />
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="edit-btn" onClick={handleIncludeInPdf}>
              {includeInPdf ? "Remove from PDF" : "Include in PDF"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
