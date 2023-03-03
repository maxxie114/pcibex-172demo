//var counterOverride = 0 
//var counterOverride = 1 
//var counterOverride = 2
//var counterOverride = 35
PennController.DebugOff()

var shuffleSequence = seq("counterbuffer","setcounter", "instruct","beginpractice",
           //practice
            "practice_1","sep1","practice_2","sep2","practice_3","sep3","practice_4","sep4", sepWith("sep", rshuffle(startsWith("burn_"))), "endpractice",  
            // Experiment
             sepWith("sep", rshuffle(startsWith("enc3_"),startsWith("filledgap_"),startsWith("fill_"),startsWith("anim_"),startsWith("genfill_"))),                                          
            // End 
             "end","sendresults","end2");
var practiceItemTypes = ["practice"];


var defaults = [
  "Separator", {
    transfer: 1000,
    normalMessage: "Please wait for the next sentence.",
    ignoreFailure: true
  },
  "DashedSentence", {
    mode: "self-paced reading"
  },
  "AcceptabilityJudgment", {
    as: ["1", "2", "3", "4", "5", "6"],
    presentAsScale: true,
    instructions: "How plausible is this sentence? Use number keys or click boxes to answer.",
    leftComment: "(Highly implausible)", rightComment: "(Highly plausible)"
  },
  "Question", {
    hasCorrect: true,
    autoFirstChar: true
  },
  "Message", {
    hideProgressBar: true
  },
  "Form", {
    hideProgressBar: true,
    continueOnReturn: true,
    saveReactionTime: true
  }
];

var manualSendResults = true;
var aj = "AcceptabilityJudgment";

