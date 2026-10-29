import type { Division } from "../types";

export const administration: Division = {
  slug: "virtual-assistance-and-administration",
  name: "Virtual Assistance & Administration",
  shortName: "Administration",
  icon: "briefcase",
  photo: "va-admin-laptop",
  tagline: "Organized, dependable support for the people running your business.",
  description:
    "Executive, administrative, and coordination professionals who keep calendars, inboxes, documents, and projects moving.",
  intro: [
    "Administrative work is where growing businesses quietly lose hours. Calendars collide, inboxes fill up, documents end up in five places, and the people who should be selling, advising, or leading spend their afternoons on coordination instead.",
    "Our administrative professionals take ownership of that layer. They manage schedules and correspondence, keep records accurate, prepare documents, coordinate projects, and follow up on the details that otherwise slip. Because each professional is dedicated to one client, they learn your preferences, your systems, and the way your team actually works.",
  ],
  idealFor: [
    "Founders and executives who need their time protected",
    "Property managers juggling owners, tenants, and vendors",
    "Professional firms with heavy document and scheduling loads",
    "Growing teams that need structure before they need another manager",
  ],
  deliverables: [
    "Managed calendars with confirmed meetings and prepared agendas",
    "Inbox triage with drafted replies and flagged priorities",
    "Organized shared drives with consistent naming and version control",
    "Weekly status reports and task trackers",
    "Clean CRM and contact records",
    "Research summaries and formatted documents",
  ],
  software: ["Microsoft 365", "Google Workspace", "Asana", "ClickUp", "Notion", "Trello", "Slack", "Zoom", "HubSpot", "Calendly"],
  qualificationCriteria: [
    "Completed bachelor's degree in business, office administration, communication, or a related field",
    "Strong written and spoken English suited to client-facing correspondence",
    "Demonstrated organization through a practical scheduling and prioritization exercise",
    "Accuracy in a data or document task relevant to the role",
    "Familiarity with the productivity tools your team uses",
  ],
  experience:
    "Roles are available from early career to senior executive support. Executive assistant and project coordinator placements typically call for prior professional experience.",
  faqs: [
    {
      q: "Can an administrative professional work across several of our tools?",
      a: "Yes. Most administrative professionals work across email, calendar, file storage, a task manager, and often a CRM. During onboarding you grant access through your own accounts so permissions stay under your control.",
    },
    {
      q: "Do executive assistants handle personal tasks as well as business tasks?",
      a: "That depends on the scope you define. Many executives include a limited set of personal scheduling and travel tasks. The scope is written into the service agreement so expectations are clear on both sides.",
    },
    {
      q: "How do we hand off work without micromanaging?",
      a: "Start with a short list of recurring tasks, documented once in a shared checklist. Your professional takes ownership of those first and adds new responsibilities as trust builds. Our onboarding process includes a simple handoff template for this.",
    },
  ],
  blogCategory: "virtual-staffing",
  industries: ["professional-services", "property-management", "real-estate", "law-firms", "technology-companies"],
  pricingTier: "administrative",
  seoTitle: "Dedicated Virtual Assistants & Administrative Professionals",
  seoDescription:
    "Hire a dedicated, university-educated virtual assistant or administrative professional from the Philippines through a U.S.-based staffing partner.",
  specialties: [
    {
      slug: "executive-assistant",
      title: "Executive Assistant",
      summary:
        "Protects an executive's time by running their calendar, inbox, meetings, and travel so they can focus on decisions that need them.",
      degrees: ["BS Office Administration", "BS Business Administration", "BA Communication"],
      skills: ["Executive calendar management", "Email coordination", "Document preparation", "Meeting support", "Travel planning"],
      software: ["Microsoft 365", "Google Workspace", "Asana", "ClickUp", "Notion"],
      responsibilities: [
        "Manage and defend the executive's calendar, resolving conflicts before they happen",
        "Triage the inbox, draft replies for approval, and surface what needs attention today",
        "Prepare agendas, briefing notes, and follow-up summaries for key meetings",
        "Plan business travel itineraries and keep confirmations in one place",
        "Track open commitments and remind stakeholders of deadlines",
      ],
      experience: "Typically two or more years supporting senior leaders.",
      keywords: ["ea", "calendar", "inbox", "travel", "founder support"],
    },
    {
      slug: "administrative-assistant",
      title: "Administrative Assistant",
      summary:
        "Handles the recurring administrative work that keeps an office or team running smoothly, from data entry to scheduling and recordkeeping.",
      degrees: ["BS Office Administration", "BS Business Administration"],
      skills: ["Data entry", "Scheduling", "Document management", "Recordkeeping", "Reporting"],
      software: ["Microsoft 365", "Google Workspace", "Dropbox", "Calendly"],
      responsibilities: [
        "Enter and update records accurately across business systems",
        "Schedule appointments and send confirmations and reminders",
        "Organize shared folders and maintain document templates",
        "Prepare routine reports and simple spreadsheets",
      ],
      keywords: ["admin", "office support", "data entry"],
    },
    {
      slug: "personal-executive-support-specialist",
      title: "Personal Executive Support Specialist",
      summary:
        "Provides one-to-one organizational support for a busy owner or executive, combining scheduling, correspondence, and research.",
      degrees: ["BS Business Administration", "BS Office Administration"],
      skills: ["Calendar coordination", "Professional correspondence", "Task organization", "Research"],
      software: ["Google Workspace", "Microsoft 365", "Notion", "Todoist"],
      responsibilities: [
        "Coordinate the principal's calendar across business commitments",
        "Write and send professional correspondence on their behalf, within agreed guidelines",
        "Maintain a single prioritized task list and weekly plan",
        "Research vendors, options, and background information on request",
      ],
      keywords: ["personal assistant", "owner support"],
    },
    {
      slug: "project-coordinator",
      title: "Project Coordinator",
      summary:
        "Keeps projects on schedule by tracking tasks, chasing updates, documenting decisions, and reporting status to stakeholders.",
      degrees: ["BSBA Operations Management", "BS Industrial Engineering", "BS Business Administration"],
      skills: ["Task tracking", "Status reports", "Milestone coordination", "Project documentation"],
      software: ["Asana", "ClickUp", "Monday.com", "Jira", "Smartsheet", "Microsoft Project"],
      responsibilities: [
        "Build and maintain project boards with owners and due dates",
        "Run status check-ins and publish concise weekly updates",
        "Document decisions, risks, and changes in one shared place",
        "Coordinate handoffs between internal teams and outside vendors",
      ],
      experience: "Prior coordination experience preferred for multi-team projects.",
      keywords: ["project management", "pm", "status updates"],
    },
    {
      slug: "research-assistant",
      title: "Research Assistant",
      summary:
        "Gathers, organizes, and summarizes information so decision-makers get clear answers instead of a pile of browser tabs.",
      degrees: ["BS Economics", "BS Statistics", "BS Business Administration", "BA Political Science"],
      skills: ["Information gathering", "Spreadsheet research", "Market analysis", "Written summaries"],
      software: ["Excel", "Google Sheets", "Notion", "Airtable"],
      responsibilities: [
        "Research companies, markets, vendors, and prospects against a defined brief",
        "Compile findings into structured spreadsheets with sources",
        "Write short summaries that highlight what matters for the decision",
        "Keep research libraries organized and up to date",
      ],
      keywords: ["market research", "desk research", "lists"],
    },
    {
      slug: "document-control-specialist",
      title: "Document Control Specialist",
      summary:
        "Maintains order across business documents with consistent filing, version control, and records administration.",
      degrees: ["BS Office Administration", "BS Information Systems", "BS Business Administration"],
      skills: ["Document organization", "Version control", "Records administration"],
      software: ["SharePoint", "Google Drive", "Dropbox", "Box"],
      responsibilities: [
        "Set up and enforce folder structures and naming conventions",
        "Track document versions and retire outdated copies",
        "Maintain registers of controlled documents and their owners",
        "Prepare document packages for audits, closings, or handoffs",
      ],
      keywords: ["records", "filing", "version control"],
    },
    {
      slug: "crm-administrative-specialist",
      title: "CRM Administrative Specialist",
      summary:
        "Keeps customer and pipeline records clean, complete, and useful so sales and service teams can trust their data.",
      degrees: ["BS Information Systems", "BS Business Administration", "BSBA Marketing Management"],
      skills: ["CRM maintenance", "Pipeline records", "Contact data management"],
      software: ["HubSpot", "Salesforce", "Zoho CRM", "Pipedrive"],
      responsibilities: [
        "Enter, deduplicate, and enrich contact and company records",
        "Update deal stages and activity logs based on team notes",
        "Run routine data quality checks and fix gaps",
        "Prepare simple pipeline and activity reports",
      ],
      keywords: ["crm", "hubspot", "salesforce", "data hygiene"],
    },
    {
      slug: "data-entry-and-records-specialist",
      title: "Data Entry & Records Specialist",
      summary:
        "Processes high volumes of information accurately, validating documents and keeping spreadsheets and systems current.",
      degrees: ["BS Information Systems", "BS Office Administration", "BS Business Administration"],
      skills: ["Accurate data processing", "Spreadsheet management", "Document validation"],
      software: ["Excel", "Google Sheets", "Airtable", "Industry-specific systems"],
      responsibilities: [
        "Enter data from forms, invoices, and documents into business systems",
        "Validate entries against source documents and flag discrepancies",
        "Maintain clean, consistently formatted spreadsheets",
        "Scan, index, and archive records according to your procedures",
      ],
      keywords: ["data entry", "records", "spreadsheets"],
    },
  ],
};
