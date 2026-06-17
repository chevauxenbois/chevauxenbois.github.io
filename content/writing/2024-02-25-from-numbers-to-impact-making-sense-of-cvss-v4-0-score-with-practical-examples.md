---
title: "From Numbers to Impact: Making Sense of CVSS V4.0 Score with Practical Examples"
date: "2024-02-25"
summary: "In today's ever-evolving cybersecurity landscape, prioritising vulnerabilities effectively is critical. The Common Vulnerability Scoring…"
tags: ["Security"]
cover: "https://cdn-images-1.medium.com/max/800/1*8t2hM4xw0PyhmoZ2-VzJKQ.png"
canonical: "https://medium.com/@harshkahate/from-numbers-to-impact-making-sense-of-cvss-v4-0-score-with-practical-examples-0a71b8356c80"
source: "Medium"
imported_from_medium: true
---
In today's ever-evolving cybersecurity landscape, prioritising vulnerabilities effectively is critical. The **Common Vulnerability Scoring System (CVSS)**, a standardised method for assessing the severity of software vulnerabilities. But with the recent release of **CVSS v4.0**, navigating the nuances of this scoring system can feel overwhelming.

Here's is a detailed explanation of the CVSS V4.0 score metrics with real-life examples in a simple language that will enable you to start understanding and using it.

## What is CVSS ?

First, let us understand what CVSS actually means. CVSS stands for "Common Vulnerability Scoring System". CVSS is managed by a US-based non-profit organisation (first.org). Ever saw something like ***CVSS:4.0/AV:N/AC:H/AT:P/PR:L/UI:P/VC:H/VI:L/VA:L/SC:N/SI:N/SA:N ***this in a report and wondered what it means? Let's see that!

When any vulnerability is reported, it categorised as either "critical", "high", "medium", "low" or "informational". This classification is not randomly done, but it is based on various factors that finally compute the CVSS score.

- Low (0–3.9)
- Medium (4–6.9)
- High (7–8.9)
- Critical (9–10)

## What are Metric Groups?

These factors that compute the final are known as **metric groups**. In CVSS V4.0, there are 4 metric groups—Base, Threat, Environmental and Supplemental. Let's understand each one of them in detail.

## Base Metrics Group

Based on a 0–10 scale, the base score is determined by the software's intrinsic vulnerabilities, which are independent of time of occurence or external variables. These metrics are further divided into two categories: **Exploitability** and **Impact**.

### **Exploitability Metrics**

The Exploitability Metrics is made up of following —

**Attack vector (AV)** : This vector describes the environment in which it is feasible to exploit vulnerabilities. The Network vector has the highest impact, followed by Adjacent, Local and Physical.

- **Network (N)—**The vulnerability can be exploited remotely from anywhere on the network, requiring no physical access to the device. This is considered the most severe level as it exposes the system to a wider range of attackers across the globe.
- **Adjacent (A)—**The vulnerability requires the attacker to be on the same local network as the vulnerable system. This can involve compromising another device on the network segment or gaining physical access to a nearby system.
- **Local (L)—**The attacker either accesses the system by using keyboard, mouse or through console (SSH). It is also possible that the attacker depends on another person to exploit this (social engineering techniques).
- **Physical (P)— **The attacker needs to physically touch or manipulate the system.

A remote code execution (RCE) vulnerability might fall under "network" vector while a vulnerability in an application limited to a company's internal network segment may fall under adjacent.

**Attack complexity (AC) **: This vector describes if the attack complexity is "high" or "low". "High" attack complexity requires notable skills and resources while it is minor for "low".

**Attack Requirements (AT) **: This attack vector is an addition to CVSS V 4.0. it has 2 vectors—None (N) and Present (P). It reflect the prerequisite conditions of the vulnerable component that make the attack possible. E.g. In an insurance application, if a particular application component is by default present, it falls under "None". If a functionality can be reached only after either exploiting a previous vulnerability or after completing a few conditions, then it falls under "Present".

**Privileges Required (PR) **: This metric indicates the level of privilege an attacker needs to exploit the vulnerability.

- **None :** No privileges required. It refers to an unauthorised attacker.
- **Low :** Requires user-level privileges.
- **High :** Requires privileged access (e.g., root or system level access).

For instance, in a HRMS (Human Resource Management System), a vulnerability can be exploited without logging in, it falls under "none". If a vulnerability like IDOR can be exploited just with basic user role, it is "Low", and if it requires a role of the HR manager or of CHRO who have more privileges, then it falls under "high".

**User Interaction (UI) **: This attack vector had two components in CVSS V 3.1—None (N) and Required (R) that has changed to None (N), Passive (P) and Active (A) in CVSS V 4.0.

- **None (N) :** Other than the attacker, no other human interaction is necessary.
- **Passive (P) :** User interaction is not required, but the vulnerability can be triggered by the user's activity (e.g., opening an email).
- **Active (A) : **User interaction is essential for exploitation (e.g., clicking a malicious link).

