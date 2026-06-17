---
title: "All you need to know and do for becoming SOC 2 Type II Compliant"
date: "2024-06-15"
summary: "Why do you need a SOC 2 Type II report, what does it mean and how to get it?"
tags: ["GRC", "Privacy", "Cloud Security", "Security"]
cover: "https://cdn-images-1.medium.com/max/800/1*6qbfJ5C0y2F-gm68Y0tSyg.jpeg"
canonical: "https://medium.com/@harshkahate/all-you-need-to-know-and-do-for-becoming-soc-2-type-ii-compliant-3c978f226a8f"
source: "Medium"
imported_from_medium: true
---
The image below pretty much explains why you need a SOC 2 Type II report, doesn't it :-) ?

SOC 2 Type II refers to a report on a service organisation's controls for managing customer data. It is often required by businesses that handle sensitive customer data, such as cloud service providers or software-as-a-service (SaaS) companies.

Before starting, the most important thing, SOC 2 Type II is NOT A CERTIFICATION, so you do not fail it; you might just end up having a lot of exceptions, just like the exceptions in the French grammar!

## What is the base of a SOC 2 Type II assessment?

- American Institute of Certified Public Accountants (AICPA) defines the Trust Service Criteria (TSC) for a SOC 2 Type II audit. These TSCs are similar to what we term as "clauses" in any information security audit.
- There are five TSCs—Security, Confidentiality, Availability, Privacy and Processing Integrity.

## How different is SOC 2 Type II from other audits?

In my opinion, the beauty of SOC 2 Type II lies in auditing the control effectivness over a period of time. It does not give you a blanket YES or NO compliance, nor a certificate. It is a detailed assessment and a report that focusses on the implementation of controls for security, confidentiality, availability and integrity of customer data over a period of time.

Any other audit like financial or ISO audit has a list of findings, whereas the SOC 2 Type II report has control effectiveness related details.

**Duration : **Usually, other audits like internal audit, ISO audit, financial audits are conducted annually or more frequently whereas the SOC 2 Type II assessment can be done bi-annually (more rigorous audit), annually or every 18 months.

**Outcome :** Other audits either mark you compliant and give you a certificate or you are non-compliant. E.g. you either get ISO 27001 certifcate or you don't. Whereas, you will always get a SOC 2 Type II report but it will be either qualified (some of the controls have not been implemented effectively) or unqualified (all controls have been implemented effectively).

## Five Trust Service Criteria in Detail

- **Security:** Protects information and systems from unauthorised access, disclosure, or damage.
- **Availability:** Ensures systems and data are accessible to authorised users when needed.
- **Processing Integrity:** Guarantees data accuracy, completeness, and reliability throughout processing.
- **Confidentiality:** Safeguards confidential client information from unauthorised disclosure.
- **Privacy:** Manages the collection, use, disclosure, and retention of personal data according to regulations and client expectations.

## Are all these TSCs mandatory?

- The Security criteria cannot be excluded from the assessment; and excluding Confidentiality and Availability criteria is also an uncommon situation whereas Privacy and Process Integrity criteria can be excluded under some circumstances.
- If you do not handle client data or if you are certified to an alternative privacy assurance like ISO 27018 or GDPR, you may exclude privacy TSC.
- Similarly, if your service has minimal data processing involved and doesn't significantly alter or manipulate customer data or relies on dataset provided by your customer, there might be a case for excluding Processing Integrity.

## On what basis are the criteria defined?

One of the common security criteria in the AICPA Trust Services Criteria is the widely recognised **COSO framework**.

**How Are the COSO Principles Incorporated Into the Trust Services Criteria?** There are multiple areas of alignment between the AICPA Trust Services Criteria and the COSO Principles. As an illustration, both control frameworks:

- Stress how crucial it is to have a robust control environment.
- Mandate that organisations recognise and evaluate risks.
- Mandate that companies implement control measures to reduce risks.
- Make it mandatory for organisations to tell pertinent stakeholders about internal controls.
- Mandate that companies keep an eye on how well internal controls are working.

I have tried to put the five COSO components in the following sequence of the AICPA Trust Services Criteria for SOC 2 examinations, along with the 17 COSO principles that they are linked with and a few examples that might help you as a preparation for evidence.

### Common Criteria 1 : Control Environment

