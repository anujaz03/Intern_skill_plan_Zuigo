import * as XLSX from "xlsx";

/**
 * Dynamically generates a valid Excel (.xlsx) template file
 * containing the required columns and sample customer rows,
 * and triggers a browser file download.
 */
export const downloadSampleTemplate = () => {
  const sampleData = [
    {
      "Customer Name": "Rohan Deshmukh",
      "Email": "rohan@deshmukh.co",
      "Phone": "9876543210",
      "Company": "Deshmukh Consulting",
      "Status": "VIP",
      "Lead Source": "Website Referral",
    },
    {
      "Customer Name": "Ananya Iyer",
      "Email": "ananya.iyer@gmail.com",
      "Phone": "8765432109",
      "Company": "Iyer Tech Solutions",
      "Status": "Lead",
      "Lead Source": "Cold Outreach",
    },
    {
      "Customer Name": "Vikram Chauhan",
      "Email": "vikram@chauhanholdings.in",
      "Phone": "7654321098",
      "Company": "Chauhan Holdings",
      "Status": "Partner",
      "Lead Source": "LinkedIn",
    },
  ];

  // Convert JSON sample data to SheetJS worksheet
  const worksheet = XLSX.utils.json_to_sheet(sampleData);
  
  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Onboarding Template");

  // Write and trigger download in the browser
  XLSX.writeFile(workbook, "LeadFlow_Sample_Template.xlsx");
};
