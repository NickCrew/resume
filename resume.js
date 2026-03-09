const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle,
  LevelFormat, ExternalHyperlink, TabStopType
} = require("docx");

// --- CLI ---
const variant = process.argv[2] || "base";
const VARIANTS = ["base", "founding", "aws-security"];
if (!VARIANTS.includes(variant)) {
  console.error(`Unknown variant: ${variant}. Options: ${VARIANTS.join(", ")}`);
  process.exit(1);
}

// --- DESIGN TOKENS ---
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

// --- HELPERS ---
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
const link = (text, url) => new ExternalHyperlink({
  children: [new TextRun({ text, font: FONT, size: BODY_SIZE, color: ACCENT, underline: {} })],
  link: url
});
const smallLink = (text, url) => new ExternalHyperlink({
  children: [new TextRun({ text, font: FONT, size: SMALL_SIZE, color: ACCENT, underline: {} })],
  link: url
});
const sep = () => new TextRun({ text: " | ", font: FONT, size: SMALL_SIZE, color: LIGHT });

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

// ============================================================
// VARIANT-SPECIFIC CONTENT
// ============================================================

const profiles = {
  base: [
    t("I solve business problems with computers. Teams with deep domain expertise often need a different skillset to get from prototype to production, and I'm the person who bridges that gap. At A10, LLM researchers had built an AI Firewall for protecting AI agents from abuse and data exfiltration but needed networking, release engineering, and cross-platform deployment expertise to ship it to enterprise customers. I wrote their v1 endpoint agents for 5 operating systems and engineered the release to production, then "),
    tb("rebuilt the legacy SaaS WAF into a high-performance edge sensor"),
    t(" \u2014 integrating their detections alongside response scanning and sensitive data protection in a single binary with sub-millisecond latency. Before that, I built the developer platform that shipped $50M/year in software across 6 targets. "),
    tb("Four platforms built from scratch across three companies."),
    t(" I find the problem, ship the solution, and hand it off so others can own it."),
  ],
  founding: [
    tb("I\u2019ve been the first infrastructure hire at two companies and built everything from scratch each time."),
    t(" At Vispero, I built the developer platform that shipped $50M/year in software across 6 targets. At A10, I rebuilt a legacy SaaS product into a standalone edge sensor, wrote cross-platform endpoint agents for 5 operating systems, identified a market gap competitors missed and built the MVP, and created the sales tooling that unblocked stalled deals \u2014 "),
    tb("one engineer, full product stack, under a year."),
    t(" Before engineering, I spent 6 years in hotel operations, which gave me something most engineers don\u2019t have: an instinct for how businesses actually run. I find the problem, ship the solution, and build the team to own it."),
  ],
  "aws-security": [
    t("I build and operate AWS security infrastructure at scale. At A10 Networks, I "),
    tb("redesigned the entire AWS deployment architecture"),
    t(" \u2014 consolidating per-customer VPCs into shared infrastructure, replacing manual deployment scripts with automated pipelines, and cutting AWS spend 50% ($60K/mo). I built self-service platforms that let application teams and SOC analysts configure and deploy securely without bottlenecking on engineering. At Vispero, I designed hybrid CI/CD with an AWS control plane and on-prem ephemeral agents, built self-service pipeline tooling across 600+ pipelines with template guardrails, and "),
    tb("migrated all development services to AWS \u2014 isolating engineering from a ransomware attack"),
    t(" that incapacitated the rest of the organization. I work across security, infrastructure, and DevOps to embed security controls into pipelines that teams actually use."),
  ],
};

const skillsAlso = {
  base: "Cross-platform build systems (Windows/macOS/Linux/Android/iOS), CI/CD pipeline design, EV code signing, release engineering, LLM-augmented development workflows, technical writing, customer-facing delivery",
  founding: "Customer-facing delivery, technical writing, cross-platform build systems (Windows/macOS/Linux/Android/iOS), CI/CD pipeline design, EV code signing, release engineering, LLM-augmented development workflows",
  "aws-security": "Security group design, VPC architecture, CI/CD pipeline design, CloudFormation, cross-platform build systems, EV code signing, release engineering, technical writing, customer-facing delivery",
};

