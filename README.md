# bubblegum

## the Problem: 
 You have a distributed system made up of diferent microservices, stages and other network resoursces, all of these have some sort of monitoring and logging but there is no compelling overview.
 
## yes there are solutions out there
but these are overpowered and / or overkill, take to much time to setup when you just want to know a simple status of these different componenets that you build upon. 

## the proposal:
 - a simple Node Js Server
 - check on network level (ping)
 - check on application level (get) 
 - display a color code <span style="text:red">RED</span>, GREEN or YELLOW to map 5XX error, 2XX Status and everything in between
 - easy configuration for adding components that should be monitored
 # usage
 ## preparation
 * ensure you have `node` installed
 * clone this project
 * `cd into the directory` where you cloned this project
 * run `./install.sh`
 * edit `bubble-dash/src/stateAndHost.json` according to your needs and save
 ## operating
 1. run `./launch.sh`
 2. your standard browser should open (`http://localhost:3000`)
 
 ### HAPPY MONITORING!

![alt text][logo]

[logo]: https://github.com/realvorl/bubblegum/blob/reacting/all-greens.png "What to expect"