var items = [

//separator
["sep", "Separator", { }],
  
// Send the results to server
["sendresults", "__SendResults__", { }],

 //set counter
 ["setcounter", "__SetCounter__", { }],


  //html files 
  
  ["intro", "Form", {
    html: { include: "intro.html" },
    validators: {
      age: function (s) { if (s.match(/^\d+$/)) return true; else return "Bad value for \u2018age\u2019"; }
    }
  } ],
  ["beginpractice", "Message", {transfer:"keypress",
           html: { include: "beginpractice.html" } } ],
  ["instruct", "Form", {transfer:"click",
           html: { include: "intro_demographic.html" } } ],
  ["endpractice", "Message", {transfer:"keypress",
           html: { include: "endpractice.html" } } ],
  ["end", "Form", {transfer:"click",
           html: { include: "debrief.html" } } ],
  ["end2", "Message", {transfer:"keypress",
           html: { include: "end2.html" } } ],
  ["counterbuffer", "Message", {transfer:"keypress",
           html: { include: "welcome.html" } } ],

// Guided practice
  
// Practice for Relatedness
        

["practice_1", "DashedSentence", {s: "This sentence is to get you used to a moving window display.", hideProgressBar: true}],
["sep1", "Separator", {transfer:"keypress", normalMessage: "That's how reading in this format will feel. The actual sentences will be a bit more complicated, and will be followed by a question. Press any key for the next practice item.", hideProgressBar: true}],

["practice_2", "DashedSentence", {s: "The fish that were swimming in the lake were caught by the little boy.", hideProgressBar: true },
        "Question",    {q: "Was the person who caught the fish young?",
                 as: [ "F - Yes", "J - No"]}],
["sep2", "Separator", {transfer: "keypress", normalMessage: "Sometimes the 'Yes' and 'No' will appear in different orders. Remember that you should always press 'F' for 'Yes' and 'J' for 'No' regardless of the order. Let's try another one. Press any key to continue on to the next practice item.", hideProgressBar: true}],

["practice_3", "DashedSentence", {s: "The floor that had recently been cleaned by the new maid was slippery enough to make people fall.", hideProgressBar: true },
        "Question",    {q: "Was the floor cleaned by a janitor?",
                 as: [ "J - No", "F - Yes"]}],
["sep3", "Separator", {transfer:"keypress", normalMessage: "Some of the sentences will be a bit long. Remember to read at a pace that feels natural for you so that you can understand everything. Press any key to continue on to the next practice item.", hideProgressBar: true}],
  
["practice_4", "DashedSentence", {s: "My friends doubted that I saw whales when I went out on a boat, but I saw three whales with my binoculars.", hideProgressBar: true },
        "Question",    {q: "Did others believe I saw whales?",
                 as: [ "J - No", "F - Yes"]}],
["sep4", "Separator", {transfer:"keypress", normalMessage: "Up next you'll see a few more practice items to get used to the task. Press any key to continue.", hideProgressBar: true}],
    
 //Burn-in 
 
[["burn_enc",200], "DashedSentence", {s: "It seemed obvious that the cake that the candles were burning on had not been properly frosted by the chef."},"Question", {q: "Are people probably pleased with this cake?", as: [ "J - No", "F - Yes"]}], 
[["burn_enc",201], "DashedSentence", {s: "It wasn't clear that the tape that the store was selling next to the staples was double-sided, confusing many customers."},"Question", {q: "Were customers confused about the staples?", as: [ "J - No", "F - Yes"]}],
[["burn_enc",202], "DashedSentence", {s: "Everyone was shocked that the bakery that was next to the library had been closed down by inspectors."},"Question", {q: "Were people surprised to hear the news?", as: [ "F - Yes", "J - No"]}], 
[["burn_enc",203], "DashedSentence", {s: "It was fortunate that the artist that taught a photography class had free time to work with young students."},"Question", {q: "Was the artist generous with their time?", as: [ "F - Yes", "J - No"]}],
[["burn_11",204], "DashedSentence", {s: "The man saw his friend walking with her daughter, but it wasn't clear who else he saw at the park."},"Question", {q: "Was the man walking in a park?", as: [ "F - Yes", "J - No"]}], 
[["burn_ll",205], "DashedSentence", {s: "David saw that his friend was eating with chopsticks, but he didn't see what his friend's wife was eating."},"Question", {q: "Was David's friend eating with a spoon?", as: [ "J - No", "F - Yes"]}], 
[["burn_ll",206], "DashedSentence", {s: "Mariana heard that the governor gave a speech at a podium, but she didn't know where the mayor gave a speech from."},"Question", {q: "Is it likely she watched the mayor give a speech?", as: [ "J - No", "F - Yes"]}], 
[["burn_ll",207], "DashedSentence", {s: "Anne knew that the TV host liked to start his show with a song, but she didn't know how news anchors start their programs."},"Question", {q: "Is it likely Anne doesn't watch the news a lot?", as: [ "F - Yes", "J - No"]}],
[["burn_ll",208], "DashedSentence", {s: "Vanessa was reminded that Cassie liked to bake with whole wheat flour, but she didn't know what Jason liked to bake with on the weekends."},"Question", {q: "Is Vanessa more familiar with Cassie's baking habits than Jason's?", as: [ "F - Yes", "J - No"]}],

// semantic encoding

[["enc3_a",1],"DashedSentence", {s: "It was clear that the knife that the sword was placed by had been recently sharpened in the kitchen yesterday."},"Question", {q:"Was it obvious that this event happened?", as:["F - Yes","J - No"]}],
[["enc3_b",1],"DashedSentence", {s: "It was clear that the knife that, as you know, the sword was placed by had been recently sharpened in the kitchen yesterday."},"Question", {q:"Was it obvious that this event happened?", as:["F - Yes","J - No"]}],
[["enc3_c",1],"DashedSentence", {s: "It was clear that the knife that was placed by the sword had been recently sharpened in the kitchen yesterday."},"Question", {q:"Was it obvious that this event happened?", as:["F - Yes","J - No"]}],
[["enc3_d",1],"DashedSentence", {s: "It was clear that the knife that, as you know, was placed by the sword had been recently sharpened in the kitchen yesterday."},"Question", {q:"Was it obvious that this event happened?", as:["F - Yes","J - No"]}],

// semantic encoding fillers

[["fill_x",43],"DashedSentence", {s: "No one cared that the marker that children liked to play with was running out of ink because there were other markers in the box."},"Question", {q: "Were the children worried about this one marker running out of ink?", as: [ "J - No", "F - Yes"]}],
[["fill_x",44],"DashedSentence", {s: "It became clear that the pen that was near the bottle was capped tightly so that it would not make a mess."},"Question", {q: "Was the pen likely to make a mess?", as: [ "J - No", "F - Yes"]}],
[["fill_x",45],"DashedSentence", {s: "It was stated that the employee that the manager liked was running late for a meeting on Monday."},"Question", {q: "Did the manager like this employee?", as: [ "F - Yes", "J - No"]}],
[["fill_x",46],"DashedSentence", {s: "It was exciting that the athlete that the judges liked was going to win at the nation-wide competition the other day."},"Question", {q: "Was this an international competition?", as: [ "J - No", "F - Yes"]}],
[["fill_x",47],"DashedSentence", {s: "Dona was hopeful that the funeral that was planned for today would be well-attended by many friends and family."},"Question", {q: "Was the event planned for today a sad one?", as: [ "F - Yes", "J - No"]}],
[["fill_x",48],"DashedSentence", {s: "Bill was excited that the wedding that was for his sister would be on a beach in California in the summer."},"Question", {q: "Was the wedding for a family member?", as: [ "F - Yes", "J - No"]}],
[["fill_x",49],"DashedSentence", {s: "Milly knew that the hotel that her friend had booked would be too expensive for her to stay in all week."},"Question", {q: "Did one of Milly's relatives book the hotel?", as: [ "J - No", "F - Yes"]}],
[["fill_x",50],"DashedSentence", {s: "It was clear that the board that hadn't yet been sanded would give splinters to anyone who touched it without gloves."},"Question", {q: "Would it be safe to touch the board barehanded?", as: [ "J - No", "F - Yes"]}],
[["fill_x",51],"DashedSentence", {s: "No one knew that the page that had been torn out of the book contained important information for the plot of the story."},"Question", {q: "Would it probably be a little hard to understand the book now?", as: [ "F - Yes", "J - No"]}],
[["fill_x",52],"DashedSentence", {s: "Everyone forgot that the paper that had been erased was lying on the desk in the front of the room."},"Question", {q: "Did people remember where the paper was?", as: [ "J - No", "F - Yes"]}],


 
//animacy fillers

[["anim_a",88],"DashedSentence", {s: "The kindergarten teacher pointed out the colorful toy which, as of yesterday, the young girl has played with incessantly."},"Question", {q: "Was the young girl playing with another classmate? ", as: [ "J - No", "F - Yes"]}],
[["anim_b",88],"DashedSentence", {s: "The kindergarten teacher pointed out the friendly child who, as of yesterday, the young girl has played with incessantly."},"Question", {q: "Was the young girl playing with a toy?", as: [ "J - No", "F - Yes"]}],
[["anim_c",88],"DashedSentence", {s: "The kindergarten teacher pointed out the colorful toy with which as of yesterday, the young girl has played incessantly."},"Question", {q: "Was the young girl playing with another classmate?", as: [ "J - No", "F - Yes"]}],
[["anim_d",88],"DashedSentence", {s: "The kindergarten teacher pointed out the friendly child with whom, as of yesterday, the young girl has played with incessantly."},"Question", {q: "Was the young girl playing with a toy?", as: [ "J - No", "F - Yes"]}],


// gen fill_

[["genfill_x",112],"DashedSentence", {s: "It seemed incredible to the spectators that the game was still going on after 5 hours."},"Question", {q: "Was it a quick game?", as: [ "J - No", "F - Yes"]}],
[["genfill_x",113],"DashedSentence", {s: "It seemed stupid to the kids that they weren't allowed to go out after dark."},"Question", {q: "Did the kids find it reasonable that they couldn't go out after dark?", as: [ "J - No", "F - Yes"]}],
[["genfill_x",114],"DashedSentence", {s: "It wasn't obvious to the judges that the figure skater had fulfilled all of the technical requirements."},"Question", {q: "Was it obvious to the judges that the skater finished the requirements?", as: [ "J - No", "F - Yes"]}],
[["genfill_x",115],"DashedSentence", {s: "It was disturbing to the manager that the division's productivity had dropped by 50%."},"Question", {q: "Was the division's performance disturbing to the manager?", as: [ "F - Yes", "J - No"]}],
[["genfill_x",116],"DashedSentence", {s: "It seemed wonderful to the visitors that Delaware had no sales tax."},"Question", {q: "Was it Delaware that had no sales tax?", as: [ "F - Yes", "J - No"]}],
[["genfill_x",117],"DashedSentence", {s: "It was surprising to Dominique that the big basketball game hadn't sold out."},"Question", {q: "Was Dominique surprised that the game hadn't sold out?", as: [ "F - Yes", "J - No"]}],
[["genfill_x",118],"DashedSentence", {s: "It seemed ridiculous that anytime someone needed some classroom supplies they had to fill out three pages of documentation."},"Question", {q: "Did the need for documentation seem ridiculous?", as: [ "F - Yes", "J - No"]}],
[["genfill_x",119],"DashedSentence", {s: "It seemed unbelievable that no one had ever tried to challenge the world record in oyster-shucking."},"Question", {q: "Was it the apple-peeling record that had not been challenged?", as: [ "J - No", "F - Yes"]}],
[["genfill_x",120],"DashedSentence", {s: "It seemed creepy that the hotel was built on an ancient burial ground where human sacrifice had taken place."},"Question", {q: "Did it seem creepy that the hotel was built on a burial ground?", as: [ "F - Yes", "J - No"]}],
[["genfill_x",121],"DashedSentence", {s: "It was aggravating that the best efforts of archaeologists to find the legendary Aztec city had failed."},"Question", {q: "Had the efforts of the archaeologists succeeded?", as: [ "J - No", "F - Yes"]}]





];