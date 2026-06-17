---
title: "Using Steganography tools in Linux"
date: "2022-09-17"
summary: "Before going towards the technical part of this article, let us understand what is meant by Steganography."
tags: ["Security"]
cover: "https://cdn-images-1.medium.com/max/800/0*Ch4keaI0w_CevALm.png"
canonical: "https://medium.com/@harshkahate/using-steganography-tools-in-kali-linux-59a4d5a3314b"
source: "Medium"
imported_from_medium: true
---
Before going towards the technical part of this article, let us understand what is meant by Steganography.

Steganography is one of the oldest techniques for concealing hidden information, dating back to the 5th century BC. According to the ancient author Herodotus, the ruler Histiaeus first employed it when he shaved a servant's head before tattooing a message on his scalp. The servant was sent to deliver the message once his hair was grown back. His head was again shaved by the receiver in order to read the message.

Steganography in cyber security is something similar, where the message in the above example is some data and the servant's head is a file. The data to be hidden can be hidden inside practically any other sort of digital content, and it can be used to hide almost any type of digital content, including text, images, videos, and audio.

In this article, we will try to hide the data in a text file to an image, and extract it in 2 ways -

- As the actual receiver.
- As a hacker who wants to get the data inside the file and misuse it.

---

## Prerequisites in order to perform the tasks -

- The Kali Linux instance should be updated, up and running -
$ sudo apt-get update

2. Make a new directory, (newsteghide) in this case, go into that directory and verify the same -

$ mkdir newsteghide

![Making a new directory](https://cdn-images-1.medium.com/max/800/1*5sPHG6v7vKp5SVs4A4lMQw.png)

$ cd newsteghide$ pwd

![Going to the new directory and verifying the same](https://cdn-images-1.medium.com/max/800/1*5p5Ukl2ibNZCOJUwVTzqkQ.png)

3. Create a new text file. You can also copy any text file that you want. I am using gedit to create and edit the file, alternatively, you can use any other editor (nano) or command (touch). -

$ gedit very_secret_file.txt

![Creating the file](https://cdn-images-1.medium.com/max/800/1*A40cv5KnVfHt8eAyKVkVCg.png)

![Writing to that file](https://cdn-images-1.medium.com/max/800/1*fGGmlMmTAm4kxUUYbXsxkg.png)

4. Download or copy any image into the directory (newsteghide) in this case. I have downloaded the following image. This image will be used to hide the data of the text file.

![My Image](https://cdn-images-1.medium.com/max/800/1*f5AFQfOxTEQ0sEYWnSavEg.png)

5. Verify if the required image and text file are present into the directory in order to proceed. Which in this case are very well present.

$ ls

![Article image](https://cdn-images-1.medium.com/max/800/1*1SmxOJVX3uiZ88n7rT5bJw.png)

6. Install steghide

Steghide is a steganography program that is used to hide data in various kinds of image and audio files.

$ sudo apt-get install steghide -y

![Article image](https://cdn-images-1.medium.com/max/800/1*Fq6VMzTx63Gp0xXJVsl9kw.png)

7. Install stegcracker (brute force tool)

StegCracker is a steganography brute-force utility to uncover hidden data inside files.

Note : You need to have Python3 installed on your Kali Linux in order to install this.

$ pip3 install stegcracker

![Installing stegcracker, which in this case is already installed](https://cdn-images-1.medium.com/max/800/1*fLLViAoca_8BdPcgaictzA.png)

---

## You are now ready to start embedding data into your image using Steghide.

- Use the following command -
$ steghide embed -cf Image.jpg -ef very_secret_file.txt

Let us break down the command

steghide—The name of the programembed—This is the command-cf—This flag is for the cover file (cover file is the file that is used to embed data)filename—Name of the cover file-ef—This flag is for the embed file (the file that will be embedded)filename—This is the name of the embedded file

Enter the passphrase that it asks for.

![Use of the steghide command—hiding the bits of the txt file to the image](https://cdn-images-1.medium.com/max/800/1*-yizAmX_23E-ampb-iGVjw.png)

---

## Scenario 1: I am the actual sender/receiver knowing the passphrase. I need to extract the data.

The following command will be used. Since the person already knows the passphrase, the contents would be extracted easily.

$ steghide extract -sf Image.jpg

![Extracting the secret message from the image and writing on the text file.](https://cdn-images-1.medium.com/max/800/1*BRDnIWZxR_YhgDgA7gXsKQ.png)

Congrats! You successfully extracted a hidden text file from an image!

You can use—*cat very_secret_file.txt *to view the contents.

---

## Scenario 2: I am the hacker and I want to see the contents of the file.

In this case, a. I will use a tool called Stegcreacker and brute force the file. Stegcracker will take a wordlist and image name as arguments here.

A wordlist is a collection of plain-text passwords, it can be referred to as a password dictionary.

The wordlist that I am using is a package in Kali Linux. This package contains the rockyou.txt wordlist and has an installation size of 134 MB.

Locate it -

$ locate rockyou.txt

![Locating the wordlist (rockyou.txt) file](https://cdn-images-1.medium.com/max/800/1*ZWzFMGO64O_JMOGxDsn63g.png)

Unzip the file in order to use it further -

$ gzip -d rockyou.txt.gz

![Unzipping the file](https://cdn-images-1.medium.com/max/800/1*OeidEo1_HHl3JlZZYKnqZA.png)

Now that the unzipped file is available, copy it to newsteghide directory –

$ cp rockyou.txt /home/hkahate/newsteghide/

![Copy the file](https://cdn-images-1.medium.com/max/800/1*tcpF0eTFOHkr_23W5M2Ixg.png)

Use stegcracker tool and try to brute force the passphrase –

*This will usually be a long process, provided that your passphrase is a decent one and the wordlist contains a huge amount of phrases (passwords).*

Command for using stegcracker —

$ stegcracker Image.jpg rockyou.txt

![Actual use of stegcracker tool](https://cdn-images-1.medium.com/max/800/1*GBNNILMXdP3qw8cuDla_kw.png)

As you can see, after trying 27948 passwords, it has finally cracked the password which is "helloworld". Let us try to now see the hidden contents by writing them to a file using the cracked passphrase.

$ steghide extract -sf Image.jpg$ cat very_secret_file.txt

![Extracting the contents of the .jpg and writing them to the .txt file using cracker passphrase](https://cdn-images-1.medium.com/max/800/1*fknBpc13CPt4xN4VN4nk_A.png)

Congrats! You have successfully brute-force attacked the file and extracted data in it.

---

## Conclusion

- Steganography is a very useful technique when you want to hide the data, as well as the fact that a secret communication is taking place.
- Steghide is one of the tools in Kali Linux to perform steganography.
- Stegcracker is of the tools in Kali Linux to perform a brute force attack on a file in which the data is embedded using steghide.
- The stronger your password/passphrase is, the lesser the chances of it being cracked by a hacker.

If you have any questions feel free to Tweet or PM me [Harsh Kahate](https://medium.com/u/546e2bfeb07c).