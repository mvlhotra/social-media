var _ = require("underscore");

var data = {
    f01: {
      name: "Alice",
      age: 15,
      follows: ["f02", "f03", "f04"]
    },
    f02: {
      name: "Bob",
      age: 20,
      follows: ["f05", "f06"]
    },
    f03: {
      name: "Charlie",
      age: 35,
      follows: ["f01", "f04", "f06"]
    },
    f04: {
      name: "Debbie",
      age: 40,
      follows: ["f01", "f02", "f03", "f05", "f06"]
    },
    f05: {
      name: "Elizabeth",
      age: 45,
      follows: ["f04"]
    },
    f06: {
      name: "Finn",
      age: 25,
      follows: ["f05"]
    }
  };

// helpers

function getName(list,fKey){
    return (list[fKey].name);
}

function translateFollowers(list,ids){
    return ids.map(function(person){
        return getName(list,person);
    });
}

function whoFollows(list,fKey){
    whoFollowsList = [];
    for(var person in list){
        if(list[person].follows.includes(fKey)){
            whoFollowsList.push(person);
        }
    }
    return whoFollowsList;
}

function overThirtyCheck(list,fKey){
    if (list[fKey].age > 30){
        return true;
    }
    return false;
}

function MutualCheck(list,fKey){
    var non = true;
    var following = list[fKey].follows;
    var followedBy = whoFollows(list,fKey);
    var intersect = _.intersection(followedBy,following);
    return _.isEqual(following,intersect);
    
}
// tasks

function listEveryone(list){
    for(var person in list){
        var followList = list[person].follows;
        var followedBy = whoFollows(list,person);
        followList = translateFollowers(list,followList);
        followedBy = translateFollowers(list,followedBy);
        console.log(`${getName(list, person)}: \n - follows ${followList} \n - followed by ${followedBy}`); 
        console.log("--".repeat(10));
    }

}

function mostFollowers(list){
    var mostFollowers = "f01";
    for(var person in list){
        if(list[person].follows.length > list[mostFollowers].follows.length){
            mostFollowers = person;
        }
    }
    return (`${getName(list,mostFollowers)} has the most followers. MAWD CLOUT`);
}

function followingOver30(list){
    overThirtyList = {};
    var max = 0;
    var mostList = [];
    for(var person in list){
        var followList = list[person].follows;
        var overThirtyCount = 0;
        followList.forEach(function(follower){
            if(overThirtyCheck(list,follower)){
                overThirtyCount+=1;
            }
        });
        if(overThirtyCount > max){
            max = overThirtyCount;
        }
        overThirtyList[person] = overThirtyCount;
    }
    for(var user in overThirtyList){
        if(overThirtyList[user] === max){
            mostList.push(getName(list,user));
        }
    }
    return `User(s) that follow the most people over 30: ${mostList.join(", ")}`;
    
}

function followedByOver30(list){
    overThirtyList = {};
    var max = 0;
    var mostList = [];
    for(var person in list){
        var followers = whoFollows(list,person);
        followers.forEach(function(follower,index){
            if(!overThirtyCheck(list,follower)){
                followers.splice(followers.indexOf(follower),1);
            }
        });
        if(followers.length > max){
            max = followers.length;
        }
        overThirtyList[person] = followers.length;
    }
    for(var user in overThirtyList){
        if(overThirtyList[user] === max){
            mostList.push(getName(list,user));
        }
    }
    return `User(s) with the most followers that are over 30: ${mostList.join(", ")}`;
}

function nonMutual(list){
    var nonMutualList = [];
    for (var person in list){
        if (!MutualCheck(list,person)){
            nonMutualList.push(getName(list,person));
        }
    }
    return(`List of those who follow someone that doesn't follow them back: ${nonMutualList.join(", ")}`);
}

function reachCalc(list){
    var clout = [];
    for(var person in list){
        var followerList = whoFollows(list,person);
        var cloutNumber = followerList.length;
        followerList.forEach(function(follower){
            cloutNumber += whoFollows(list,follower).length;
        });
        clout.push([getName(list,person),cloutNumber].join(": "));
    }
    return `Everyone and their reach: ${clout.join(", ")}`
}


console.log(listEveryone(data));