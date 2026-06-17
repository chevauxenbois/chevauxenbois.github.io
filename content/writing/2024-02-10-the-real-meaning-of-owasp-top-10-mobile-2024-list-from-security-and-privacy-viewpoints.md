---
title: "The real meaning of OWASP Top 10 Mobile 2024 list from Security and Privacy Viewpoints"
date: "2024-02-10"
summary: "Recently, the final list of top 10 mobile application vulnerabilities has been released by OWASP. The last one was released in 2016. The…"
tags: ["GRC", "Privacy", "Security"]
cover: "https://cdn-images-1.medium.com/max/800/0*rBMTjUp2irBPVE-l.jpg"
canonical: "https://medium.com/@harshkahate/the-real-meaning-of-owasp-top-10-mobile-2024-list-from-security-and-privacy-viewpoints-ff32c191b8eb"
source: "Medium"
imported_from_medium: true
---
Recently, the final list of top 10 mobile application vulnerabilities has been released by OWASP. The last one was released in 2016. The latest list has a few additions, a few vulnerabilities have been combined to form a new one and a few are the same as earlier.

However, if we compare today and 2016, there has been a lot of awareness and regulations, discussions around privacy. PII has become very important today. Almost everyone uses smartphone and if we talk about India, almost all of the day-to-day activities are performed using mobile. Hence, it becomes much more important to understand this list from a privacy point of view as well. It should not be only limited to AppSec or security in general. Having said that, of course it has been created keeping security in mind and will be used extensively for everything related to mobile application security for the next few years.

Therefore, it becomes important for anyone in the security profession to understand this list and see if any implementations can be done as part of the scope of your work.

## M1 : Improper Credential Usage

This is an addition to the OWASP Mobile 2024 list. This vulnerability mainly refers to hardcoded credentials. If the mobile application has hardcoded credentials in the source code or configuration files then this vulnerability comes into picture.

Some other scenarios and threats:

#1—Hardcoded Credentials—Attacker can get unauthorised access to the functionalities of the application that are not supposed to be accessible to him by gaining admin credentials.

#2—Insecure storage of credentials—If the credentials are stored somewhere in the mobile app in a insecure manner, this could be explited. E.g. Bob uses a mobile banking app that stores credentials in shared preferences in unencrypted form. If an attacker gets control over Bob's mobile device, these credentials can be misused.

#3—Insecure Credential Transmission—A mobile banking app uses insecure channels for credential transmission that can be exploited by an attacker by intercepting the traffic. These credentials can be further misused.

This vulnerability directly impacts confidentiality and integrity and could affect availability as well, also the exploit is easy and security impact/severity is high.

## M2 : Inadequate Supply Chain Security

This is again an addition to the OWASP Mobile 2024 list. This vulnerability focuses on the "supply chain" meaning the activities involved during the building and distribution of the mobile app.

Let us look at some scenarios:

The attacker gets unauthorised access to an application at 2 stages:

#1 Before the APK is signed—in this case, the attacker modifies the code and distributes the APK as legitimate application while it actually contains malware.

#2 After the APK is signed—if the application owner is using insecure mechanisms like WhatsApp, Google Drive to distribute the APK instead of MDM, App Store or Play Store, attacker can get unauthorised access to it and reverse engineer the APK, use credential stuffing, which might lead to further attacks.

This vulnerability has a high impact on integrity and confidentiality and could pose a threat to availability too if the supply chain is modified by the attacker.

## M3 : Insecure Authentication/Authorisation

Insecure Authentication and Insecure Authorisation were 2 different vulnerabilities under OWASP 2016 release which have been combined under M3 in OWASP 2024 release.

This is one of the most common vulnerabilities seen in mobile apps. There are multiple scenarios where this can be exploited :

#1 : Insecure Direct Object Reference (IDOR) : When the client calls the server through an authenticated API call, any dynamic parameter in the part of the request (Ref ID, Emp ID etc.) can be tweaked and data of other users can be accessed by attacker. Here the server verifies the presence of bearer token but does not map the user ID with the token which leads to this vulnerability.

#2 : Vertical or Horizontal Privilege Escalation—due to lack of role-based checks.

#3 : Biometric Authentication bypass—this is a local bypass.

#4 : Weak Password Policy

This vulnerability has a direct impact on CIA.

## M4 : Insufficient Input/Output Validation

This is again an addition to OWASP Mobile 2024 list.

The exploit of this vulnerability is generally difficult. However, it leads to severe issues like data leaks, remote code execution, compromise or takeover of system having a high impact on CIA. Different examples are as follows :

