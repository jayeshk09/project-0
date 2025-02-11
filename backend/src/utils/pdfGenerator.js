// src/utils/pdfGenerator.js
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export const generateResumePDF = async (resume) => {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);

  // Set up fonts
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Add content to the PDF
  const { width, height } = page.getSize();
  const fontSize = 12;
  const margin = 50;

  // Personal Details
  let y = height - margin;
  page.drawText("Personal Details", {
    x: margin,
    y,
    size: fontSize + 4,
    font,
    color: rgb(0, 0, 0),
  });
  y -= fontSize + 10;
  page.drawText(`Name: ${resume.personalDetails.name}`, {
    x: margin,
    y,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });
  y -= fontSize + 5;
  page.drawText(`Email: ${resume.personalDetails.email}`, {
    x: margin,
    y,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });
  y -= fontSize + 5;
  page.drawText(`Phone: ${resume.personalDetails.phone}`, {
    x: margin,
    y,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });
  y -= fontSize + 5;
  page.drawText(`Address: ${resume.personalDetails.address}`, {
    x: margin,
    y,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  // Education
  y -= fontSize + 20;
  page.drawText("Education", {
    x: margin,
    y,
    size: fontSize + 4,
    font,
    color: rgb(0, 0, 0),
  });
  y -= fontSize + 10;
  resume.education.forEach((edu) => {
    page.drawText(`${edu.institution} - ${edu.degree}`, {
      x: margin,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    y -= fontSize + 5;
    page.drawText(`${edu.startDate} to ${edu.endDate}`, {
      x: margin + 20,
      y,
      size: fontSize - 2,
      font,
      color: rgb(0, 0, 0),
    });
    y -= fontSize + 10;
  });

  // Experience
  y -= fontSize + 20;
  page.drawText("Experience", {
    x: margin,
    y,
    size: fontSize + 4,
    font,
    color: rgb(0, 0, 0),
  });
  y -= fontSize + 10;
  resume.experience.forEach((exp) => {
    page.drawText(`${exp.company} - ${exp.position}`, {
      x: margin,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    y -= fontSize + 5;
    page.drawText(`${exp.startDate} to ${exp.endDate}`, {
      x: margin + 20,
      y,
      size: fontSize - 2,
      font,
      color: rgb(0, 0, 0),
    });
    y -= fontSize + 5;
    page.drawText(exp.description, {
      x: margin + 20,
      y,
      size: fontSize - 2,
      font,
      color: rgb(0, 0, 0),
    });
    y -= fontSize + 10;
  });

  // Skills
  y -= fontSize + 20;
  page.drawText("Skills", {
    x: margin,
    y,
    size: fontSize + 4,
    font,
    color: rgb(0, 0, 0),
  });
  y -= fontSize + 10;
  page.drawText(resume.skills.join(", "), {
    x: margin,
    y,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  // Save the PDF
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes); // Ensure it's returned as a buffer
  
};