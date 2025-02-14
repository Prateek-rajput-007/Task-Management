"use client";

import React, { useContext } from "react";
import { Context } from "../../components/Clients";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { user } = useContext(Context);

  if (!user._id) return redirect("/login");

  const handleDownload = async () => {
    try {
      const response = await fetch("/api/generatePdf");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate PDF.");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "tasks.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      toast.error(error.message || "Failed to generate PDF.");
    }
  };

  return (
    <div className="profile-container">
      <section className="profile-card">
        <h2>Welcome, {user.name}</h2>
        <button className="btn download-pdf" onClick={handleDownload}>
          Download Task PDF
        </button>
      </section>
    </div>
  );
};

export default Profile;
