import type { Division } from "../types";

export const salesMarketing: Division = {
  slug: "sales-and-marketing",
  name: "Sales, Marketing & Business Development",
  shortName: "Sales & Marketing",
  icon: "megaphone",
  photo: "sales-marketing-whiteboard",
  tagline: "Pipeline, campaigns, and reporting handled by people who understand the numbers.",
  description:
    "Sales development, digital marketing, SEO, paid media, and marketing operations professionals who grow and organize demand.",
  intro: [
    "Most small and midsize companies do not lack ideas for growth. They lack the hours to run outreach consistently, keep campaigns optimized, and turn activity into reporting someone can act on.",
    "Our sales and marketing professionals bring structure to that work. Sales development representatives research and qualify prospects, digital specialists manage campaigns day to day, and operations specialists keep the CRM and dashboards accurate. You keep strategy and final approvals; your professional keeps execution moving every day.",
  ],
  idealFor: [
    "B2B companies building an outbound or inbound pipeline",
    "Service businesses running local paid search or social campaigns",
    "Marketing teams that need execution capacity without another agency retainer",
    "Founders who need consistent follow-up on leads",
  ],
  deliverables: [
    "Researched, verified prospect lists",
    "Booked appointments and qualified handoffs to your closers",
    "Managed ad campaigns with weekly performance notes",
    "SEO audits, keyword plans, and on-page updates",
    "Email sequences and newsletters ready for approval",
    "Pipeline dashboards and campaign reports",
  ],
  software: ["Salesforce", "HubSpot", "Google Analytics", "Google Ads", "Meta Ads Manager", "SEMrush", "Ahrefs", "Mailchimp", "Klaviyo", "Apollo", "LinkedIn Sales Navigator"],
  qualificationCriteria: [
    "Completed bachelor's degree in marketing, business, communication, or a related field",
    "Strong written English for outreach and campaign copy, plus spoken English for calling roles",
    "Hands-on familiarity with the platforms the role requires",
    "Practical exercise such as a prospect list, ad account review, or keyword plan",
    "Comfort with metrics and simple reporting",
  ],
  experience:
    "Entry-level SDR and lead generation roles are available, while campaign specialists and marketing automation roles typically call for prior hands-on platform experience.",
  boundary: {
    title: "Compliance in outreach",
    body: "Outbound calling, texting, and email are regulated in the United States (for example, by the TCPA and CAN-SPAM). Your company remains responsible for consent, opt-out handling, and the lists it approves. Your professional follows the procedures you set.",
  },
  faqs: [
    {
      q: "Can a sales development representative call U.S. prospects during U.S. business hours?",
      a: "Yes, schedules can be aligned to U.S. business hours as part of the service agreement. Calling and texting programs must follow U.S. consent and do-not-call rules, which your company sets and approves.",
    },
    {
      q: "Will a marketing specialist replace our agency?",
      a: "Some clients use a dedicated specialist instead of an agency, and others use one alongside an agency to handle day-to-day execution. The right model depends on how much strategy you want to keep in-house.",
    },
    {
      q: "Who owns the ad accounts and data?",
      a: "You do. Your professional works inside accounts owned by your company with permissions you control, so nothing is lost if roles change.",
    },
  ],
  blogCategory: "sales-and-marketing",
  industries: ["technology-companies", "marketing-agencies", "real-estate", "ecommerce-and-retail", "professional-services"],
  pricingTier: "specialized",
  seoTitle: "Remote Sales Development & Digital Marketing Professionals",
  seoDescription:
    "Dedicated SDRs, SEO specialists, paid media managers, and marketing operations professionals from the Philippines, managed through a U.S. partner.",
  specialties: [
    {
      slug: "sales-development-representative",
      title: "Sales Development Representative",
      summary:
        "Researches, contacts, and qualifies prospects, then books meetings so your closers spend their time in real conversations.",
      degrees: ["BSBA Marketing Management", "BS Entrepreneurship", "BS Business Administration"],
      skills: ["Lead qualification", "Prospecting", "Outbound communications", "CRM management", "Appointment setting"],
      software: ["HubSpot", "Salesforce", "Apollo", "LinkedIn Sales Navigator", "Outreach"],
      responsibilities: [
        "Research target accounts and identify the right contacts",
        "Run approved email, phone, and LinkedIn outreach sequences",
        "Qualify interest against your criteria and book meetings",
        "Log every activity in the CRM and hand off with context",
      ],
      keywords: ["sdr", "outbound", "cold calling", "appointments", "lead gen"],
    },
    {
      slug: "business-development-representative",
      title: "Business Development Representative",
      summary:
        "Finds and opens new opportunities, including partnerships and new market segments, and builds early pipeline.",
      degrees: ["BS Business Administration", "BS Entrepreneurship", "BSBA Marketing Management"],
      skills: ["Prospect research", "Outreach", "Pipeline development", "Partnership research"],
      software: ["HubSpot", "Salesforce", "LinkedIn Sales Navigator", "Notion"],
      responsibilities: [
        "Map potential partners, channels, and market segments",
        "Run first-touch outreach and follow-up",
        "Maintain early-stage pipeline with clear next steps",
        "Summarize findings for leadership",
      ],
      keywords: ["bdr", "partnerships", "pipeline"],
    },
    {
      slug: "digital-marketing-specialist",
      title: "Digital Marketing Specialist",
      summary:
        "Runs day-to-day digital campaigns across channels and turns results into clear, practical recommendations.",
      degrees: ["BSBA Marketing Management", "BA Communication", "Bachelor of Multimedia Arts"],
      skills: ["Campaign management", "Digital advertising", "Analytics"],
      software: ["Google Analytics", "Google Ads", "Meta Ads Manager", "HubSpot", "Canva"],
      responsibilities: [
        "Launch and manage campaigns from approved plans",
        "Monitor performance and adjust targeting and creative",
        "Coordinate assets with designers and writers",
        "Report results weekly with clear next steps",
      ],
      keywords: ["marketing", "campaigns", "ads", "analytics"],
    },
    {
      slug: "seo-specialist",
      title: "SEO Specialist",
      summary:
        "Improves how your website is found in search through keyword research, technical fixes, on-page optimization, and content planning.",
      degrees: ["BSBA Marketing Management", "BS Information Technology", "BA Communication"],
      skills: ["Keyword research", "Technical SEO", "On-page optimization", "Content planning"],
      software: ["Google Search Console", "Google Analytics", "SEMrush", "Ahrefs", "Screaming Frog"],
      responsibilities: [
        "Audit sites for technical and on-page issues and prioritize fixes",
        "Research keywords by intent and map them to pages",
        "Write briefs and optimize existing content",
        "Track rankings and organic traffic against goals",
      ],
      keywords: ["seo", "search", "organic", "keywords"],
    },
    {
      slug: "google-ads-specialist",
      title: "Google Ads Specialist",
      summary:
        "Builds and manages paid search campaigns with careful conversion tracking, keyword strategy, and budget discipline.",
      degrees: ["BSBA Marketing Management", "BS Business Administration"],
      skills: ["Paid search campaigns", "Conversion tracking", "Keyword strategy", "Reporting"],
      software: ["Google Ads", "Google Tag Manager", "Google Analytics", "Looker Studio"],
      responsibilities: [
        "Structure campaigns, ad groups, and keywords around business goals",
        "Verify conversion tracking before scaling spend",
        "Manage bids, negatives, and ad copy tests",
        "Report cost per lead and recommendations each week",
      ],
      keywords: ["ppc", "paid search", "sem", "google ads"],
    },
    {
      slug: "meta-ads-specialist",
      title: "Meta Ads Specialist",
      summary:
        "Plans and optimizes Facebook and Instagram advertising, from audience strategy to creative testing and analysis.",
      degrees: ["BSBA Marketing Management", "BA Communication"],
      skills: ["Facebook and Instagram advertising", "Campaign analysis", "Audience strategy"],
      software: ["Meta Ads Manager", "Meta Business Suite", "Canva", "Google Analytics"],
      responsibilities: [
        "Build audiences and campaign structures for each objective",
        "Test creative and copy variations methodically",
        "Monitor frequency, cost, and conversion quality",
        "Summarize learnings and next tests for your team",
      ],
      keywords: ["facebook ads", "instagram ads", "paid social"],
    },
    {
      slug: "email-marketing-specialist",
      title: "Email Marketing Specialist",
      summary:
        "Builds segmented email programs and automations that nurture leads and customers without spamming them.",
      degrees: ["BSBA Marketing Management", "BA Communication", "BS Business Administration"],
      skills: ["Email automation", "Segmentation", "CRM campaigns", "Performance reporting"],
      software: ["Mailchimp", "Klaviyo", "HubSpot", "ActiveCampaign"],
      responsibilities: [
        "Build newsletters and automated sequences from approved copy",
        "Maintain segments and suppression lists",
        "Test subject lines, timing, and content",
        "Report opens, clicks, and conversions with recommendations",
      ],
      keywords: ["email", "newsletter", "klaviyo", "automation"],
    },
    {
      slug: "social-media-manager",
      title: "Social Media Manager",
      summary:
        "Plans, schedules, and reports on social content so your brand shows up consistently on the channels that matter.",
      degrees: ["BSBA Marketing Management", "BA Communication", "Bachelor of Multimedia Arts"],
      skills: ["Content calendars", "Social scheduling", "Analytics", "Community coordination"],
      software: ["Meta Business Suite", "Hootsuite", "Buffer", "Canva", "LinkedIn"],
      responsibilities: [
        "Build monthly content calendars aligned to campaigns",
        "Schedule posts and coordinate creative assets",
        "Monitor comments and route questions to the right people",
        "Report engagement trends monthly",
      ],
      keywords: ["social media", "content calendar", "community"],
    },
    {
      slug: "marketing-automation-specialist",
      title: "Marketing Automation Specialist",
      summary:
        "Designs and maintains the workflows that score, route, and nurture leads inside your marketing platform.",
      degrees: ["BSBA Marketing Management", "BS Information Systems", "BS Information Technology"],
      skills: ["HubSpot workflows", "Email automation", "Lead nurturing"],
      software: ["HubSpot", "Marketo", "ActiveCampaign", "Zapier"],
      responsibilities: [
        "Build lead scoring, routing, and nurture workflows",
        "Keep forms, lists, and properties organized",
        "Connect marketing tools with integrations",
        "Document every automation so it can be maintained",
      ],
      experience: "Prior hands-on experience with a marketing automation platform is expected.",
      keywords: ["hubspot", "workflows", "automation", "lead scoring"],
    },
    {
      slug: "market-research-analyst",
      title: "Market Research Analyst",
      summary:
        "Studies competitors, customers, and markets and delivers findings in a form your team can actually use.",
      degrees: ["BS Economics", "BS Statistics", "BSBA Marketing Management", "BS Business Administration"],
      skills: ["Competitor research", "Customer analysis", "Market reports"],
      software: ["Excel", "Google Sheets", "SurveyMonkey", "SEMrush"],
      responsibilities: [
        "Profile competitors' offers, pricing, and positioning",
        "Analyze customer feedback and survey data",
        "Size segments using available public data",
        "Deliver concise reports with sources",
      ],
      keywords: ["research", "competitors", "surveys"],
    },
    {
      slug: "sales-operations-specialist",
      title: "Sales Operations Specialist",
      summary:
        "Administers the CRM and builds the reporting that sales leaders rely on to forecast and coach.",
      degrees: ["BS Business Administration", "BS Information Systems"],
      skills: ["CRM administration", "Pipeline reporting", "Sales dashboards"],
      software: ["Salesforce", "HubSpot", "Excel", "Looker Studio"],
      responsibilities: [
        "Maintain pipeline stages, fields, and user permissions",
        "Build dashboards for pipeline, activity, and conversion",
        "Audit data quality and fix process gaps",
        "Support quota and territory reporting",
      ],
      keywords: ["sales ops", "revops", "crm admin", "dashboards"],
    },
    {
      slug: "lead-generation-specialist",
      title: "Lead Generation Specialist",
      summary:
        "Builds accurate, targeted lead lists and keeps outbound campaigns supplied with quality contacts.",
      degrees: ["BSBA Marketing Management", "BS Entrepreneurship", "BS Business Administration"],
      skills: ["Prospect research", "Lead-list quality", "Outbound campaign operations"],
      software: ["Apollo", "LinkedIn Sales Navigator", "ZoomInfo", "Clay", "Google Sheets"],
      responsibilities: [
        "Research contacts that match your ideal customer profile",
        "Verify emails and remove duplicates before upload",
        "Load lists into outreach tools with correct fields",
        "Track list performance and refine targeting",
      ],
      keywords: ["lead lists", "prospecting", "data"],
    },
  ],
};
