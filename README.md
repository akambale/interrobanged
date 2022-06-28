### Download the extension on the [Chrome Web Store](https://chrome.google.com/webstore/detail/interrobanged/fmofaoljbgemhaicpbfpjipjdjbkhoeg)

## About The Extension

This extension will identify text on your page that matches "!?" or "?!" and replace them with an interrobang: "‽" so you don't have to add the character in manually when typing. 

Click on the extension icon to toggle the functionality on or off. When turned on, interrobang swaps will be immediately made; swaps will be made again every minute. This extension will operate on all open tabs.

**WARNING:** This extension will make changes to webpages you visit. There is a slight possibility that the webpage may break. _Use this extension at your own risk!_

## Why build‽

I listened to an episode of [99 Percent Invisible](https://99percentinvisible.org/episode/interrobang/) about the interrobang and I was inspired to create this chrome extension. I have always been interested by the interrobang, but like they discuss in the podcast episode, the reason this punctuation mark has never caught on is because it is not easily accessible; a writer has to make the deliberate decision to include one and then insert it in their text editor of choice. One solution is to set up text replacement on your phone, but that does not address where people do most of their day to day typing.

To achieve our goal of making the interrobang a commonly used symbol, people need to start using it without thinking. I designed this chrome extension to do just that on the web. If you toggle the extensions symbol, it will immediately go through your webpage and make changes to your text. It will find "!?" and " ?!" symbols and replace them with interrobangs. If you leave the extension on, it will make these changes every minute across all of your tabs. It may even update text you cannot edit, just so you can properly read everyone's excited questions.

Soon everyday correspondence and text on the web will be filled with interrobangs!

## How it works

June 28, 2022

I first built this extension in 2019 as a project for fun but also as a part of my portfolio. I was pretty inexperienced then, only having been working professionally for about 8-9 months. The writing below is preserved from that time and you can see just how bad my algorithm was. The approach of going through each node on the dom and it's children is wildly inefficient and repetitive. Also, `O(n^3)` does not exist; any `n^x` above `1` is considered the same time complexity.

The new algorithm a bit better in I no longer try to traverse the tree repeatedly. I just get all the text nodes and replace their text individually. It still requires a few tree traversals with native DOM APIs to get those text nodes, but there is no avoiding that. The new time complexity can still be understood as `O(n^2)` where n represents the number of characters on the page. I could bring this down to `O(n)` if I optimized on `indexOf` but this just seems so pointless now. I have a better understanding of how time complexity actually impacts UX in cases like these. It's pretty negligible for most web pages. Counting text nodes on gmail for example returns about 1000 text nodes I need to check for. 1000^2 is not too bad for iterations of code operations.

 This is a stark improvement and it really only took me 1-2 hours to come up with the solution. Which is hilarious as I must have spent a few days working on the algorithm when I first wrote the extension. I got hung up on edge cases like elements with contenteditable and figuring out how to excluding script tags. Now, with the experience I have, solving those problems is just comically easy. *Just add an on blur event* and *check if the parent node is a script tag*. Easy as cake.


### Holy Time Complexity Batman! (April 8th, 2019)

From my first days learning to code, experienced engineers always told me: "Don't put loops in loops." I always shrugged them off, thinking" What's the worst that can happen?

My simplest approach to this problem was to select all nodes on the page and see if they had an innerHTML string. Then, loop through every character on that string and see if it matched "!?". I would then replace that substring with an interrobang. At one point, I was console logging every two character substring on the page. This was a very bad idea as my browser crashed.

**Fun fact about the DOM that you already know:** It's a tree data structure. So a node nested 5 layers down was looped through 5 times, one for each of it's parents in addition to itself. Also, replacing the innerHTML of many nodes has a tendency to break the webpage. Who would have thought‽

Instead, I tried selecting all nodes and looping through and replacing the innerText of each one. This was better, but it still managed to break a few web pages. My functionality of this app envisioned changing both hard coded text as well as text inputs, but the risk of breaking the page was just too high. Instead I would only inspect nodes that had no children. This would leave out text in this format: `<p>Hello <strong>Amogh</strong>!?</p>`. I accepted this shortcoming and decided that my focus would be on changing text editable elements on the page--most importantly that elements I was changing were NOT script tags, and then loop through their innerText and replace. My logic was as follows:

```
// select all nodes and loop through
    // determine if they are elements which hold text AND if they have no children
    // element.innerText.indexOf("!?"), repeatedly loop through until this code equals -1
        // repeatedly identify substring matches for "!?" with indexOf and replace with an interrobang
```

A loop for all the nodes; an indexOf to identify where the target strings are; a while loop to replace the target string as many times as needed. Time complexity comes to O(n^3), yikes!

### Perfect is the enemy of good

To improve on this, a better function would be to eliminate the need for the repeated invocations of indexOf. We could take each innerText and start replacing the target substrings as we go through it; only requiring one loop. I didn't choose this method initially because changing the length of a string while you are iterating through it complicates the logic; increasing the risk of bugs.

With the if statement on the second line of my logic and the fact that there will not be many target substrings on the page, the changing function manages to preform quickly enough. Any interrobang changes on my test webpages when I toggle the extension seem to happen instantly; well underneath the 200 milliseconds threshold of human observability.
