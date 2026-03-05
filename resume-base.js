const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, WidthType,
  ShadingType, HeadingLevel, LevelFormat, PageBreak, ExternalHyperlink, TabStopType, TabStopPosition
} = require("docx");

const DARK = "1A1A1A";
const MED = "444444";
const LIGHT = "666666";
const ACCENT = "2563EB";
const HEADING_BLUE = "1e3a5f";
const RULE = "CCCCCC";
const FONT = "Arial";
const NAME_SIZE = 28;
const SECTION_SIZE = 22;
const BODY_SIZE = 19;
const SMALL_SIZE = 17;

const spacer = (before = 0, after = 0) => ({ before, after });
const spaceOut = (text) => text.toUpperCase().split('').join(' ');
const sectionHeading = (text) => new Paragraph({
  spacing: spacer(200, 60),
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: RULE, space: 4 } },
  children: [new TextRun({ text: spaceOut(text), font: FONT, size: SECTION_SIZE, bold: true, color: HEADING_BLUE })]
});
const bulletRich = (runs) => new Paragraph({
  numbering: { reference: "bullets", level: 0 },
  spacing: spacer(30, 60),
  children: runs
});
const t = (text, opts = {}) => new TextRun({ text, font: FONT, size: BODY_SIZE, color: MED, ...opts });
const tb = (text, opts = {}) => t(text, { bold: true, color: DARK, ...opts });

const jobHeader = (company, subtitle, title, dates) => {
  const parts = [new TextRun({ text: company, font: FONT, size: BODY_SIZE + 1, bold: true, color: DARK })];
  if (subtitle) {
    parts.push(new TextRun({ text: " " + subtitle, font: FONT, size: BODY_SIZE, italics: true, color: LIGHT }));
  }
  return [
    new Paragraph({ spacing: spacer(140, 2), children: parts }),
    new Paragraph({
      spacing: spacer(0, 40),
      tabStops: [{ type: TabStopType.RIGHT, position: 10440 }],
      children: [
        new TextRun({ text: title, font: FONT, size: BODY_SIZE, color: MED }),
        new TextRun({ text: "\t", font: FONT }),
        new TextRun({ text: dates, font: FONT, size: SMALL_SIZE, color: LIGHT }),
      ]
    })
  ];
};

