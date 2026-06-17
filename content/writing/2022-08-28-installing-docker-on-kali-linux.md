---
title: "Installing Docker on Kali Linux"
date: "2022-08-28"
summary: "Understanding Docker + Installation on Kali Linux"
tags: ["Cloud Security", "Security"]
cover: "https://cdn-images-1.medium.com/max/800/1*Up3ReD1xpsOElHLYxrt_YA.png"
canonical: "https://medium.com/@harshkahate/installing-docker-on-kali-linux-dae233376a23"
source: "Medium"
imported_from_medium: true
---
## What is Docker?

Before going towards the installation of Docker on Kali Linux, let us understand what it actually is.

Docker is a platform that allows you to "build, ship, and run any app, anywhere." With Docker, a single effort is required to manage deployment.

Docker is a container technology where container is a standardized unit of software. It is a package of code and dependencies to run that code. For example—NodeJS code + NodeJS runtime environment.

## What is Container?

Applications are packaged as images that include the code, runtime environment, libraries, and settings necessary to run them. Images are executed on containers, which are independent processes that need the same amount of resources as any other executable.

Docker containers share Linux kernel ; they don't run in their own virtual machines. This in turn enables containers to use less memory and computing resources.

## Docker installation on Kali Linux

Before installing, verify if Kali Linux is updated

$ sudo apt-get update

![Verifying if Kali Linux is updated](https://cdn-images-1.medium.com/max/800/1*q9-DkrZLoyixBQi5E_WsiA.png)

Command for installing Docker :

$ sudo apt install -y docker.io

![Installing Docker](https://cdn-images-1.medium.com/max/800/1*mlc5cApn3rMmc36Tpo174g.png)

Verifying if Docker is installed properly:

$ docker

![This should show up if Docker is properly installed](https://cdn-images-1.medium.com/max/800/1*GIQBuEDUIjA51Zy19gVdaA.png)

Start Docker :

sudo systemctl start docker—— now

![Command for starting Docker](https://cdn-images-1.medium.com/max/800/1*mViAVzYS2hpkJyeu3zsTxw.png)

Install **docker-ce-cli :**

What is docker-ce-cli?

*ce : community edition*

*cli : command line interface for docker engine*

Command for it :

$ sudo apt install -y docker-ce docker-ce-cli containerd.io

![Installation of docker-ce-cli](https://cdn-images-1.medium.com/max/800/1*woFFGqXD17To8Hryx5-w9w.png)

Now that Docker is installed on your Kali Linux machine, you can start using it!