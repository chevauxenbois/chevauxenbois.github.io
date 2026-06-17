---
title: "Guarding Your Virtual Fortress : A step-by-step Guide to Install Wazuh on a Virtual Machine | Part…"
date: "2023-05-27"
summary: "While I was trying to explore more and more things in the defensive security, I thought of learning in detail about SIEM and Wazuh. The…"
tags: ["GRC", "Security"]
cover: "https://cdn-images-1.medium.com/max/800/1*GWfC0h16jv-ujKldTm7qDA.png"
canonical: "https://medium.com/@harshkahate/guarding-your-virtual-fortress-a-step-by-step-guide-to-install-wazuh-on-a-virtual-machine-part-a0f74f239461"
source: "Medium"
imported_from_medium: true
---
## Guarding Your Virtual Fortress : A step-by-step Guide to Install Wazuh on a Virtual Machine | Part 1

While I was trying to explore more and more things in the defensive security, I thought of learning in detail about SIEM and Wazuh. The primary reason being that it is FOSS and I have connections who actually work on it on a daily basis, so if I have questions, I also have someone to answer them.

In this learning process, I was trying to install Wazuh on a virtual machine (server). While many guides as well as the documentation of Wazuh explain how to do it, I could not find anything comprehensive and detailed for a beginner. Hence, I decided to write this step-by-step guide.

## What is SIEM ?

SIEM stands for Security Information and Event Management.

In simple terms, a SIEM system acts as a centralized hub that collects, correlates, and analyzes security-related data from various sources within an organization's IT infrastructure. These sources may include network devices, servers, endpoints, applications, and security tools such as firewalls and intrusion detection systems.

## What is Wazuh ?

Wazuh is an open-source security platform that helps organizations enhance their threat detection, incident response, and compliance management capabilities. It combines multiple essential security functions into a unified solution, making it easier to monitor and protect digital environments.

At its core, Wazuh acts as a host-based intrusion detection system (HIDS), actively monitoring servers, endpoints, and workstations for potential security incidents. It analyzes system logs, file integrity, and configuration changes, alerting administrators about suspicious activities or anomalies that may indicate a breach or compromise.

## A step-by-step guide to install Wazuh (without containers)

## **Step 1 : Install and Configure the Virtual Machine**

In the first step, we need to create a virtual machine to run Wazuh. My choice is Ubuntu Server 22.04 LTS. We also need to make sure that VirtualBox is already downloaded and installed in order to install and run the VM.

The VirtualBox can be downloaded from : [https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads)

