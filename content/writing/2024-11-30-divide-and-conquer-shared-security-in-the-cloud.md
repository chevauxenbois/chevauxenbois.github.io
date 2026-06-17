---
title: "Divide and Conquer: Shared Security in the Cloud"
date: "2024-11-30"
summary: "In today's digital age, cloud computing has become an indispensable tool for businesses of all sizes. The flexibility, scalability, and…"
tags: ["AI Security", "Cloud Security", "Security"]
cover: "https://cdn-images-1.medium.com/max/800/0*c0CHiZZQMC0BQwc_.jpg"
canonical: "https://medium.com/@harshkahate/divide-and-conquer-shared-security-in-the-cloud-8c85c1dffe6f"
source: "Medium"
imported_from_medium: true
---
In today's digital age, cloud computing has become an indispensable tool for businesses of all sizes. The flexibility, scalability, and cost-effectiveness of cloud services have revolutionised the way organizations operate. However, I often hear people saying that they have moved their workloads on cloud (AWS/GCP/Azure or other Cloud Service Provider—hearafter referred as CSP) and that in turn eliminates the need for securing their environment as "cloud is secure in itself".

Another misconception is that moving everything to cloud makes an organisation safer from Information Security point of view. However, there have been number of data breaches, security incidents just due to lack of awareness.

Recently I came across an article where a data breach took place due to S3 buckets that were hosting production data were open over the internet and did not require any credentials. That's where the CEO realised that being on AWS, or any other cloud for that matter does not mean that the CSP will take care of the security. It's a shared responsibility.

He also realised that security is as important as business and the organisation needs a full-time CISO which many organisations realise only after a security incident :-).

Well, that's not the topic today and let's focus on the first one—Cloud Security is a shared responsibility.

The below image (source : AWS docs) clearly shows how the responsibility is shared between the customer and AWS. This is typically applicable for any cloud platform.

## Security "OF" the Cloud—Owned by the CSP

### Physical and Environmental Security

The infrastructure that powers all of the services provided by the CSP is protected by CSP. The hardware, software, networking, and facilities that support CSP's Cloud services make up this infrastructure. That means, CSP owns the responsibility of managing the security of the data centres and essential the physical and environmental security controls. This includes all-round security and CSP needs to prevent from all sorts of risks—natural calamities (floods, earthquakes, etc.) or man-made (fire, civil unrest etc). It also involves implementation of physical and environmental security in-line with ISO 27001. Some examples are : *Equipment Siting & Protection, Supporting Utilities (A.11.2.2), Cabling Security, Equipment Maintenance (A.11.2.4), Removal of Assets (A.11.2.5), Secure Disposal or Re-Use of Equipment (A.11.2.7), etc.*

Other responsibilities of the CSP include :

- **Network Security:** CSP implements strong network security measures to protect the infrastructure, including firewalls, intrusion detection systems, and encryption.
- **Host Security:** CSP is responsible for securing the host operating system and virtualisation layer.
- **Regular Security Updates:** CSP continuously monitors and patches its infrastructure to address vulnerabilities.

## Security "IN" the Cloud—Owned by the Customer

This is the most important piece and the security of your data completely depends on how you implement the controls that fall under "Security IN the Cloud".

- **Guest Operating Systems:** Linux and Windows are examples of guest operating systems that customers are in charge of patching and protecting. Regular assessments (VA scans, Penetration Testing) need to be carried out to understand the risks associated with the OS layer and they need to be eradicated with regular patching.

*What will the CSP own? *→ It will own the security around risks associated with the underlying hardware like outdated firmware, triggering faults, etc.

*What does the customer need to do?* → Make sure that the OS is free of risks.

- **Network Configuration: **This is a crucial aspect. In order to safeguard the resources, customers must configure network settings such security groups and network access control lists (ACLs).

See this rule → Type: Inbound; Protocol: All; Port Range: All; Source: 0.0.0.0/0.

Does your CSP care about this rule? No, it does not. It's your environment and you need to make sure that your network configuration is as per security best practices. Hence, follow best practices around security groups and NACLs.

- **Firewall Configuration: **Whether you use the firewall provided by the CSP or procure your own firewall, the rules will be defined by you. Again, this falls under the customer's responsibility.
- **Applications:** Users are in charge of protecting their data and apps, which includes putting in place the proper security measures including vulnerability scanning, access controls, and encryption.

You have hosted an e-commerce platform on GCP, for example. Does this mean it's free from all sorts of risks? No! You still need to make sure that your application has proper encryption mechanisms, it does not use outdated components, does not have vulnerabilities, etc.

- **User Management: **Want to create weak password policies? Assign any role to any user? Not rotate the passwords and then complain that I though cloud was safe? This is not going to work! You have to create proper access control policies and implement them effectively.

Ex. provide RBAC. A DevOps guy does not need access to the DBs and vice-versa. You need to revoke the access of the employee who leaves the organisation or change the access level when he changes projects/teams.

## Shared Responsibilities—between the CSP and Customer

We saw the responsibilities that are clearly separated between the CSP and customer. However, there are a few shared responsibilities, let's see some examples.

- **Management of Identity and Access (IAM):**

- CSP: Offers the tools and architecture for IAM.
- Customer: In charge of setting up strong password policies, allocating permissions, and creating and maintaining user accounts.

**2. Protection of Data:**

- CSP: Offers data centre security and encryption methods.
- Customer: In charge of classifying data, encrypting it both in transit and at rest, and putting data loss prevention (DLP) procedures into place.

CSPs provide you the mechanisms to implement some of these controls, like KMS, HSM, however HOW to implement is something that you need to figure out.

**3. Incident Response & Management:**

- CSP: Could offer resources and direction for handling incidents.
- Customer: In charge of planning and carrying out incident response strategies, liaising with the CSP, and looking into and fixing security incidents.

**4. Security Assessments and Audits:**

- CSP: Conducts regular security assessments of their infrastructure.
- Customer: Should conduct regular security assessments of their applications and data.

In conclusion, the shared responsibility model is a critical aspect of cloud security. By understanding the specific roles and responsibilities of both CSPs and cloud consumers, organizations can effectively protect their cloud environments.

While CSPs provide a robust infrastructure and security measures, cloud consumers must actively participate in securing their applications and data. By implementing strong security practices, such as regular security assessments, vulnerability scanning, and incident response planning, organizations can mitigate risks and ensure the confidentiality, integrity, and availability of their cloud resources.

For any queries, suggestions or comments, do not hesitate to write to me or leave a comment!