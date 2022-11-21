# Let`s jump on it...


## Installation

first, we will need to install **tree-garden**

`npm i tree-garden` 

should do the trick - as long as you are not using **yarn** :laughing:

tree-garden has **no** dependencies an **no** peer-dependencies, which should help with maintenance, security
and bundle size - feel free to check on [bundlephobia &#x1F609;](https://bundlephobia.com/package/tree-garden@latest) 

## Simple prediction model
** Do you like tennis?**
> Well, I don`t like tennis, but i have tennis data set!

if we want to do  some fancy machine learning, we need a couple of things:

- [ ] Some data from past - data set
- [ ] Some algorithm or way how we turn this data set into predictive model
- [ ] Last thing - same samples that we want to predict using our new model
---

- [x]  As data set we have simple data set, with records if we go to pay tennis dependent on weather.
It should look like:

| Outlook| Temperature| Humidity|Wind|Should I go play tennis?|
| :---: | :---: |:---: |:---: |:---: |
|Sunny|Hot|Hight|Weak|No|
|Overcast|Hot|Hight|Weak|Yes|
|Rain|Cool|Normal|Strong|No|
|...|...|...|...|...|

You can see whole data set [here](https://github.com/miob-miob/treeGarden/blob/master/src/sampleDataSets/tennis.ts#L2) 

- [x] Algorithm will be default tree-garden configuration 
- [x] Sample for testing will be current weather: 
```javascript
const sample = {
  outlook: 'Rain', temp: 'Mild', humidity: 'Normal', wind: 'Weak'
}
```

### Code 

[ts](docs/code_snippets/shouldIPlayTenis.ts)

### Comments
!!! important "Markers in comments of presented code"
    You can notice in comments of code, I let some markers like **`[configuration]`** and
    **`[sample]`** for further discussion, i will do it on multiple
    places of tree-garden docs.
--- 
 **[configuration]**  [Configuration](./api/modules.md#treegardenconfiguration) 
  is a very important object 
  that basically drives everything within tree-garden,
  as you can see in code it is created from 'knowledge' of data set using
  [buildAlgorithmConfiguration](./api/modules.md#buildalgorithmconfiguration) function.
  
  It is partially also dependency injection container, which enables us to provide custom 
  implementations into algorithm

---
  
 **[data set]** See example of [minimalistic data set](https://github.com/miob-miob/treeGarden/blob/master/src/sampleDataSets/simpleSet.ts)
  for tree garden. There are two fields: **`size`** and **`color`** and two **metadata** fields:
  **`_class`** and **`_label`**.
  
  All metadata fields starts with **underscore**. 
  If you are constructing data set for tree garden only **required** field is **`_class`**

  There is also **`_label`** (for visualization purposes) and **`_id`** (used for calculation
  of [out of bag error](https://en.wikipedia.org/wiki/Out-of-bag_error) - generated if not provided)
---

 **[tree]** vypudofinsdlfknwdklf sdfn

---

 **[sample]** vypudofinsdlfknwdklf sdfn

---

**[result]** vypudofinsdlfknwdklf sdfn

---


**[output for visualization tool]** vypudofinsdlfknwdklf sdfn

---


### Tree visualization

I used [tree garden visualization](https://github.com/miob-miob/treeGardenVisualization) to 
produce image of my trained tree

![img.png](resources/images/simpleTennisTree.png)



## Bit more advanced example

### Code
### Comments 
### Visualization
