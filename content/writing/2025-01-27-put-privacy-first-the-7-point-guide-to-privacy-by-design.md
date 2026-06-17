---
title: "Put Privacy First : The 7-Point Guide to Privacy By Design"
date: "2025-01-27"
summary: "As we celebrate the Data Privacy Day (28th January 2025), the concerns related to Data Privacy keep on increasing across the globe with…"
tags: ["AI Security", "GRC", "Privacy", "Cloud Security"]
cover: "https://cdn-images-1.medium.com/max/800/1*tAU3JvLPtW2psGbk92U22A.png"
canonical: "https://medium.com/@harshkahate/put-privacy-first-the-7-point-guide-to-privacy-by-design-46314b44a9f8"
source: "Medium"
imported_from_medium: true
---
As we celebrate the Data Privacy Day (28th January 2025), the concerns related to Data Privacy keep on increasing across the globe with emerging trends like GenAI, AI in healthcare, education, etc. The awareness for Data Privacy is also increasing, but not in the same pace as the new developments. More are more countries are trying to bring in Data Protection laws and enforce them. For instance, the government of India recently released the DPDPA (Digital Personal Data Protection Act) rules that would force all organisations to implement privacy programs. What this means is that Data Privacy is going to be one of the most important topics in the tech sector going forward and businesses will have to follow the Data Privacy regulations if they want to survive in the market. Otherwise, as many people say while referring to wrongdoings on X/Twitter, *dhanda band hoga *(this Hindi phrase menas your business will shut down).

This is also the time when everybody irrespective of their knowledge or awareness keeps saying : "AI is the future" while there are very few who focus on data privacy aspects of AI. If there is no data, there would be no AI is another term that many people quote. There have been different approaches proposed like using synthetic data, transfer learning, rule-based AI etc. but the truth is that data will remain crucial. While there are promising developments, it's unlikely that AI will completely break free from its dependence on data in the near future. This means that with or without AI, before or after AI, data privacy is crucial and it will be the most important consideration as new trends in tech emerge along with increased knowledge about data privacy among people and legal aspects.

This brings us to **"Privacy by Design".**

As per GDPR, The term "Privacy by Design" (hereafter referred as PbD) means nothing more than "data protection through technology design." There are 7 principles of Privacy by Design, let us see each one with a real-world example.

To begin with, imagine that you are building a new product (a lending platform, an ed-tech platform, an AI model or literally any technology enabled product).

### PbD Principle 1—**PROACTIVE** not REACTIVE, ***PREVENTIVE*** not ***REMEDIAL***

Proactive rather than reactive measures are what define the Privacy by Design approach. It foresees and stops Privacy Incidents/Invasions before they occur. PbD works to avoid privacy violations rather than waiting for them to happen or providing solutions for them after they have already happened. A few ways to ensure this are :

- Have a clear commitment at highest levels to ensure high standards of privacy. This should come from the senior management as a requirement for any new design.
- Conduct DPIAs (Data Protection Impact Assessments) at every major change in the product lifecycle and before role out. Address the risks/poor privacy practices identified in DPIA.
- Foster a culture of privacy commitment that is demonstrably shared throughout by user communities and stakeholders, in a motivation of continuous improvement.

An example of this implementation could be having an in-house Privacy team and involving them the with product/design/development teams since day 1 of product development to ensure that their inputs are considered. A privacy team should not be hired or given a say only *after* a data breach, but from the day zero.

### PbD Principle 2—Privacy as the ***DEFAULT***

One thing is guaranteed for all of us : the default rules! By making sure that personal information is automatically safeguarded in any given IT system or business procedure, PbD aims to provide the highest level of privacy possible. An individual's privacy is unaffected if they take no action. The individual does not need to take any action to safeguard their privacy; instead, it is built into the system by default.

This in-turn refers to the core principles such as Purpose Specification, Collection Limitation, Data Minimization, Use, Retention and Disclosure Limitation, etc.

Let's see this with an example.

