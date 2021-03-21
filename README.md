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
   
### if you are coming from the former jQuery version, you need to manually transfer your hostnames like in the following picture:
![diff][1]
   
## operating
 1. run `./launch.sh`
 2. your standard browser should open (`http://localhost:3000`)
 
### HAPPY MONITORING!
![what to expect][2]

![what to expexct][3]

## Now exposing /metrics to Prometheus

![suggested dashboard][4]

## Recipe for getting Grafana with Prometheus up and running

 1. docker pull grafana/grafana
 2. docker pull quay.io/prometheus (also clone its source code from github, you will change it a bit)
 3. change directory to where you cloned 
 4. configure Prometheus to include /metrics endpoint 
    > to configure `prometheus.yml` (see /docker/prometheus/prometheus.yml)
 5. in your cloned prometheus project run `docker build -t bubblegum/prometheus`
 6. ( launch `bubblegum` if it is not running already )
 7. start prometheus: `docker run --name prometheus --network="host" -d bubblegum/prometheus:0.0.1`
 8. start grafana and do the initial setup
    > DONE!

## Version houskeeping 

```js
query v {
  repository(name: "bubblegum", owner: "vos-0-org") {
    packages(orderBy: {direction: ASC, field: CREATED_AT}, last: 100) {
      totalCount
      nodes {
        versions(last: 100) {
          edges {
            cursor
            node {
              id
              v: version
              stats: statistics{
                cnt: downloadsTotalCount
              }
            }
          }
        }
      }
    }
  }
}


```

this `GraphQl` query run against the GitHub graphql endpoint `https://graphql.github.com/graphql/proxy` will output this `data.json`: 

```json
{
  "data": {
    "repository": {
      "packages": {
        "totalCount": 1,
        "nodes": [
          {
            "versions": {
              "edges": [
                {
                  "cursor": "Y3Vyc29yOnYyOpHOAHdaEw==",
                  "node": {
                    "id": "MDE0OlBhY2thZ2VWZXJzaW9uNzgyMTg0Mw==",
                    "v": "0.2.0-alpha.3",
                    "stats": {
                      "cnt": 1
                    }
                  }
                },
                {
                  "cursor": "Y3Vyc29yOnYyOpHOAHdZ9A==",
                  "node": {
                    "id": "MDE0OlBhY2thZ2VWZXJzaW9uNzgyMTgxMg==",
                    "v": "0.2.0-alpha.2",
                    "stats": {
                      "cnt": 0
                    }
                  }
                },
                {
                  "cursor": "Y3Vyc29yOnYyOpHOAHdKNg==",
                  "node": {
                    "id": "MDE0OlBhY2thZ2VWZXJzaW9uNzgxNzc4Mg==",
                    "v": "0.2.0-alpha.1",
                    "stats": {
                      "cnt": 1
                    }
                  }
                },
                {
                  "cursor": "Y3Vyc29yOnYyOpHOAHdIfg==",
                  "node": {
                    "id": "MDE0OlBhY2thZ2VWZXJzaW9uNzgxNzM0Mg==",
                    "v": "0.1.0",
                    "stats": {
                      "cnt": 0
                    }
                  }
                }
              ]
            }
          }
        ]
      }
    }
  }
}

```

Parsing the result from above with the following `jq` filter: 

`cat data.json | jq '.data.repository.packages.nodes[].versions.edges[].node as $node | select($node.stats.cnt == 0) | $node.id '`

will provide exactly the versions of the packages that did not receive any downloads (from the statistics): 

> "MDE0OlBhY2thZ2VWZXJzaW9uNzgyMTg0Mw=="  
> "MDE0OlBhY2thZ2VWZXJzaW9uNzgxNzc4Mg=="

These are the ids that need to be provided to the aformentioned  **[Delete Package Versions - GitHub Action.][5]**


[1]:transfer.png
[2]:media/all-greens.png
[3]:media/all-greens-custom.png
[4]:media/added-prometheus.png
[5]:https://github.com/marketplace/actions/delete-package-versions
