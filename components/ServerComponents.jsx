import React from "react";
import { TodoButton } from "./Clients";

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

// Remove the TodoItem component from here
