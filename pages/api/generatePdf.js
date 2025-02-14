import { checkAuth, connectDB } from "../../utils/features";
import { Task } from "../../models/task";
import { asyncError, errorHandler } from "../../middlewares/error";
import PDFDocument from "pdfkit";

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET")
    return errorHandler(res, 400, "Only GET Method is allowed");

  await connectDB();
  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 401, "Login First");

  const tasks = await Task.find({ user: user._id, includeInPdf: true });

  if (tasks.length === 0) {
    return errorHandler(res, 400, "Please include tasks to generate the PDF.");
  }

  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=tasks.pdf");

  doc.pipe(res);

  doc.fontSize(20).text("Task List", { align: "center" });
  doc.moveDown();

  tasks.forEach((task) => {
    doc.fontSize(14).text(`Title: ${task.title}`);
    doc.fontSize(12).text(`Description: ${task.description}`);
    doc.fontSize(12).text(`Due Date: ${task.dueDate}`);
    doc.fontSize(12).text(`Status: ${task.status}`);
    doc.moveDown();
  });

  doc.end();
});

export default handler;