const projectsIntro = {
  base: "Open source and internal tools. Technical deep dives at ",
  founding: "Tools I built because they needed to exist. Technical deep dives at ",
  "aws-security": "Security and infrastructure tools. Technical deep dives at ",
};

// --- A10 BULLETS ---
const a10Bullets = {
  base: [
    // German govt
    bulletRich([
      tb("Delivered on a commitment to the German government and repositioned the product for A10's 7,700 existing customers. "),
      t("The legacy SaaS architecture couldn't meet GDPR-compliant on-prem deployment. Rebuilt it as a standalone edge sensor with sub-millisecond detection (4,400\u00d7 faster than the cloud model), then built a fleet management and collective defense command plane. Result: on-prem or air-gapped deployment, replacing a dozen networked services with a single binary.")
    ]),
    // AI Firewall
    bulletRich([
      tb("Bridged the AI Firewall team's gap between prototype and production. "),
      t("Their LLM researchers had built protections against AI agent abuse and data exfiltration but needed networking, release engineering, and cross-platform deployment expertise to ship. Wrote v1 endpoint agents for Windows, Linux, macOS, iOS, and Android \u2014 kernel-level drivers, EV code signing, notarization, MDM deployment \u2014 then integrated their detections into the edge sensor, consolidating everything at the edge.")
    ]),
    // Product gap
    bulletRich([
      tb("Identified a product gap competitors missed. "),
      t("Every WAF vendor detects authorization attacks, but none provide continuous visibility into which endpoints actually enforce auth. Built an authorization coverage map that auto-discovers from live traffic with zero configuration, plus a local LLM feedback loop for per-customer behavioral learning. Market gap identification \u2192 working MVP \u2192 product roadmap.")
    ]),
    // Sales
    bulletRich([
      tb("Gave sales the ability to close deals they were losing. "),
      t("Live proof-of-concept deployments couldn't guarantee attacks on-demand, stalling evaluations. Built a demo platform where sales engineers tailor attack scenarios per vertical and spin up environments with one click, plus a self-service validation platform so customers verify compliance without tying up the SOC.")
    ]),
    // One engineer
    bulletRich([
      tb("One engineer, full product stack, under a year. "),
      t("Made this possible by building AI into the development process: LLM agents in CI/CD for auto-fix and test generation, multi-agent orchestration for coverage gating, and automated analysis gates on every change.")
    ]),
  ],
  founding: [
    // German govt — same
    bulletRich([
      tb("Delivered on a commitment to the German government and repositioned the product for A10\u2019s 7,700 existing customers. "),
      t("The legacy SaaS architecture couldn\u2019t meet GDPR-compliant on-prem deployment. Rebuilt it as a standalone edge sensor with sub-millisecond detection (4,400\u00d7 faster than the cloud model), then built a fleet management and collective defense command plane. Result: on-prem or air-gapped deployment, replacing a dozen networked services with a single binary.")
    ]),
    // AI Firewall — trimmed
    bulletRich([
      tb("Bridged the AI Firewall team\u2019s gap between prototype and production. "),
      t("Their LLM researchers had built the protections but needed release engineering and cross-platform deployment expertise to ship. Wrote v1 endpoint agents for Windows, Linux, macOS, iOS, and Android, then integrated their detections into the edge sensor, consolidating everything at the edge.")
    ]),
    // Product gap — reworded lead
    bulletRich([
      tb("Identified a product gap competitors missed and built the MVP. "),
      t("No WAF vendor provided visibility into which API endpoints actually enforce auth. Built an authorization coverage map that auto-discovers from live traffic with zero configuration, plus a local LLM feedback loop for per-customer behavioral learning. Market gap identification \u2192 working MVP \u2192 product roadmap.")
    ]),
    // Sales — tighter
    bulletRich([
      tb("Gave sales the ability to close deals they were losing. "),
      t("Built a demo platform where sales engineers tailor attack scenarios per vertical and spin up environments with one click, plus a self-service validation platform so customers verify compliance without tying up the SOC.")
    ]),
    // One engineer — same
    bulletRich([
      tb("One engineer, full product stack, under a year. "),
      t("Made this possible by building AI into the development process: LLM agents in CI/CD for auto-fix and test generation, multi-agent orchestration for coverage gating, and automated analysis gates on every change.")
    ]),
  ],
  "aws-security": [
    // German govt / security compliance
    bulletRich([
      tb("Rebuilt the product's deployment architecture to meet GDPR compliance requirements for the German government. "),
      t("The legacy SaaS architecture couldn't support on-prem deployment. Redesigned as a standalone edge sensor with fleet management and centralized policy distribution. Result: deployable on-prem, air-gapped, or SaaS from the same codebase, with security controls embedded at every layer.")
    ]),
    // Self-service platforms
    bulletRich([
      tb("Built self-service security validation and demo platforms. "),
      t("Sales engineers configure attack scenarios per customer vertical and spin up isolated environments with one click. Customers verify compliance posture without tying up the SOC team. Replaced manual proof-of-concept workflows that were stalling enterprise evaluations.")
    ]),
    // Endpoint security
    bulletRich([
      tb("Shipped cross-platform endpoint agents with enterprise security controls. "),
      t("Wrote v1 for Windows, Linux, macOS, iOS, and Android \u2014 kernel-level drivers, EV code signing, notarization, MDM deployment. Managed the full release lifecycle including SmartScreen reputation and certificate compliance.")
    ]),
    // AI in pipeline
    bulletRich([
      tb("Embedded automated security analysis into the CI/CD pipeline. "),
      t("Multi-perspective review gates (security, performance, code quality) on every change. Automated test generation and coverage gating to prevent regressions from reaching production.")
    ]),
  ],
};

