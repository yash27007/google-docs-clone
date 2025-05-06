export const templates = [
  {
    id: "blank",
    label: "Blank Document",
    imgUrl: "/templates/blank-document.svg",
    initialContent: "",
  },
  {
    id: "business",
    label: "Business Letter",
    imgUrl: "/templates/business-letter.svg",
    initialContent: `
      <p>Company Name<br>Address Line 1<br>Address Line 2<br>Date</p>
      <p>Recipient Name<br>Recipient Title<br>Recipient Company<br>Recipient Address</p>
      <p>Dear [Recipient Name],</p>
      <p>I am writing to...</p>
      <p>Sincerely,<br>Your Name<br>Your Position</p>
    `,
  },
  {
    id: "project",
    label: "Project Proposal",
    imgUrl: "/templates/project-proposal.svg",
    initialContent: `
      <h1>Project Proposal</h1>
      <h2>Project Title</h2>
      <p>Submitted by: [Your Name]</p>
      <h3>1. Objective</h3>
      <p>Describe the goal of the project.</p>
      <h3>2. Scope</h3>
      <p>Define what is included and excluded.</p>
      <h3>3. Timeline</h3>
      <p>Provide a high-level timeline for the project.</p>
    `,
  },
  {
    id: "software",
    label: "Software Proposal",
    imgUrl: "/templates/software-proposal.svg",
    initialContent: `
      <h1>Software Proposal</h1>
      <h2>Overview</h2>
      <p>This document outlines the proposed software solution for...</p>
      <h3>Features</h3>
      <ul><li>Feature 1</li><li>Feature 2</li></ul>
      <h3>Technology Stack</h3>
      <p>We propose using the following technologies: ...</p>
    `,
  },
  {
    id: "resume",
    label: "Resume",
    imgUrl: "/templates/resume.svg",
    initialContent: `
      <h1>Your Name</h1>
      <p>Email | Phone | LinkedIn</p>
      <h2>Summary</h2>
      <p>A short professional summary.</p>
      <h2>Experience</h2>
      <p><strong>Job Title</strong> - Company Name<br>Date Range</p>
      <ul><li>Responsibility or achievement</li></ul>
      <h2>Education</h2>
      <p>Degree - Institution - Year</p>
    `,
  },
  {
    id: "cover",
    label: "Cover Letter",
    imgUrl: "/templates/cover-letter.svg",
    initialContent: `
      <p>Dear [Hiring Manager's Name],</p>
      <p>I am excited to apply for the [Position] role at [Company Name].</p>
      <p>[Mention skills and experience relevant to the job]</p>
      <p>Thank you for your time and consideration.<br>Sincerely,<br>Your Name</p>
    `,
  },
  {
    id: "letter",
    label: "Letter",
    imgUrl: "/templates/letter.svg",
    initialContent: `
      <p>Sender Address<br>Date</p>
      <p>Recipient Address</p>
      <p>Dear [Name],</p>
      <p>This letter is to inform you that...</p>
      <p>Best regards,<br>Your Name</p>
    `,
  },
];