![Image A—Privacy by Design compliant product](https://cdn-images-1.medium.com/max/800/1*TqaHQeNKx3xH1LRrQLElfg.png)

As seen in the above image, this platform collects only the data that is necessary to complete the user registration. It also respects the Purpose Specification, Use, Retention and Disclosure Limitation principles by showing the text in the box. It follows the Privacy by ***Default ***principle.

![Image B—Privacy by Design non-compliant product](https://cdn-images-1.medium.com/max/800/1*IZfhV5K844rhekc6pYmgcQ.png)

As seen in the above image, this platform collects the data that is necessary to complete the user registration plus additional details that are not required for the purpose here that is User Registration. Maybe some product manager or developer might have thought—let's collect and keep this data in case we need it in the future or for some analysis ;-).

Jokes aside, it does not even state the purpose or provide privacy notice related information. Hence, this makes it non-compliant to PbD.

Ensure to consider privacy as the *default *setting in your product.

### PbD Principle 3— Privacy EMBEDDED into design

The architecture and design of IT systems as well as corporate procedures incorporate privacy by design. It is not added after the fact as an add-on. As a result, privacy becomes a crucial part of the basic services that are provided. Without compromising system functionality, privacy is essential.

A few ways to implement it :

- End-to-end encryption : encrypt sensitive/PII data at all levels (at rest, in transit and even the payload of the request) as per standard encryption practices.
- Do not keep any PII in logs.
- Give users granular control over their privacy settings.
- Notify users of any changes to your privacy practices.
- Conduct DPIA/internal audits at every major change in the product and fix all issues before roll-out.

### PbD Principle 4—FULL functionality—Positive-Sum not Zero-Sum

By implementing Privacy by Design early in the project's development lifecycle, your team should be able to steer clear of needless compromises with other systems and procedures. In a positive-sum setting, it functions as a benefit and en tandem with the systems it is integrated with, and it ought to provide complete functioning for both.

In essence, a Positive-Sum approach aims to create a system where privacy and functionality work together to create a better user experience.

Let's see the **Zero-Sum Approach **with an example of Smart Home Security System.

**Focus:** Prioritizing extreme security measures might lead to a complex and user-unfriendly system. For example, requiring constant manual input for every action (like unlocking a door) could be inconvenient and frustrating.

Let's see the **Positive-Sum Approach **with an example of **a Facial Recognition with Privacy.**

**Focus :** Integrating privacy and security seamlessly.

**Functionality:** Implement facial recognition for convenient access.

**Privacy considerations :**

- **On-device processing:** Facial recognition happens locally on the device, not in the cloud, minimizing data collection.
- **Data encryption:** Facial data is stored securely and encrypted, even on the device.
- **User control:** Users have full control over which faces are recognized and can easily delete stored data.

### PbD Principle 5— End-to-End Security—Lifecycle Protection

This is a crucial principle that emphasizes the importance of safeguarding personal data throughout its entire lifecycle. This means that security measures are not just implemented during data collection and use, but also during storage, retention, and eventual deletion.

Not to repeat the same points, but this can be done by :

- Ensuring purpose limitation, recording of consent.
- Robust access control practices.
- Storage security (encryption, protection against accidental deletion, monitoring, backup, location).
- Enabling the SOC (Security Operations Center) to monitor and act on the entire landscape of the organization.
- Secure deletion.
- Use best practices as per NIST, ISO 27001/27701 wherever possible.

### PbD Principle 6— Visibility and Transparency

Visibility and Transparency emphasize the importance of openness and accountability throughout the entire lifecycle of data processing.

- **Visibility/Openness :** Organizations should be open about their data collection and processing practices. This includes providing clear and accessible information about what data is collected, how it is used, and who it is shared with.
- **Accountability :** Organizations should be accountable for their data processing activities. This means having mechanisms in place to track data flows, monitor compliance, and address any privacy concerns.
- **User Access :** Users should have easy access to their personal data and be able to understand how it is being used. They should also be able to correct or delete their data if necessary.
- **Clarity :** Information about data practices should be presented in a way that is easy to understand, avoiding technical jargon and complex legal language. Local language should be used to show such notices (as per DPDPA).

How to implement this principle :

- **Clear and concise privacy policies :** Using plain language and avoiding legalese.
- **Layered privacy notices :** Providing short summaries alongside more detailed policies.
- **Data flow diagrams :** Visualizing how data moves within a system.
- **Just-in-time notifications :** Informing users when specific data is being collected or used.
- **Open source code :** Allowing for public scrutiny of data processing operations.
- **Regular audits and reports :** Demonstrating compliance with privacy principles, including DPIA.

### PbD Principle 7—Respect for User Privacy

Above all, Privacy by Design mandates that operators and architects prioritize the needs of the individual by providing features like proper notification, robust privacy defaults, and empowering user-friendly options. Keep the user in mind!

By adhering to the principle of "Respect for User Privacy," organizations can build trust with their users and demonstrate their commitment to protecting privacy. This can lead to increased user satisfaction, brand loyalty, and a positive reputation.

Respecting user privacy is not just about complying with regulations, but about creating a culture where user privacy is valued and prioritized.

Keep the following things in mind : Consent, Accuracy, Access & Compliance!

To conclude, ultimately, the 7 Principles of Privacy by Design are about putting the individuals first. By prioritizing user privacy, we build trust, foster innovation, and create a more secure and equitable digital world. So, if you don't want your dhanda/business to get closed because of con-compliance with data privacy regulations, make sure to implement privacy by design.

Happy data privacy week!

For any queries, suggestions or comments, do not hesitate to write to me or leave a comment!