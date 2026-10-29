/**
 * Integration tests for the form endpoints. Run against a production server:
 *
 *   BASE_URL=http://localhost:3000 node --test tests/
 *
 * When the server was started WITHOUT delivery credentials, valid submissions
 * must be refused with 503 (never a fake success). When FORMS_TEST_MODE=delivered
 * is set, the server is expected to have been started with RESEND_API_BASE
 * pointing at a mock that accepts mail, and valid submissions must return 200.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const MODE = process.env.FORMS_TEST_MODE || "unconfigured";
let ipCounter = Math.floor(Math.random() * 200);
const ip = () => `10.0.${Math.floor(Math.random() * 250)}.${(ipCounter = (ipCounter + 1) % 250)}`;

const validInquiry = {
  fullName: "Test Person",
  email: "test@example.com",
  company: "Example Co",
  website: "example.com",
  phone: "",
  industry: "Property Management",
  division: "Business Operations",
  specialty: "Operations Coordinator",
  headcount: "1",
  experience: "Mid-level (2 to 5 years)",
  software: "AppFolio",
  responsibilities: "Coordinate work orders, dispatch vendors, and keep tenants updated.",
  roles: "",
  arrangement: "Full-time",
  timezone: "Eastern",
  hours: "",
  startDate: "",
  budget: "",
  details: "",
  contactMethod: "Email",
  consent: true,
  intent: "",
  company_url: "",
  elapsed: 30000,
};

const post = (path, body, headers = {}) =>
  fetch(`${BASE}${path}`, { method: "POST", headers: { "Content-Type": "application/json", "x-forwarded-for": ip(), ...headers }, body: JSON.stringify(body) });

test("inquiry: missing required fields returns 422 with field errors", async () => {
  const res = await post("/api/inquiry", { ...validInquiry, email: "not-an-email", responsibilities: "" });
  assert.equal(res.status, 422);
  const data = await res.json();
  assert.equal(data.ok, false);
  assert.ok(data.errors.email);
  assert.ok(data.errors.responsibilities);
});

test("inquiry: consent is required", async () => {
  const res = await post("/api/inquiry", { ...validInquiry, consent: false });
  assert.equal(res.status, 422);
  assert.ok((await res.json()).errors.consent);
});

test("inquiry: honeypot submissions are rejected", async () => {
  const res = await post("/api/inquiry", { ...validInquiry, company_url: "http://spam.example" });
  assert.equal(res.status, 422);
});

test("inquiry: instant submissions are rejected", async () => {
  const res = await post("/api/inquiry", { ...validInquiry, elapsed: 200 });
  assert.equal(res.status, 422);
});

test("inquiry: oversize body is rejected", async () => {
  const res = await post("/api/inquiry", { ...validInquiry, details: "x".repeat(40000) });
  assert.equal(res.status, 413);
});

test(`inquiry: valid submission (${MODE})`, async () => {
  const res = await post("/api/inquiry", validInquiry);
  const data = await res.json();
  if (MODE === "delivered") {
    assert.equal(res.status, 200);
    assert.equal(data.ok, true);
  } else {
    assert.equal(res.status, 503);
    assert.equal(data.ok, false);
    assert.equal(data.code, "not_configured");
  }
});

test("inquiry: rate limit returns 429 after repeated submissions", async () => {
  const fixed = { "x-forwarded-for": "10.99.99.99" };
  let last;
  for (let i = 0; i < 6; i++) last = await post("/api/inquiry", { ...validInquiry, email: "bad" }, fixed);
  assert.equal(last.status, 429);
});

test("contact: invalid message returns 422", async () => {
  const res = await post("/api/contact", { fullName: "A", email: "a@example.com", topic: "Other", message: "", consent: true, elapsed: 9000 });
  assert.equal(res.status, 422);
});

test("apply: missing resume and degree confirmation returns 422", async () => {
  const fd = new FormData();
  for (const [k, v] of Object.entries({
    fullName: "Applicant",
    email: "applicant@example.com",
    phone: "+63 912 345 6789",
    location: "Quezon City",
    degree: "BS Accountancy",
    university: "Example University",
    graduationYear: "2020",
    degreeCompleted: "false",
    experience: "Three years of bookkeeping for small businesses.",
    skills: "QuickBooks",
    portfolio: "",
    role: "Bookkeeping Specialist",
    consent: "true",
    elapsed: "20000",
  }))
    fd.append(k, v);
  const res = await fetch(`${BASE}/api/apply`, { method: "POST", body: fd, headers: { "x-forwarded-for": ip() } });
  assert.equal(res.status, 422);
  const data = await res.json();
  assert.ok(data.errors.resume);
  assert.ok(data.errors.degreeCompleted);
});

test("apply: a renamed non-document file is rejected", async () => {
  const fd = new FormData();
  for (const [k, v] of Object.entries({
    fullName: "Applicant",
    email: "applicant@example.com",
    phone: "+63 912 345 6789",
    location: "Cebu City",
    degree: "BS Computer Science",
    university: "Example University",
    graduationYear: "2021",
    degreeCompleted: "true",
    experience: "Two years building React applications for clients.",
    skills: "React",
    portfolio: "",
    role: "Frontend Developer",
    consent: "true",
    elapsed: "20000",
  }))
    fd.append(k, v);
  fd.append("resume", new Blob(["MZ fake executable"], { type: "application/pdf" }), "resume.pdf");
  const res = await fetch(`${BASE}/api/apply`, { method: "POST", body: fd, headers: { "x-forwarded-for": ip() } });
  assert.equal(res.status, 422);
  assert.match((await res.json()).errors.resume, /PDF, DOC, or DOCX/);
});

test(`apply: valid PDF application (${MODE})`, async () => {
  const fd = new FormData();
  for (const [k, v] of Object.entries({
    fullName: "Applicant",
    email: "applicant@example.com",
    phone: "+63 912 345 6789",
    location: "Davao City",
    degree: "BS Accountancy",
    university: "Example University",
    graduationYear: "2019",
    degreeCompleted: "true",
    experience: "Four years of bookkeeping and accounts payable experience.",
    skills: "QuickBooks Online, Xero",
    portfolio: "",
    role: "Bookkeeping Specialist",
    consent: "true",
    elapsed: "20000",
  }))
    fd.append(k, v);
  fd.append("resume", new Blob(["%PDF-1.4\n% test resume\n"], { type: "application/pdf" }), "resume.pdf");
  const res = await fetch(`${BASE}/api/apply`, { method: "POST", body: fd, headers: { "x-forwarded-for": ip() } });
  const data = await res.json();
  if (MODE === "delivered") assert.equal(res.status, 200);
  else {
    assert.equal(res.status, 503);
    assert.equal(data.code, "not_configured");
  }
});
