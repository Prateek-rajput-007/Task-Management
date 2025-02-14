import { checkAuth, connectDB } from "../../utils/features";
import { Task } from "../../models/task";
import { asyncError, errorHandler } from "../../middlewares/error";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST")
    return errorHandler(res, 400, "Only POST Method is allowed");

  await connectDB();

  const user = await checkAuth(req);

  if (!user) return errorHandler(res, 401, "Login First");

  const { title, description, dueDate, status } = req.body;

  if (!title || !description || !dueDate || !status)
    return errorHandler(res, 400, "All fields are required");

  await Task.create({
    title,
    description,
    dueDate,
    status,
    user: user._id,
  });

  res.status(201).json({
    success: true,
    message: "Task Created Successfully",
  });
});

export default handler;