// --- THREATX BULLETS ---
const threatxBullets = {
  base: [
    bulletRich([
      tb("Created the professional services function from nothing. "),
      t("Recognized the company had no way to deliver custom integrations. Proposed the service model, organized delivery, and personally ran 4 enterprise engagements: Microsoft-ecosystem integrations, a VMware appliance for a customer who wouldn't run Linux containers, and pre-sales technical translation that opened new market segments.")
    ]),
    bulletRich([
      tb("Fixed customer onboarding, then built the team to run it without me. "),
      t("Identified that scattered scripts and manual steps were frustrating both engineering and the SOC. Built a unified sensor management CLI with hot-reloading plugin architecture, then mentored SOC analysts into SRE practitioners who took over the platform entirely.")
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
      t("Deployed Kafka (AWS MSK) as a buffer when the database was saturating under production traffic. Built ThreatX Labs, a serverless attack simulation platform (Lambda, Step Functions) used in the Black Hat keynote demo.")
    ]),
  ],
  founding: [
    bulletRich([
      tb("Created the professional services function from nothing. "),
      t("Recognized the company had no way to deliver custom integrations. Proposed the service model, organized delivery, and personally ran 4 enterprise engagements: Microsoft-ecosystem integrations, a VMware appliance for a customer who wouldn\u2019t run Linux containers, and pre-sales technical translation that opened new market segments.")
    ]),
    bulletRich([
      tb("Fixed customer onboarding, then built the team to run it without me. "),
      t("Built a unified sensor management CLI with hot-reloading plugin architecture, then mentored SOC analysts into SRE practitioners who took over the platform entirely.")
    ]),
    bulletRich([
      tb("Cut AWS spend ~50% (~$60K/mo). "),
      t("Consolidated per-customer VPCs into shared infrastructure, redesigned scaling from CPU-based to connection-based after identifying the fleet was scaling on the wrong metric.")
    ]),
    bulletRich([
      tb("Diagnosed a production failure that two weeks of planned optimizations couldn\u2019t fix. "),
      t("Built a load testing framework from scratch, identified kernel-level resource exhaustion at 150K RPS, built the fix. Saved a $1M contract.")
    ]),
    bulletRich([
      tb("Built the attack simulation platform featured at Black Hat. "),
      t("ThreatX Labs \u2014 a serverless attack traffic platform (Lambda, Step Functions) used in the keynote demo.")
    ]),
  ],
  "aws-security": [
    // AWS cost reduction — lead bullet
    bulletRich([
      tb("Cut AWS spend ~50% (~$60K/mo) by redesigning the VPC architecture. "),
      t("Inherited a model where every customer sensor had its own VPC with dedicated NAT gateways, EIPs, load balancers, and auto-scaling groups. Consolidated into shared Fargate infrastructure with VPC Peering and PrivateLink for tenant isolation. Replaced CPU-based scaling with connection-based policies. Eliminated orphaned EBS volumes, leaked EIPs, and recurring service quota issues.")
    ]),
    // Self-service onboarding
    bulletRich([
      tb("Built self-service sensor management platform for the 24/7 SOC team. "),
      t("Replaced scattered scripts and manual deployment steps with a unified CLI and plugin architecture. Diagnostics reduced troubleshooting from hours to minutes. Mentored SOC analysts into SRE practitioners who took over the platform entirely.")
    ]),
    // Pro services / cross-team
    bulletRich([
      tb("Created the professional services function and delivered 4 enterprise engagements. "),
      t("Microsoft-ecosystem integrations, a VMware appliance for a customer who wouldn\u2019t run Linux containers, and pre-sales technical translation bridging security requirements with product capabilities.")
    ]),
    // Linux kernel / network security
    bulletRich([
      tb("Diagnosed a network-layer production failure at 150K RPS. "),
      t("Built a distributed load testing framework, identified Linux conntrack table exhaustion at the kernel level, built dynamic conntrack sizing as a systemd service. Saved a $1M contract.")
    ]),
    // Kafka / infrastructure
    bulletRich([
      tb("Deployed Kafka (AWS MSK) to protect the production database under load. "),
      t("Event-sourcing pipeline processing millions of security events daily. Built ThreatX Labs, a serverless platform (Lambda, Step Functions) for attack simulation and customer demos.")
    ]),
  ],
};