### Impact Metrics

The Exploitability Metrics is made up of following —

![Impact Metrics](https://cdn-images-1.medium.com/max/800/1*VBXQnzphuXUVuFs7Md_vzg.png)

Impact metrics evaluate the possible repercussions of a vulnerability being successfully exploited. The impacted system's availability, confidentiality, and integrity are the main concerns of these measurements. They are essential in figuring out a vulnerability's total severity score.

The difference vulnerable system impact metrics and subsequent system impact metrics is the system directly affected by the vulnerability and those related to it that may be affected. If this cannot be achieved, it will be sufficient to select the value None in all the metrics of the impact analysis on subsequent systems. E.g. In a banking application, if the reset password functionality is vulnerable, it falls under vulnerable system. It can further impact login functionality with misused password that falls under subsequent system.

**Confidentiality Impact (VC):** This metric measures the potential loss of confidentiality due to the vulnerability. It considers the nature and sensitivity of the data that could be exposed if the vulnerability is exploited.

- **None (N) :** No confidentiality loss.
- **Low (L) :** Limited disclosure of non-critical information.
- **High (H) :** Disclosure of critical information or complete system compromise.

**Integrity Impact (VI):** This metric measures the scope of unauthorised modification of data or system functionality. It considers the potential consequences of data alteration or manipulation.

- **None:** No integrity impact.
- **Low:** Limited modification of non-critical data.
- **High:** Loss of data integrity or complete system compromise.

**Availability Impact (VA):** This metric measures the potential disruption of access to or use of a system or resource. It considers the potential consequences of service interruptions or outages.

- **None:** No availability impact.
- **Low:** Partial loss of availability, but recovery is quick and easy.
- **High:** Significant loss of availability or complete system outage.

## Supplemental Metrics—New Metrics in CVSS V4.0

The Supplemental Metrics is made up of following —

![Supplemental Metrics](https://cdn-images-1.medium.com/max/800/1*J-AfKDN-8RjqfIASuxkt-A.png)

CVSS v4 introduces **Supplemental Metrics** to provide **additional information** about a vulnerability that **doesn't directly impact the final CVSS score**. These metrics offer valuable insights for deeper understanding and context, enabling organisations to make more informed decisions about vulnerability management.

**Key Points about Supplemental Metrics:**

- **Optional:** These metrics are **not mandatory** for scoring and can be used at the discretion of vulnerability providers and consumers.
- **Context-Specific:** The interpretation and significance of these metrics can vary depending on the **specific context** and priorities of each organisation.
- **Informative:** They provide additional details beyond the core CVSS metrics, helping organisations assess the **broader implications** of a vulnerability.

While CIA are logical impacts of a vulnerability, in sectors like healthcare, ICS, IoT there could be potential tangible impacts. This was absent in the previous version of CVSS that has now been answered in CVSS V4.0. For example, a successful exploit compromises the integrity of a vulnerable system. E.g., If the dose of a drug infusion pump is changed it affects human health and safety.

Similarly, exploitation of a vulnerability in a system in a self-driven car that may stop the working of the engine of the car affects the safety of passengers.

## **Environmental Metrics**

- This metrics considers the specific environment where the vulnerability exists and further refine the severity score.
- It is is used to contextualise the importance of the confidentiality, integrity, or availability of an asset to the organisation.
- For instance, if a vulnerability that leads to a data leak (loss of confidentiality) is likely to have a big impact the organisation, it is marked as high.
- This includes metrics like **Confidentiality Requirement (CR), Integrity Requirement (IR), Availability Requirement (AR), Security Controls (SC).**

![Environmental Metrics](https://cdn-images-1.medium.com/max/800/1*t4AmQNqNhwAPfHmqu_ndGQ.png)

## Threat Metrics—Changed from Temporal (V3.1) to Threat (V4.0)

Threat Metrics evaluate a vulnerability's present exploitability by looking at things like the existence of exploit code and proof of ongoing exploitation. These metrics supplement the underlying severity provided by the Base metrics with insightful information about the probability of a vulnerability being exploited in real life.

![Threat Metrics](https://cdn-images-1.medium.com/max/800/1*KwMWLU6kSueezuBYM6W0bg.png)

**Exploit Maturity (E)**—This is based on reliable threat intelligence sources.

- Not Defined (X) : Reliable threat intelligence is not available.
- Attacked (A) : Successful exploits of the vulnerability have been reported. Toolkits are available.
- POC (P) : POCs are publicly available; however, no reported attempts to exploit the vulnerability or solutions.
- Unprotected (U) : No knowledge of publicly available POCs, exploits or solutions.

I hope this article has helped you understand how vulnerabilities are actually computed and marked as "critical", or "low" etc.

This one has been long pending, and now with the release of CVSS V4.0, I finally wrote it.

Do like, and follow me on Medium to get more such articles. Please share this article so that it helps not only you, but also others in the cybersecurity domain.