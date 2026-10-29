import type { FaqItem } from "./types";

export interface FaqCategory {
  slug: string;
  name: string;
  items: FaqItem[];
}

/**
 * Answers describe the intended service model. Where a process is still being
 * established, the wording says so or points to the service agreement.
 * Review with counsel before launch (see docs/LAUNCH-CHECKLIST.md).
 */
export const faqCategories: FaqCategory[] = [
  {
    slug: "getting-started",
    name: "Getting Started",
    items: [
      {
        q: "What does Lantern Global do?",
        a: "We are a U.S.-based staffing and outsourcing company. We help U.S. businesses find, evaluate, and work with dedicated, university-educated professionals based in the Philippines, and we provide the administrative and operational support around that working relationship according to the agreed service scope.",
      },
      {
        q: "How do I get started?",
        a: "Submit an inquiry through the Hire a Professional form or request a consultation. We will discuss your responsibilities, required skills, working hours, and budget, then outline how we would approach your search.",
      },
      {
        q: "Can I hire just one professional?",
        a: "Yes. Many clients start with a single dedicated professional and add roles later as their needs become clearer.",
      },
      {
        q: "How long does it take to find a professional?",
        a: "Timelines depend on the role, required experience, and how quickly interviews can be scheduled. We will give you a realistic estimate for your specific role during the consultation rather than a generic promise.",
      },
    ],
  },
  {
    slug: "qualifications",
    name: "Professional Qualifications",
    items: [
      {
        q: "What qualifications do your professionals have?",
        a: "Every professional we hire or place must hold a completed bachelor's degree or higher from a recognized institution. Beyond the degree, candidates are evaluated on role-specific skills, communication, and relevant experience.",
      },
      {
        q: "Are all professionals required to hold a bachelor's degree?",
        a: "Yes. A completed bachelor's degree is our minimum academic requirement for professional placements, without exception.",
      },
      {
        q: "Does a degree guarantee someone can do the job?",
        a: "No, and we do not suggest that it does. The degree is our starting standard. Practical skills assessments, interviews, and your own evaluation of finalists determine fit for the role.",
      },
      {
        q: "Are degrees verified?",
        a: "Credential verification is part of our recruitment standard. We will confirm the specific verification steps that apply to your placement before you make a hiring decision.",
      },
    ],
  },
  {
    slug: "dedicated-staffing",
    name: "Dedicated Staffing",
    items: [
      {
        q: "What does dedicated mean?",
        a: "A dedicated professional supports your business under the agreed arrangement rather than being routinely shared across unrelated client accounts. They learn your systems, preferences, and team.",
      },
      {
        q: "Who manages the professional day to day?",
        a: "Your team directs the daily work and priorities. Lantern Global handles the agreed administrative and operational support around the relationship. The exact division of responsibilities is set out in your service agreement.",
      },
      {
        q: "Can I interview candidates?",
        a: "Yes. You participate in selection and can interview finalists before confirming a placement.",
      },
      {
        q: "What happens if a placement is not working out?",
        a: "Tell us early. We will work with you to address the issue, and where appropriate, help source a replacement. Replacement terms are defined in your service agreement.",
      },
      {
        q: "Can I grow from one professional to a team?",
        a: "Yes. You can add professionals in the same or different specialties as your needs grow.",
      },
    ],
  },
  {
    slug: "pricing-contracts",
    name: "Pricing & Contracts",
    items: [
      {
        q: "How much does a dedicated professional cost?",
        a: "Pricing depends on the specialty, required experience, schedule, and scope of support. We provide a written quote after understanding your requirements. We do not publish fixed prices because roles vary widely.",
      },
      {
        q: "Who do I sign a contract with?",
        a: "Clients contract with Lantern Global, a U.S. company, which gives you a clear U.S. commercial point of contact.",
      },
      {
        q: "Are there setup fees or minimum terms?",
        a: "Any fees and terms will be stated clearly in your written quote and service agreement before you commit.",
      },
    ],
  },
  {
    slug: "working-hours",
    name: "Working Hours",
    items: [
      {
        q: "Can my professional work U.S. business hours?",
        a: "Yes. Schedules can be aligned with U.S. time zones. Because the Philippines is 12 to 13 hours ahead of U.S. Eastern Time depending on daylight saving, U.S. business hours fall during the Philippine night, so schedules, breaks, and any night-work requirements are handled according to applicable Philippine labor rules and set out in the agreement.",
      },
      {
        q: "Can I get partial overlap instead of full U.S. hours?",
        a: "Yes. Some clients prefer a few hours of overlap for meetings and handoffs, with the rest of the day focused on independent work. We will help you choose a schedule that suits the role.",
      },
      {
        q: "How are Philippine and U.S. holidays handled?",
        a: "Holiday schedules are agreed in advance and written into the service agreement so there are no surprises.",
      },
    ],
  },
  {
    slug: "security",
    name: "Security & Confidentiality",
    items: [
      {
        q: "How is confidential information protected?",
        a: "Professionals sign confidentiality agreements, and we recommend that they work only inside your systems using individual accounts and role-based access that you control. Our security and confidentiality page explains the safeguards we use and the ones we are formalizing.",
      },
      {
        q: "Do you hold SOC 2, ISO 27001, or HIPAA certification?",
        a: "No. We do not claim those certifications. Where your industry has specific requirements, such as a Business Associate Agreement for healthcare, we discuss them with you before any work begins.",
      },
      {
        q: "What happens to access when an assignment ends?",
        a: "Access should be removed on the last day of the assignment. Because accounts are created in your systems, your administrators can revoke access immediately, and our offboarding checklist covers the steps on our side.",
      },
    ],
  },
  {
    slug: "recruitment",
    name: "Recruitment & Screening",
    items: [
      {
        q: "How are candidates evaluated?",
        a: "Our recruitment framework covers educational qualifications, professional experience, technical skills, communication, role-specific assessments, and appropriate verification and screening. You then interview finalists.",
      },
      {
        q: "Do you run background checks?",
        a: "Background screening is part of our recruitment standard where lawful and relevant to the role. We will confirm what screening applies to your placement during the process.",
      },
      {
        q: "Where do candidates come from?",
        a: "We recruit university-educated professionals in the Philippines through professional networks, job platforms, referrals, and our careers portal.",
      },
    ],
  },
  {
    slug: "careers",
    name: "Careers",
    items: [
      {
        q: "What are the requirements to apply?",
        a: "A completed bachelor's degree or higher is required for professional positions, along with the skills and experience listed for each role.",
      },
      {
        q: "Where can I see open positions?",
        a: "Open roles are listed on our Open Positions page. If no roles are listed, you can still check back regularly as new client requirements come in.",
      },
      {
        q: "Will you ask for my government ID during the application?",
        a: "No. The online application only asks for professional information and your resume. Any additional verification happens later in the process through a secure channel.",
      },
    ],
  },
  {
    slug: "technical",
    name: "Technical Services",
    items: [
      {
        q: "Who owns the code or creative work my professional produces?",
        a: "Intellectual property terms are set in the service agreement. The usual approach assigns work product created for you to your company. Have your counsel review the final terms.",
      },
      {
        q: "Can technical professionals use our tools and repositories?",
        a: "Yes. They work in your repositories, ticketing, and design tools under accounts you control, following your development and security practices.",
      },
    ],
  },
  {
    slug: "industry",
    name: "Industry-Specific Questions",
    items: [
      {
        q: "Can your professionals provide legal, accounting, or medical services?",
        a: "No. They provide administrative, preparatory, and technical support. Work that requires a U.S. professional license, such as legal advice, attest work, clinical care, or stamping engineering plans, stays with your licensed professionals, who supervise and review the support work.",
      },
      {
        q: "Do you sign Business Associate Agreements for healthcare clients?",
        a: "Where a service involves protected health information, a Business Associate Agreement and appropriate safeguards are required before access is granted. Contact us to discuss your requirements.",
      },
    ],
  },
];

export const allFaqs = faqCategories.flatMap((c) => c.items.map((i) => ({ ...i, category: c.slug })));

/** Short list shown on the homepage. */
export const homeFaqs: FaqItem[] = [
  faqCategories[1].items[0],
  faqCategories[1].items[1],
  faqCategories[0].items[2],
  faqCategories[4].items[0],
  faqCategories[6].items[0],
  faqCategories[2].items[2],
  faqCategories[2].items[1],
  faqCategories[5].items[0],
  faqCategories[2].items[4],
  faqCategories[2].items[3],
  {
    q: "What does onboarding look like?",
    a: "After you select a professional and sign the agreement, we coordinate a kickoff: account access through your systems, a documented list of first responsibilities, communication norms, and an early check-in schedule so issues surface quickly.",
  },
  faqCategories[3].items[0],
];