The principles listed below are taken directly from [coso.org](https://coso.org).

- **COSO Principle 1:** The entity demonstrates a commitment to integrity and ethical values. *E.g. all employees going through annual IS-BC-Privacy training, sigining NDA etc.*
- **COSO Principle 2:** The board of directors demonstrates independence from management and exercises oversight of the development and performance of internal control. *E.g. Management is responsible for the assignment of responsibility and delegation of authority within the organisation.*
- **COSO Principle 3:** Management establishes, with board oversight, structures, reporting lines, and appropriate authorities and responsibilities in the pursuit of objectives. *E.g. Well-defined roles exist in the organisation. Each individual has defined goals and the same are evaluated.*
- **COSO Principle 4:** The entity demonstrates a commitment to attract, develop, and retain competent individuals in alignment with objectives. *E.g. The entity values and give feedback in terms of an individual's key strengths and areas of improvement.*
- **COSO Principle 5:** The entity holds individuals accountable for their internal control responsibilities in the pursuit of objectives. *E.g. The entity values and give feedback in terms of an individual's key strengths and areas of improvement.*

### Common Criteria 2 : Risk Assessment

- **COSO Principle 6:** The entity specifies objectives with sufficient clarity to enable the identification and assessment of risks relating to objectives. *E.g. Risk Assessment Methodology is defined and risk assessment is done regularly.*
- **COSO Principle 7:** The entity identifies risks to the achievement of its objectives across the entity and analyses risks as a basis for determining how the risks should be managed. *E.g. The CISO reviews the risk assessment and risk registers, outcomes of internal audits.*
- **COSO Principle 8:** The entity considers the potential for fraud in assessing risks to the achievement of objectives. *E.g. Incorporating Fraud within the spectrum of Risk Management.*
- **COSO Principle 9:** The entity identifies and assesses changes that could significantly impact the system of internal control. *E.g. Entity's change management process is well-defined and followed.*

### Common Criteria 3: Control Activities

- **COSO Principle 10:** The organisation chooses and creates control measures that help reduce risks and raise the attainment of goals to manageable levels. *E.g. Policies and Procedures that are defined for each activity and reviewed by the management.*
- **COSO Principle 11:** In order to support the accomplishment of goals, the entity also chooses and develops general control actions over technology. *E.g. Establish relevant security management process, acquisition, development and maintenance of process control activities.*
- **COSO Principle 12:** The organisation uses procedures to carry out rules and policies that set expectations to implement control activities. *E.g. Review of policies and procedures, using a competent personnel, corrective actions etc.*

### Common Criteria 4: Information & Communication

- **COSO Principle 13:** To support the operation of internal control, the entity gathers, produces, and applies pertinent, high-quality information. *E.g. Each major workgroup is aware of the policies pertinent to itself.*
- **COSO Principle 14:** The organisation shares information internally that is required to support the operation of internal control, such as goals and roles. *E.g.All employees are aware of the acceptable usage policy of the entity.*
- **COSO Principle 15: **The entity talks to outside parties about things that have an impact on how internal controls are operating. *E.g. Capturing internal and external sources of data, internal and external datasets.*

### Common Criteria 5: Monitoring Activities

- **COSO Principle 16:** To determine whether the elements of internal control are present and operating, the entity chooses, creates, and conducts continuous and/or independent evaluations. *E.g. create baselines, conduct regular monitoring and assessments using competent personnel. One example is user access reviews.*
- **COSO Principle 17:** The organisation assesses and promptly notifies senior management and the board of directors—or other relevant parties—of any internal control inadequacies so they can take necessary corrective action. *E.g. Corrective actions and monitoring results.*

### Complementary User Entity Controls (CUEC)

Complementary User Entity Controls (CUEC) in SOC 2 are security controls that your organisation (the customer) needs to have in place to benefit from a service provider's SOC 2 report. In simpler terms, they're the security gaps a SOC 2 report won't cover on your end.

### Complementary Subservice Organization Control (CSOC)

Certain controls that should be designed and implemented by sub-service organisations in operation at User Entities to complement the controls at the entity are listed under this. E.g. a SaaS platform provider that has hosted the application on public cloud can put the physical security control under CSOC.

## How to prepare for the SOC 2 Type II audit?

Now that we know what a SOC 2 Type II audit is based on, let us get to this question.

- Download and study the [Trust Service Criteria](https://www.aicpa-cima.com/resources/download/2017-trust-services-criteria-with-revised-points-of-focus-2022).
- Go through each sub-criteria and additional TSCs for confidentiality, availability & privacy.
- Make sure that the effectiveness of these controls is during the entire audit period. (If the audit period is 1st April 2024 to 31st March 2025), make sure that the controls are implemented at least for this one year. In other words, you should have evidence for access reviews (just an example) from April 2024 to March 2025. If you have recently implemented a few controls, then you might have exceptions in the report as effectiveness of a control cannot be determined within just a month, it's a regular process.
- Make sure you are regularly monitoring all activities, updating evidences, making sure that internal gaps are closed.

Don't want to be end up frustrated like him 2 days before the audit when customer is expecting a timely report? Make sure to maintain evidence documents regularly, set a process around it; because the auditors would like to see "sample" evidence set which is not really a sample ;)

- Once you are ready for the audit, identify an independent auditor (A CPA firm accredited by the AICPA to ensure they adhere to the established standards and best practices for SOC 2 engagements).
- Understand the format of the report. Section II contains management assertion where the CISO or CEO assures that the controls have been effectively implemented as per the TSCs.
- The Section III contains the descriptions of the controls—the services provided by an entity, its overviews, boundaries, commitments, leadership team, key components etc. It usually has a network/architecture diagram, organisation chart etc.
- Work with the auditors, explain them the services, practices followed, walk them through the activities. Submit the required evidence documents.

Now it's the time for the auditors to review and evaluate the controls and once that is done, voilà, your organisation is SOC 2 Type II compliant!!

*Do let me know your thoughts, feedbacks, questions in the comments! If you feel that this article has increased your knowledge, please subscribe/follow me on Medium!*