---
title: "Vulnhub MoneyBox Walkthrough"
date: "2022-09-25"
summary: "What are VulnHub and MoneyBox?"
tags: ["Security"]
cover: "https://cdn-images-1.medium.com/max/800/1*EKKVtHDWsa4aRCT2psH-Zw.png"
canonical: "https://medium.com/@harshkahate/vulnhub-moneybox-walkthrough-c6193d623afd"
source: "Medium"
imported_from_medium: true
---
## What are VulnHub and MoneyBox?

If individuals wish to learn and practice hacking techniques securely and legally, they can visit [VulnHub](https://www.vulnhub.com/). In this article, we're going to learn to hack a virtual machine called [MoneyBox](https://www.vulnhub.com/entry/moneybox-1,653/).

**Some prerequisites :**

- A host machine (Ubuntu, Kali Linux, CentOS), I am using Kali Linux.
- For the target machine—MoneyBox—you need to download **MoneyBox.ova **file.
- I am using Oracle VirtualBox.
- The following settings should be done in the network category of VirtualBox (this applies to the host machine as well as the target machine). In this case, the bridged adapter is required to connect the virtual network adapter of MoneyBox to host network adapter (Kali Linux).

**Steps involved in cracking MoneyBox :**

- Getting the IP address of MoneyBox using ***netdiscovery***.
- Scanning the ports and services using ***nmap.***
- Web application for enumeration.
- List of FTP services.
- Setting up Steghide and extracting a key from an image file.
- Using brute force to attack the SSH service.
- Reading the flags and locating the root.

## The actual walkthrough

- In the first step, we would run the ***netdiscover ***command to find the target machine's IP address. As you can see, the IP address of the target machine is *192.168.0.194. *The IP address of your machine can be very well different than this.
$ netdiscover

![Finding the IP address of target machine](https://cdn-images-1.medium.com/max/800/1*j1pzSi0UDWkN1Vik4V0Ukg.png)

2. We got the IP address of the target machine. Now we will use ***nmap*** to run a port scan and to identify open ports and services on the target machine. As shown in the image, 3 ports are open and 3 services are running on them- ftp, ssh and http respectively.

*Note : You can use other tools such as ZenMap, Angry IP Scanner, Netdiscover as alternatives to nmap.*

$ nmap 192.168.0.224

![Scanning the IP address of the target machine using NMAP.](https://cdn-images-1.medium.com/max/800/1*42_7MRLDU6YzPvqK1QLG_Q.png)

## Starting with the HTTP port

- We will start with the HTTP port. We will open the IP of the target machine on the browser. You can see the below image which shows the output.

![Starting with the HTTP port, putting the IP of MoneyBox on the browser.](https://cdn-images-1.medium.com/max/800/1*N1XAiSvnf_5AdIzrGviNaQ.png)

2. Now we will run ***dirb scan ***on the target machine's IP to explore more and identify the files and directories located on that server.

DIRB is a web content scanner. It searches for present (and/or concealed) Web Objects. It basically operates by attacking a web server using a dictionary and then evaluating the results. It is a Kali Linux tool.

*Note : *[*Wappalyzer*](https://linuxsecurity.expert/tools/wappalyzer/)* is a simple and less complicated alternative to dirb. You can very well use *[*Burpsuite*](https://portswigger.net/burp)* as well.*

$ dirb http://192.168.0.194

![Running DIRB scan on target machine's IP](https://cdn-images-1.medium.com/max/800/1*f481JfM9TGYsckRyyXfIIg.png)

3. As we can see, the server has a directory called blogs. We will try to find and analyze it now. For this, we will use the following IP adderss: [http://192.168.0.194/blogs.](http://192.168.0.194/blogs.) It would show up following page :

![Checking the directory 'blogs'](https://cdn-images-1.medium.com/max/800/1*j1RFn6rvPU5YNrfiNQ8mNQ.png)

As we can see in the screenshot, there is a username of a previous user/hacker who hacked moneybox. As this is just a hint and nothing solid, we will check the source code of the page, as a normal practice.

![Checking the source code of the page.](https://cdn-images-1.medium.com/max/800/1*WvwYx9Atruvo9VY0Nc8lAA.png)

As you can see at the bottom of the image, in the comments section, we found the name of another hidden directory. Let us open the hidden directory on the browser.

![Opening the hidden directory](https://cdn-images-1.medium.com/max/800/1*SybbxQPqXwAXJA4u-SxtcQ.png)

Again, there was nothing but simple text on the browser, therefore, we will check the source code again.

![Checking the source code of the secret directory.](https://cdn-images-1.medium.com/max/800/1*q7j7A1EuKyIS2SbvSTaNMA.png)

We have now found the secret key that can be used later. We should write it down because we would need it further.

4. We will dirb scan the secret directory since we did not find anything apart from the secret key.

$ dirb http://192.168.0.194/S3cr3t-T3xt/

![DIRB scan of the secret directory.](https://cdn-images-1.medium.com/max/800/1*h5Yz3bKLEL-lufvDI8Tyrw.png)

Dirb scan done on the secret text URL. This result did not give any definitive output either, so now we will move to another port on which the FTP service is running.

## Starting with the FTP port

- In the previous scan using ***netstat***, we found that the FTP port was also open. We shall use the following command to scan it.
$ ftp 192.168.0.194

![Scanning the open FTP port.](https://cdn-images-1.medium.com/max/800/1*2jZKvVbwIef_PCH1A81Fmg.png)

2. As we can see in the above image, ***trytofind.jpg*** is another hint that we can use. Now we will try and download and locate that image using FileZilla.

*FileZilla Server* is a free open-source FTP and FTPS Server.

The command for using FileZilla -

$ filezilla 192.168.0.194

Alternatively, you can open it from your apps and put the IP address manually as well.

*Note : You can use a simple FTP command instead of using FileZilla as well. Midnight Commander, ODrive, gFTP are some of the other alternatives to it.*

![Running FileZilla](https://cdn-images-1.medium.com/max/800/1*hL6sWTVpuWlQELZ99L5xDA.png)

Results are shown by FileZilla —

![Results shown by FileZilla](https://cdn-images-1.medium.com/max/800/1*ENAfu-uPEUMrXxBclIJ0pA.png)

As you can see, we have*** trytofind.jpg*** present here. You can right-click on it and download it. Once downloaded, locate it and open it.

![Image located and downloaded using FileZilla.](https://cdn-images-1.medium.com/max/800/1*rFW76SvOf5fiu-YYz2OKJw.png)

As you can see, this is the image that we got. Since there is nothing definitive on the image, we might try and extract hidden text from this image, if any. We can use steghide for the same.

To know more about steganography and steghide, you can refer to—[https://medium.com/@harshkahate/using-steganography-tools-in-kali-linux-59a4d5a3314b](https://medium.com/@harshkahate/using-steganography-tools-in-kali-linux-59a4d5a3314b)

*Note : Instead of using Steghide, a simple browser-based web service can be used as well to extract the data from images.*

3. Using steghide to extract hidden text —

$ steghide extract -sf trytofind.jpg

![Using steghide to extract the text and write it to data.txt](https://cdn-images-1.medium.com/max/800/1*xGk8B2_vupCHptjKl9wqfA.png)

As you can see, steghide worked here. The passphrase that I used here was the same that we found in step 3, HTTP port analyisis, and we noted it down at that time.

Now that the data has been extracted and written in data.txt, we should see its contents of it.

$ cat data.txt

![Reading the contents of data.txt](https://cdn-images-1.medium.com/max/800/1*fyvpCol3xXWnjn5KM7fXbg.png)

From this, we came to know that there is a user named 'renu' on the target machine and a very weak password is used by renu. Now that we know the username, we will try and run a brute force attack on the SSH port using the username 'renu'.

## Starting with the SSH port

- Cracking the password of the user: ***Hydra*** tool will be used for this. It is a password cracking tool which is available by default in Kali Linux. We use the following command -
$ hydra -l renu -P /usr/share/wordlists/rockyou.txt 192.168.0.194 sshhydra : Name of the tool-l : Specifies the username to use during brute force attack.renu : username-P : Specifies a wordlist of passwords that is used during the bruteforce attack./usr/share/wordlists/rockyou.txt : location of the wordlist. (This is present by default in Linux).192.168.0.194 : Target machine's IP address.ssh : Service using which attack is to be done.

*Note : There are various alternatives available to Hydra. Some of them include : *[*Patator*](https://linuxsecurity.expert/tools/patator/)*, *[*hashcat*](https://linuxsecurity.expert/tools/hashcat/)*, *[*Fail2ban*](https://linuxsecurity.expert/tools/fail2ban/),* etc.*

The following image shows the results of the brute force attack.

![Brute forcing ssh passwords with known username (renu).](https://cdn-images-1.medium.com/max/800/1*lF4KvAhGObk8MPd4id-0mQ.png)

2. Now that we have the password (987654321) and username (renu), we will log in to the target machine using the same.

# ssh renu@192.168.0.194

![Logging in as renu](https://cdn-images-1.medium.com/max/800/1*-2RgRrSMxwTf9J2jmv4Nhw.png)

3. We will now try to find the directories and files located inside this machine. We found out that there is a file named 'user1.txt'. Let us see what are the contents of this file.

![Going further deep into the machine as renu and finding new files and directories.](https://cdn-images-1.medium.com/max/800/1*IU5uTI9sTweZrnIgFjBcpQ.png)

We got the first user flag here. We will keep on exploring more. We tried to find more users present. For that, we will use –

$ cat /etc/passwd

/etc/passwd—this file is used to keep track of every registered user that has access to a system. From this, as you can see in the below image, we found a user called 'lily'.

![Finding another user.](https://cdn-images-1.medium.com/max/800/1*mDHCsyUbL1e1dBHvF0eBdg.png)

4. Let us now try to find another flag in a different directory. As you can see, we found the second flag (user2 flag).

![Finding the second flag.](https://cdn-images-1.medium.com/max/800/1*r9rtTV9DJ-ES_zImnvNPEQ.png)

5. We shall keep on exploring and while doing that we found an SSH key in the home directory of lily.

![Found out the SSH key.](https://cdn-images-1.medium.com/max/800/1*lTMB7I1sEmvCMHGd9wdoyg.png)

We will now go inside the SSH key and try to find more things.

![Going inside SSH directory](https://cdn-images-1.medium.com/max/800/1*bDJnTuz6uDw1Hi5pCZl0eQ.png)

As you can see, the file named ***'authorized_keys'*** is the SSH key for "lily" on the target machine. We will also see the contents of it —

![Seeing the contents of the SSH key for "lily".](https://cdn-images-1.medium.com/max/800/1*TxaICREivostponHhm2vMg.png)

6. Let us now switch the current user privilege to user "lily" with the help of the SSH keys.

$ ssh lily@127.168.0.194

![Switching the current user privilege to lily.](https://cdn-images-1.medium.com/max/800/1*abxAtXzRQFWztHtyLSi6dg.png)

The login was successful. You must be wondering why it did not ask for a password. Simply because lily had not set any password! This makes our work easier.

7. Now that we have logged in as lily, we will try and get the root access.

a. Check the user privilege using.

sudo -l

![Checking the current user privilege.](https://cdn-images-1.medium.com/max/800/1*cXAB7fF0NlIhtsAkkfWUJg.png)

We found out that the current user can run 'perl' command as root.

Perl command helps us in privilege escalation. It can be used to break out from restricted environments. I referred to the following resource to use it: [https://gtfobins.github.io/gtfobins/perl/](https://gtfobins.github.io/gtfobins/perl/)

b. As you can see in the below image, with the help of perl command, we were able to escalate the privilege and now we have the root privilege. We will list all the files. There is a file named .root.txt. We will open this file.

![Getting the root access and opening .root.txt file.](https://cdn-images-1.medium.com/max/800/1*fih3nPKiQWoCVsGVeIoUjw.png)

Congratulations! We have got the third and the last flag as well and we have cracked the MoneyBox.

## Conclusion :

- In this article, we found three flags on MoneyBox virtual machine which is available on VulnHub.
- We used different commands/tools like : netdiscover, nmap, dirb, steghide, FileZilla. There are various alternatives available to these tools, you need not necessarily use the same tools. The alternatives are mentioned in the article.

Source for downloading MoneyBox.ova file :

[https://www.vulnhub.com/entry/moneybox-1,653/](https://www.vulnhub.com/entry/moneybox-1,653/)