#1 : Lack of input validation leading to injection attacks, remote code execution

If the input validation or sanitisation is not in place, attacker exploits the vulnerabilities like cross-site scripting (XSS) or SQL injection leading to compromise of confidentiality and integrity.

The attacker can gain unauthorised access to the device's resources and sensitive data by crafting malicious payload leading to arbitrary code execution.

## M5 : Insecure Communication

This vulnerability was earlier known as M3 in OWASP 2016 list which is now M5. This vulnerability is mostly exploited by MITM attach and has a high impact on confidentiality. The exploit is also relatively easy as it depends on protocols like SSL/TLS.

Some possible attack examples:

#1 : Insufficient Certificate Validation Mechanisms

If the server validation between server and the mobile application fails, or if the certificate pinning mechanism can be bypassed, this exploit can occur, leading to a MITM attack, PII data leakage, credential leakage etc.

#2 : Multi-Factor authentication bypass

Attackers can bypass MFA via various mechanisms like social engineering, abusing OAuth but the main reason remains session hijacking which is due to insecure communication.

## M6: Inadequate Privacy Controls

Finally something related to privacy! Of course, this is an addition to the 2024 list. It revolves around PII. There are several critical mobile applications that are used extensively in domains like Banking, Insurance, Healthcare, Lending that revolve only on sensitive PII and financial data. Hence, this vulnerability has a large impact on confidentiality of PII which brings in multiple regulations like DPDPA, GDPR, HIPPA in place.

This can be exploited due to various reasons like:

#1 : Storing PII in logs

#2 : Storing PII in URL GET parameters

#3 : Storage of PII after application closure / logout

## M7: Insufficient Binary Protection

Client Code Quality and Code Tampering vulnerabilities from 2016 Mobile list have been merged to form M7 of 2024 list.

Binary contains all the elements an app needs to function correctly on the device. This could include API keys, hardcoded credentials or cryptographic secrets. This again has an impact on confidentiality and integrity, the attacker can misuse the secrets or even tamper with the code.

Attack scenarios for this are as follows:

#1 : Hardcoded Cryptographic secrets—credentials, API keys, sensitive IPs

#2 : Insufficient checks at the time of publishing the application

## M8: Security Misconfiguration

This has been reworded from "Extraneous Functionality" to "Security Misconfiguration" in the 2024 OWASP Mobile list.

When security settings, permissions, and controls are configured incorrectly in mobile apps, it can result in vulnerabilities and unauthorised access which is known as security misconfiguration.

This has a direct impact on the confidentiality of the user.

Some examples of possible attacks:

#1 : Non-mandatory or extra permissions

The application should restrict itself to only required permissions. Permissions like contacts, photos, microphone are not required for a calculator application. It increases the risk of data leak.

#2 : Misconfiguration of shared preferences

Any mobile application that stored unencrypted data in shared preferences or allows world-readable permission is vulnerable to this allowing other applications to read the data.

#3 : Unsecure default configurations.

A mobile application deployed with weak security configurations enabled in the default settings like utilising unsecured communication protocols, utilising release builds with debugging capabilities enabled, and using default usernames and passwords are a few examples of this. Attackers take advantage of these setup errors to obtain unauthorised access to private information.

## M9: Insecure Data Storage

This vulnerability refers to data storage without or with weak encryption, at easily accessible locations (in filesystem in database without protection or in plaintext files). This has a direct impact on confidentiality of the data and privacy.

This vulnerability has been moved from M2 to M9 in OWASP Mobile 2024 list.

Some scenarios include:

#1 : Storage of data in plaintext : user data, PII, passwords, application data

#2 : Insecure data storage in logs, cache or temporary files

## M10: Insufficient Cryptography

This vulnerability has been moved from M5 to M10 in OWASP Mobile 2024 list.

Various flaws in the mobile application like weak password management policies, weak or insecure API keys, weak key management can be exploited under this vulnerability by various mechanisms like brute force, side channel attacks.

This again revolves around data, having a high impact on confidentiality and integrity of data.

Some example attack examples are:

#1 : MITM (Man-in-the-middle) attack

#2 : Weak key management flaws

#3 : Brute-force attacks

To summarise, if you are a pen-tester, auditor, auditee, just an InfoSec person, you need to understand the OWASP top 10 lists as it has direct or indirect link with your work at some point in time.

Reference:

[https://owasp.org/www-project-mobile-top-10/](https://owasp.org/www-project-mobile-top-10/)