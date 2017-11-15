# HackaTUM-2017

## Setup & Startup

### Do the 3-step setup

1. Install VirtualBox: https://www.virtualbox.org/wiki/Downloads
2. Install VirtualBox Extensions: https://www.virtualbox.org/wiki/Downloads (click on the Extensions link and install the Extension pack)
    * to install the extension start VirtualBox as admin/root and go to File->Settings->Extensions
3. Install Vagrant: https://www.vagrantup.com/downloads.html 

### Start the machine

1. Clone this repository. 
2. Navigate to folder ```vm``` in your terminal.
3. run command: ```vagrant up```
4. Wait until the command line output finishes (provisioning will be done headless).
5. run command: ```vagrant halt```
6. Wait until the machine was "gracefully shut down"
7. run command (again): ```vagrant up```
8. The machine will start up with GUI now.
9. Log in with password ```vagrant```
10. Get started with Ethereum, see [FirstStepsWithEthereum]()

### Setup Troubleshooting

#### Problem: "[...] USB 2.0 Ports [...]"

Make sure you installed the VirtualBox Extension Pack! See setup in ```before-workshop```. If you run into that problem although the Extensions were installed properly you can:

1. Open Virtual-Box
2. Find the machine that was created (according to the name of the folder, e.g. ```vm_default_[...]```)
3. Open the machine settings
4. Navigate to "USB" and deactivate the USB Controller
5. Run ```vagrant up``` again

#### Problem: "the guest extensions on this machine do not match the installed version of VirtualBox"

Note that this problem will just appear when you run the "vagrant up" command. Adding the machine should not result in problems.

If you get the warning, that "the guest extensions on this machine do not match the installed version of VirtualBox" when you run "vagrant up" you should be able to ignoe it. Note that your shared folder (folder shared between host and guest machine) might not work properly - but that's not a big problem.

#### "No provider found (...)" or similar error message

If you receive an error on machine startup, that tells you that "no provided can be found" (or similar) then make sure you have the latest version of VirtualBox installed. 

#### The setup is stuck ("hangs")

Most important question: Are you on a Lenovo notebook?

*If yes:* 

Most likely your ["hardware virtualization" is deactivated in BIOS](https://stackoverflow.com/questions/34907910/vagrant-up-hangs-at-ssh-auth-method-private-key). 

1. Access your BIOS and activate "hardware virtualization". 
2. Try again, it should work now.

*If no:*

1. Check if you your internet connection works properly
2. Wait for about ~5 minutes to see if an error appears.
3. Once an error appears: google it

All the "hang" we encountered so far were caused by the hardware virtualization deactivated problem.