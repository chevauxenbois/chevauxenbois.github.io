---
title: "A Deep Dive into Zero Trust Architecture"
date: "2023-11-05"
summary: "Any organisation or business becomes successful only if it is trusted by its customers and investors. When it comes to organisations…"
tags: ["Cloud Security", "Security"]
cover: "https://cdn-images-1.medium.com/max/800/0*g79Ceyf_vsv74TCK"
canonical: "https://medium.com/@harshkahate/a-deep-dive-into-zero-trust-architecture-8029d56ded9e"
source: "Medium"
imported_from_medium: true
---
Any organisation or business becomes successful only if it is trusted by its customers and investors. When it comes to organisations working in the domain of Information Technology, Banking and Finance, Insurance or anything that directly deals with the sensitive data of customers, **TRUST** is the most important factor. You are out of the race the day when customers don't trust you. The level of trust on an organisation has a direct relation with its secureness. Be it security of customer's data, applications or in-house infrastructure, you are trusted if you are secure, along with the other obvious factors like cost, goodwill and quality of service.

Here is where the concept of "Zero Trust" comes into the picture. The essence of the Zero Trust Architecture (hereafter referred as ZTA) is ***never trust, always verify.***

## The picture before Zero Trust Architecture

In the traditional systems, there are 2 zones—Trusted Zone and Untrusted Zone.

The trusted zone or network is completely under control of the organisation. It typically contains the applications, servers, computers and databases sitting inside a trusted network that is protected from the outside world using devices like Firewall. These devices are within the same local area network and are controlled using things like user authentication and group policies. Here, even the physical access to the devices, servers can be controlled by defining the human beings having access to it and enabling them with access cards, passwords, physical verification etc.

All the elements in the outside world are under the untrusted network. The trusted network is typically segmented from the untrusted network using demilitarised zone (DMZ).

## Need to Zero Trust

With the recent trends in information technology, most of the organisations dealing with the critical domains; as mentioned in the beginning are using web applications or services hosted on a cloud infrastructure. These applications are designed in such a way that they accessed from anywhere in the world. With the modern working culture, remote working has become popular. Users can be anywhere in the world and can still continue their work. They can even use their own devices to carry out the day to day activities. Now, these public networks or personal devices could be dangerous as they can contain malware or pose other security challenges like malwares, worms or Trojan horses. Because of this, the traditional approach of trusted and untrusted zones doesn't seem to work. Then, what is the solution?

Well, the solution is "Zero Trust". It is not a standalone package that can be bought and implemented. Every organisation defines its own ZTA and creates policies around it. This is not a simple process. In the next few minutes, we will try to understand how the ZTA really works.

## Concept #1—Never trust, always verify.

This principle of ZTA says : do not trust anyone. It doesn't matter if you are a CEO of a company sitting inside the office, a developer sitting at home or a database admin roaming in the mountains, everyone is treated the same way. Until and unless you do not verify yourself, you are an "untrusted entity". There are multiple ways to verify yourself that could be username and password along with multi-factor authentication based on a time-based OTP or authentication token or a key.

However, it does not mean that once you have verified yourself, the system will perpetually trust you. The whole essence of zero trust is "always verify". Hence, every time the same process will be followed and you will be asked to verify yourself. We looked at the "authentication" concept here.

## Concept #2—Access based on privilege

This principle states that any user should be given only the privileges that are required to perform the task. Ex. A person from client A's development team should not have access to client B's development related artefacts. Similarly, a database administrator should not have access to infrastructure related controls and vice-versa.

This can typically be controlled using a PIM-PAM (Privilege Identity Management and Privilege Access Management) solution that can be accessed through a VPN. This is the second level of control where the user, once authenticated, authorises himself to access the resources he has access to.

## Concept #3—Always monitor

Now you might say that we have perimeter security in place, we have properly implemented our ZTA, every user is properly authenticated and authorised, then why should we care about breaches? NO! It is important to keep in mind that any security breach can happen anytime.

What should we do then? When a thief entres a house, he does not satisfy himself with stealing the money from one room, he empties the house and then goes away. Similarly, a hacker will try and gain access to all systems. To avoid this, it is important that critical systems and segregated from each other. Network segmentation can be done to acheive this. One can also implement all security controls in one area, generate logs from it in another and separate the applications and servers in a third controlled one. With this, the entry point does not allow the hacker to access everything.

It is also important to keep a track of every activity performed. The tools used to authenticate and authorise legitimate users have the power to record the tasks performed by them while tools like SIEM, network firewall, XDRs, NIPS track the activities of an outsider.

In essence, whatever is critical for an organisation should be put behind the above mentioned controls and only legitimate users should be able to access it for a single session after authenticating and authorising themselves. The typical controls to ensure this are VPNs, Active Directory or SSO, PIM-PAM solution, Perimeter devices, DLP solution etc.

Whatever is non-critical to an organisation can be put under "no control".

Even if the ZTA sounds conceptually easy, it is difficult to maintain. Each organisation needs to define its policies, toolsets and implementation strategies around ZTA. A well defined and tested ZTA can protect the organisation; however, any wrongly implemented ZTA can prove to be dangerous.

That was all about "Zero Trust" which works well only in computer systems, and not among humans :-)

*Do let me know your thoughts/suggestions/feedback in the comments section and also the topics that you would like to read about in the next article.*