// --- VISPERO BULLETS ---
const visperoBullets = {
  base: [
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
  ],
  founding: [
    bulletRich([
      tb("First platform developer in a newly created role. "),
      t("Built the internal developer platform from scratch: a task-based build DSL abstracting compilation across 6 targets (Windows, macOS, iOS, Android, Linux, Embedded Linux), self-bootstrapping from a clean machine. Shipped $50M/year in software on this framework. Recognized with quarterly award (1 of 450+ employees).")
    ]),
    bulletRich([
      tb("Unified 4 acquired companies into one engineering organization. "),
      t("Each acquisition brought different architectures, toolchains, and target platforms. Built the cross-platform framework that brought them together. Contributed to 3 new product lines.")
    ]),
    bulletRich([
      tb("Gave developers back a full day per week by automating release engineering. "),
      t("Replaced the release engineering team as a gatekeeper across 600+ pipelines. Gave developers sandbox environments with template guardrails and automated the release candidate process.")
    ]),
    bulletRich([
      tb("Eliminated a 3-day turnaround and a single point of failure on $2M+ in government licenses. "),
      t("Reverse-engineered license generation out of an ancient C++ application that only one person understood. Rebuilt as a database-driven platform, reducing turnaround from days to immediate.")
    ]),
    bulletRich([
      tb("Isolated engineering from a ransomware attack. "),
      t("Designed hybrid CI/CD architecture (AWS control plane, on-prem ephemeral agents). Had already migrated all dev services to AWS before ransomware incapacitated the rest of the organization.")
    ]),
  ],
  "aws-security": [
    // Hybrid CI/CD with AWS
    bulletRich([
      tb("Designed hybrid CI/CD architecture with AWS control plane and on-prem ephemeral agents. "),
      t("AWS orchestration scheduling jobs, VMware spinning up ephemeral build agents on SSD arrays, Ansible provisioning via Kerberos for credential-free WinRM auth. Every build got a clean, isolated environment. Migrated all dev services to AWS \u2014 isolating engineering from a ransomware attack that incapacitated the rest of the organization.")
    ]),
    // Self-service pipelines
    bulletRich([
      tb("Built self-service pipeline platform with template guardrails across 600+ pipelines. "),
      t("Developers got sandbox environments with policy-compliant defaults. Automated the release candidate process with built-in security checks. Cut routine engineering support requests by 50%.")
    ]),
    // First platform hire
    bulletRich([
      tb("First platform developer in a newly created role. "),
      t("Built the internal developer platform from scratch: a build DSL abstracting compilation across 6 targets (Windows, macOS, iOS, Android, Linux, Embedded Linux). Shipped $50M/year in software on this framework.")
    ]),
    // License management / compliance
    bulletRich([
      tb("Rebuilt license management for $2M+ in government contracts. "),
      t("Reverse-engineered an ancient C++ application backed by XML flat files into a database-driven platform with audit trails and compliance reporting. Reduced turnaround from 3+ days to immediate.")
    ]),
    // Post-acquisition unification
    bulletRich([
      tb("Unified 4 acquired companies into one engineering organization. "),
      t("Each acquisition brought different architectures, toolchains, and security postures. Built the cross-platform framework and standardized build and release processes across all targets.")
    ]),
  ],
};