const doc = new Document({
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 360, hanging: 200 } } }
      }]
    }]
  },
  styles: {
    default: { document: { run: { font: FONT, size: BODY_SIZE } } }
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 720, right: 900, bottom: 720, left: 900 }
      }
    },
    children: [

      // HEADER
      new Paragraph({
        spacing: spacer(0, 8),
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "N I C H O L A S   F E R G U S O N", font: FONT, size: NAME_SIZE, bold: true, color: DARK })]
      }),
      new Paragraph({
        spacing: spacer(0, 4),
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: "Tampa Bay Area, FL (Remote) | 727.266.8813 | ", font: FONT, size: SMALL_SIZE, color: LIGHT }),
          new ExternalHyperlink({ children: [new TextRun({ text: "nick@atlascrew.dev", font: FONT, size: SMALL_SIZE, color: ACCENT, underline: {} })], link: "mailto:nick@atlascrew.dev" }),
        ]
      }),
      new Paragraph({
        spacing: spacer(0, 40),
        alignment: AlignmentType.CENTER,
        children: [
          new ExternalHyperlink({ children: [new TextRun({ text: "github.com/NickCrew", font: FONT, size: SMALL_SIZE, color: ACCENT, underline: {} })], link: "https://github.com/NickCrew" }),
          new TextRun({ text: " | ", font: FONT, size: SMALL_SIZE, color: LIGHT }),
          new ExternalHyperlink({ children: [new TextRun({ text: "linkedin.com/in/ncferguson", font: FONT, size: SMALL_SIZE, color: ACCENT, underline: {} })], link: "https://linkedin.com/in/ncferguson" }),
          new TextRun({ text: " | ", font: FONT, size: SMALL_SIZE, color: LIGHT }),
          new ExternalHyperlink({ children: [new TextRun({ text: "nickcrew.github.io/resume", font: FONT, size: SMALL_SIZE, color: ACCENT, underline: {} })], link: "https://nickcrew.github.io/resume" }),
        ]
      }),

      // PROFILE
      sectionHeading("Profile"),
      new Paragraph({
        spacing: spacer(0, 40),
        children: [
          t("I solve business problems with computers. Teams with deep domain expertise often need a different skillset to get from prototype to production, and I'm the person who bridges that gap. At A10, LLM researchers had built an AI Firewall for protecting AI agents from abuse and data exfiltration but needed networking, release engineering, and cross-platform deployment expertise to ship it to enterprise customers. I wrote their v1 endpoint agents for 5 operating systems and engineered the release to production, then "),
          tb("rebuilt the legacy SaaS WAF into a high-performance edge sensor"),
          t(" \u2014 integrating their detections alongside response scanning and sensitive data protection in a single binary with sub-millisecond latency. Before that, I built the developer platform that shipped $50M/year in software across 6 targets. "),
          tb("Four platforms built from scratch across three companies."),
          t(" I find the problem, ship the solution, and hand it off so others can own it."),
        ]
      }),

      // SKILLS - compact
      sectionHeading("Skills"),
      new Paragraph({ spacing: spacer(0, 16), children: [
        tb("Languages: "), t("Python, C#/.NET, TypeScript, Rust, C++, SQL, Bash, PowerShell")
      ]}),
      new Paragraph({ spacing: spacer(0, 16), children: [
        tb("Infrastructure: "), t("AWS, Linux, Kubernetes, Docker, Terraform, Ansible, VMware")
      ]}),
      new Paragraph({ spacing: spacer(0, 16), children: [
        tb("Data: "), t("PostgreSQL, SQL Server, MongoDB, ClickHouse, Kafka, Redis")
      ]}),
      new Paragraph({ spacing: spacer(0, 16), children: [
        tb("Also: "), t("Cross-platform build systems (Windows/macOS/Linux/Android/iOS), CI/CD pipeline design, EV code signing, release engineering, LLM-augmented development workflows, technical writing, customer-facing delivery")
      ]}),

      // PROFESSIONAL EXPERIENCE
      sectionHeading("Professional Experience"),

      ...jobHeader("A10 Networks", "(acquired ThreatX)", "Senior Platform Engineer", "Feb 2025 \u2013 Present"),

      bulletRich([
        tb("Delivered on a commitment to the German government and repositioned the product for A10's 7,700 existing customers. "),
        t("A10 had promised GDPR-compliant on-prem deployment by end of year, and the legacy SaaS architecture couldn't do it. Rebuilt the product as a standalone edge sensor: moved the entire decision engine to the edge for sub-millisecond detection (4,400\u00d7 faster than the cloud-based model), then built a fleet management and collective defense command plane that works self-hosted or as a SaaS upsell. Result: a behavioral WAF with zero-day protection that runs on-prem or air-gapped, replacing a dozen networked services with a single binary and command plane.")
      ]),

      bulletRich([
        tb("Bridged the AI Firewall team's gap between prototype and production. "),
        t("Their LLM researchers had built protections against AI agent abuse and data exfiltration but needed networking, release engineering, and cross-platform deployment expertise to ship to enterprise customers. Wrote v1 endpoint agents for Windows, Linux, macOS, iOS, and Android with kernel-level drivers, handling EV code signing, MSI packaging, macOS notarization, SmartScreen reputation, and MDM deployment. Then integrated their detections into the edge sensor alongside response scanning and sensitive data protection, consolidating everything at the edge.")
      ]),

      bulletRich([
        tb("Identified a product gap competitors missed. "),
        t("Every WAF vendor detects authorization attacks, but none provide continuous visibility into which API endpoints actually enforce auth. Built an authorization coverage map that auto-discovers endpoint auth posture from live traffic with zero configuration, then designed a local LLM feedback loop that learns per-customer behavioral patterns and blocks based on anomalies. Went from market gap identification to working MVP to product roadmap.")
      ]),

      bulletRich([
        tb("Gave sales the ability to close deals they were losing. "),
        t("Live proof-of-concept deployments couldn't guarantee attacks would occur on-demand, stalling customer evaluations. Built a demo platform where sales engineers tailor attack scenarios per customer vertical and spin up configured environments with one click. Separately built a self-service validation platform so customers could verify compliance without tying up the SOC team.")
      ]),

      bulletRich([
        tb("One engineer, full product stack, under a year. "),
        t("Made this possible by building AI into the development process: LLM agents in CI/CD that auto-fix linter and compiler errors, a multi-agent orchestration loop for automated test review gating on behavioral coverage gaps, and multi-perspective analysis gates (security, performance, code quality) on every change.")
      ]),

      ...jobHeader("ThreatX", "(acquired by A10 Networks, Feb 2025)", "Senior Platform Engineer", "Jan 2022 \u2013 Feb 2025"),

      bulletRich([
        tb("Created the professional services function from nothing. "),
        t("Recognized the company had no way to deliver custom integrations. Proposed the service model, organized delivery, and personally ran 4 enterprise engagements: Microsoft-ecosystem integrations, a VMware appliance for a customer who wouldn't run Linux containers, and pre-sales technical translation that opened new market segments.")
      ]),

      bulletRich([
        tb("Fixed customer onboarding, then built the team to run it without me. "),
        t("Identified that scattered scripts and manual steps were frustrating both engineering and the SOC. Built a unified sensor management CLI with hot-reloading plugin architecture, then mentored SOC analysts into SRE practitioners who took over the platform entirely. Created a permanent bridge team between engineering and operations.")
      ]),

      bulletRich([
        tb("Diagnosed a production failure that two weeks of planned optimizations couldn't fix. "),
        t("Built a distributed load testing framework from scratch, identified Linux conntrack table exhaustion at the kernel level at 150K RPS, built dynamic conntrack sizing. Saved a $1M contract.")
      ]),

      bulletRich([
        tb("Cut AWS spend ~50% (~$60K/mo). "),
        t("Consolidated per-customer VPCs into shared infrastructure, redesigned scaling from CPU-based to connection-based after identifying the fleet was scaling on the wrong metric.")
      ]),

      bulletRich([
        tb("Stabilized production database under load and built the attack simulation platform featured at Black Hat. "),
        t("Deployed Kafka (AWS MSK) as a protective buffer when the database was saturating under production traffic. Built ThreatX Labs, a serverless attack traffic platform (Lambda, Step Functions) used in the Black Hat keynote demo. Created the docs-as-code platform that scaled documentation from a single-author bottleneck to org-wide contribution.")
      ]),

      ...jobHeader("Vispero", null, "Senior Platform / Build Engineer", "Oct 2018 \u2013 Dec 2021"),

      bulletRich([
        tb("First platform developer in a newly created role. "),
        t("Built the internal developer platform from scratch: a task-based build DSL abstracting compilation across 6 targets (Windows, macOS, iOS, Android, Linux, Embedded Linux), self-bootstrapping from a clean machine. Shipped $50M/year in software on this framework. Recognized with quarterly award (1 of 450+ employees).")
      ]),

      bulletRich([
        tb("Unified 4 acquired companies into one engineering organization. "),
        t("Each acquisition brought different architectures, toolchains, and target platforms. This is what drove building the cross-platform framework. Contributed to 3 new product lines.")
      ]),

      bulletRich([
        tb("Gave developers back a full day per week by automating release engineering. "),
        t("Replaced the release engineering team as a gatekeeper across 600+ pipelines. Gave developers sandbox environments with template guardrails, automated the release candidate process, and built diagnostic tools including a static analyzer with 100% accuracy on compiler error diagnosis.")
      ]),

      bulletRich([
        tb("Eliminated a 3-day turnaround and a single point of failure on $2M+ in government licenses. "),
        t("Reverse-engineered license generation logic out of an ancient C++ application backed by XML flat files that only one person understood. Rebuilt as a database-driven platform, reducing license turnaround from days to immediate.")
      ]),

      bulletRich([
        tb("Isolated engineering from a ransomware attack. "),
        t("Designed hybrid CI/CD architecture (AWS control plane, on-prem ephemeral VMware agents). Had already migrated all dev services to AWS before ransomware incapacitated the rest of the organization.")
      ]),

      // PROJECTS
      sectionHeading("Projects"),
      new Paragraph({
        spacing: spacer(0, 16),
        children: [
          t("Open source and internal tools. Technical deep dives at "),
          new ExternalHyperlink({ children: [new TextRun({ text: "nickcrew.github.io/resume", font: FONT, size: BODY_SIZE, color: ACCENT, underline: {} })], link: "https://nickcrew.github.io/resume" }),
        ]
      }),
      bulletRich([
        tb("Apparatus"), t(" \u2014 AI-augmented security validation platform. Automates red/blue team exercises with scenario-driven traffic generation, LLM-powered honeypots, and chaos engineering.")
      ]),
      bulletRich([
        tb("Crucible"), t(" \u2014 Attack simulation engine. 119 scenarios covering OWASP Top 10, APT kill chains, HIPAA/PCI compliance. Used to regression-test the Synapse edge sensor.")
      ]),
      bulletRich([
        tb("Chimera"), t(" \u2014 Vulnerable application platform. 22 verticals, 450 endpoints, 13 industry-specific web apps with an OWASP LLM teaching environment.")
      ]),

      // EDUCATION
      sectionHeading("Education"),
      new Paragraph({
        spacing: spacer(0, 0),
        children: [
          tb("St. Petersburg College"), t(", Clearwater, FL \u2014 AAS, Computer Information Systems")
        ]
      }),
    ].filter(Boolean)
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("NicholasFerguson_Resume.docx", buffer);
  console.log("Done");
});