The VM (Ubuntu Server 22.04 LTS) can be downloaded from : [https://ubuntu.com/download/server](https://ubuntu.com/download/server)

Make sure to configure the below things properly:

- The VM should be given at least 4 GB RAM, 4 processors.
- The network settings for the VM should be as follows:

The Bridged Adapter in a virtualized environment allows the VM to connect directly to a physical network, as if it were a separate physical machine.

In a virtualized environment, enabling Promiscuous Mode on a virtual network adapter allows a virtual machine to monitor and capture network traffic that is destined for other machines on the same network segment.

Once the configuration is done, start the VM. Select the first option and press Enter.

![Install and configure the VM—step 1](https://cdn-images-1.medium.com/max/800/0*EFbJkMDCpj2pqNE4)

Now, select the language that you want to use and press Enter.

![Install and configure the VM—step 2—selection of the language](https://cdn-images-1.medium.com/max/800/1*HziCU0yAZnU9KAKLsQdaZQ.png)

Now, select "Update to the new installer" with the arrow keys and press Enter.

![Install and configure the VM—step 3—update to the new installer](https://cdn-images-1.medium.com/max/800/1*nCQcRoHX3_MaZt2ppeclrQ.png)

Now, you need to select the keyboard layout.

![Install and configure the VM—step 4— select the keyboard layout](https://cdn-images-1.medium.com/max/800/1*8PQ7KQjHyYFEQaUWpIJhFQ.png)

Now, select the type of install. I suggest selecting "Ubuntu Server".

![Install and configure the VM—step 5— select the type of install](https://cdn-images-1.medium.com/max/800/1*qRwLA_q5rUcDd_KJvTJHFw.png)

In the next step, you need to choose the network connections

![Install and configure the VM—step 6— select the network connections](https://cdn-images-1.medium.com/max/800/1*qilrFTRn7n7sXjP3P_riXQ.png)

Now, you need to decide if you want to use a proxy address to connect to the internet. If not, leave the field blank and click on "Done".

![Install and configure the VM—step 7—Configure Proxy](https://cdn-images-1.medium.com/max/800/1*a8bRbfBY-kEClMUmtSRX6w.png)

Now, continue with the installation. Select the default mirror address.

![Install and configure the VM—step 8— Configure Ubuntu Archive Mirror](https://cdn-images-1.medium.com/max/800/1*ykCh3_IlrkuKDw8NHVx-vw.png)

Now you need to select the correct disk. Select "use entire disk". If you want to have encrypted disks also choose this option and type the password twice.

![Install and configure the VM—step 9— Configure Storage](https://cdn-images-1.medium.com/max/800/1*N0JjQxoVNOZa3mD4AwwmWg.png)

![Install and configure the VM—step 9— Configure Storage](https://cdn-images-1.medium.com/max/800/1*Zjbgcy9reJdRisXedtzybA.png)

Now, set up the user profile by entering the details.

![Install and configure the VM—step 10— Configure Storage](https://cdn-images-1.medium.com/max/800/1*QindpaprooZKv37vTytnWQ.png)

In the next step, i.e., Upgrade to Ubuntu Pro, select "Skip for Now".

Now, select "Install OpenSSH server" and continue.

![Install and configure the VM—step 11—Configure SSH Setup](https://cdn-images-1.medium.com/max/800/1*MLsX5sgm7xAl_KBEnyqqXw.png)

In the next step, i.e., Featured Server Snaps, do not select anything, scroll down and click on "Done".

Now, reboot the VM and login to it.

![Login to the machine](https://cdn-images-1.medium.com/max/800/1*Z2MHx8k-uBnoAiMl3w-9AA.png)

## Step 2 : Installing Wazuh

Once you are logged in to the system, visit the Wazuh documentation on : [https://documentation.wazuh.com/current/quickstart.html](https://documentation.wazuh.com/current/quickstart.html).

Copy the following command and paste it in the terminal:

curl -sO https://packages.wazuh.com/4.4/wazuh-install.sh && sudo bash ./wazuh-install.sh -a

If you don't have enough memory and processors allocated, it might throw an error. To still continue with the installation, use -i option.

Wait for the installation to get completed. Once it is done, you should be able to see the following screen.

![Wazuh successfully installed](https://cdn-images-1.medium.com/max/800/1*U8rLmCyr9CCvFDbSGlEfmw.png)

Copy the username and password and store it safely.

Once this is done, check your VM's IP address. You can use the ifconfig command for this. Refer to the highlighted "inet" address.

ifconfig

![Getting the IP of the VM using ifconfig](https://cdn-images-1.medium.com/max/800/1*ZRvD72qDFqNo9dwPwYKvxg.png)

Now, it's the time to check if Wazuh is up and running. Copy this IP adress and paste it in your browser. If you face error in this step, you need to go back and check the first step to ensure if the network settings are configured properly.

![Wazuh login page](https://cdn-images-1.medium.com/max/800/1*HZZFIDQrk_7fBdSBGpx1hA.png)

Now, login to Wazuh using the credentials you must have safely stored earlier. This is how your Wazuh dashboard should look like.

![Wazuh dashboard](https://cdn-images-1.medium.com/max/800/1*4I1imnN3zyGAN7jGYlHbOA.png)

Congratulations! You have successfully installed and set-up Wazuh on your local Virtual Machine.

In this article, we learned:

- How to install and set up the Ubuntu Server (virtual machine).
- How to install and set up Wazuh on our VM.

In the next article, we will learn how to add agents to this Wazuh set up!

References:

- [https://documentation.wazuh.com/current/installation-guide/wazuh-server/step-by-step.html](https://documentation.wazuh.com/current/installation-guide/wazuh-server/step-by-step.html)