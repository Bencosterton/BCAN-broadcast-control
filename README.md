# BCAN Broadcast Control

BCAN Broadcast Control is a collection of resources used to control all aspects of a modern broadcast environment.

![BCAN_Client_Demo](https://github.com/user-attachments/assets/70011157-94f8-447b-87b3-f8fd0e882361)

The ethos behind BCAN is to use open source control protocols to control your broadcast equipment, delivered in a way that is also open source and easily configured without the need for proprietary coding languages or GIU interfaces.

BCAN is written entirely in python and Nodejs, meaning it can be picked up by the majority of engineers and used straight out of the box (no need for a training course), or can be easily understood with some basic python/JS learning.

BCAN Broadcast Control Client application also features a simple text edit interface, meaning it is a no-code solution to existing control GUIs either hosted by the kit you own, or built by your engineering department.


## Design Topology

BCAN is designed to be scalable, resilient to interruption and change. To do this BCAN runs in a mesh topology, allowing client and control modules to be added, removed, crash, rebuilt, without disrupting the control ecosystem as a whole. <br>
There is no downtime for client or control Module upgrades. Ever. <br>
There is no expense to business if the client requirement, or control system grows.<br>

![image](https://github.com/user-attachments/assets/c1ed8bb3-d527-47d0-873a-0cca0803abec)


## Demo
<p>To demo BCAN, I have connected various control modules to the client interface;<br>
Imagine IP3 video router control - https://github.com/Bencosterton/Imagine_IP3_Control<br>
Lawo MC2 router control - https://github.com/Bencosterton/Lawo_Emberplus<br>
TSL-UMD management - https://github.com/Bencosterton/TSL-UMDv5_scripts<br>
... As well as other tools to be released soon.</p>


## If you want to try the app out;
Download the repo and in the root directory of the app run;
```bash
npm install
```
```bash
npm start
```

## Notes

<p>The beauty of BCAN Broadcast Control is the simplicity. So out the box, the client won't do much, if anything.<br>
You will need to use the 'config' tab to add you own web interfaces.<br>
If you're lucky enough to have an Imagine IP3 on site, we have an interface for you already, see above<br>
For anything else, build it! Or get in touch.</p>
