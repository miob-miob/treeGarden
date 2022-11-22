# Let`s jump on it...


## Installation

first, we will need to install **tree-garden**

`npm i tree-garden` 

should do the trick - as long as you are not using **yarn** :laughing:

tree-garden has **no dependencies** an **no peer-dependencies**, which should help with maintenance, security
and bundle size - feel free to check on [bundlephobia &#x1F609;](https://bundlephobia.com/package/tree-garden@latest) 

## Simple prediction model
** Do you like tennis?**
> Well, I don`t like tennis, but i have tennis data set!

if we want to do  some fancy machine learning, we need a couple of things:

- [ ] Some data from past - data set
- [ ] Some algorithm or way how we turn this data set into predictive model
- [ ] Also, some samples that we want to predict using our new model!
---

- [x]  As data set we have simple data set, with records if we go to play tennis dependent on weather.
It should look like:

| Outlook| Temperature| Humidity|Wind|Did I play tennis?|
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

[code_file](docs/code_snippets/shouldIPlayTenis.ts)

### Comments
!!! important "Tags in comments of presented code"
    You can notice in comments of code, I let some tags like **`[configuration]`** and
    **`[sample]`** [see here](https://github.com/miob-miob/treeGarden/blob/master/docs/code_snippets/shouldIPlayTenis.ts#L30) .
    These tags mean I want to break it down further in comments in docs.
    I will do so on multiple places of tree-garden docs.

 **[configuration]**  
 [See page](dataSetAndConfiguration.md#configuration) which describes configuration in detail
  
 **[data set]**  



 **[tree]**  
 vypudofinsdlfknwdklf sdfn

 **[sample]**  
vypudofinsdlfknwdklf sdfn

**[result]**  
vypudofinsdlfknwdklf sdfn


**[output for visualization tool]**   
vypudofinsdlfknwdklf sdfn




### Tree visualization

I used [tree garden visualization](https://github.com/miob-miob/treeGardenVisualization) to 
produce image of my trained tree

![img.png](resources/images/simpleTennisTree.png)



## Bit more advanced example

### Code
### Comments 
### Visualization