// ============================================================
// DOCUMENT ASSEMBLY
// ============================================================

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
          smallLink("nick@atlascrew.dev", "mailto:nick@atlascrew.dev"),
        ]
      }),
      new Paragraph({
        spacing: spacer(0, 40),
        alignment: AlignmentType.CENTER,
        children: [
          smallLink("github.com/NickCrew", "https://github.com/NickCrew"),
          sep(),
          smallLink("linkedin.com/in/ncferguson", "https://linkedin.com/in/ncferguson"),
          sep(),
          smallLink("nickcrew.github.io/resume", "https://nickcrew.github.io/resume"),
        ]
      }),

      // PROFILE
      sectionHeading("Profile"),
      new Paragraph({ spacing: spacer(0, 40), children: profiles[variant] }),

      // SKILLS
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
        tb("Also: "), t(skillsAlso[variant])
      ]}),

      // PROFESSIONAL EXPERIENCE
      sectionHeading("Professional Experience"),

      ...jobHeader("A10 Networks", "(acquired ThreatX)", "Senior Platform Engineer", "Feb 2025 \u2013 Present"),
      ...a10Bullets[variant],

      ...jobHeader("ThreatX", "(acquired by A10 Networks, Feb 2025)", "Senior Platform Engineer", "Jan 2022 \u2013 Feb 2025"),
      ...threatxBullets[variant],

      ...jobHeader("Vispero", null, "Senior Platform / Build Engineer", "Oct 2018 \u2013 Dec 2021"),
      ...visperoBullets[variant],

      // PROJECTS
      sectionHeading("Projects"),
      new Paragraph({
        spacing: spacer(0, 16),
        children: [
          t(projectsIntro[variant]),
          link("nickcrew.github.io/resume", "https://nickcrew.github.io/resume"),
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

// --- OUTPUT ---
const filenames = {
  base: "NicholasFerguson_Resume",
  founding: "NicholasFerguson_Resume_Founding",
  "aws-security": "NicholasFerguson_Resume_AWS_Security",
};
const outName = filenames[variant];

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(`${outName}.docx`, buffer);
  console.log(`${variant} → ${outName}.docx`);
});
