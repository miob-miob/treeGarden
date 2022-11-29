

This example shows how to train random forest and use it for prediction if our, 
virtual passenger could survive titanic catastrophe.


## code
[code_file](docs/code_snippets/randomForest.ts)

## comments

**[impurity scoring function]**  
[Information gain](../api/modules/impurity.md#getinformationgainforsplit) 
is cheaper than [information gain ratio](../api/modules/impurity.md#getinformationgainratioforsplit) 
and we can use it here as we do not have fields with huge number of classes involved like name,ticket or cabin
information gain ratio penalizes these fields as they has always high purity
and thus their information gain is always high.



**[out of the bag error]**  
[Out of bag error](https://en.wikipedia.org/wiki/Out-of-bag_error) is error metrics calculated during 
training and is calculated just on samples that were not using for training of given tree.

Out of bag error is computationally cheaper than external cross validation and can be used for tuning parameters, 
measure data preprocessing effectivity etc. 




**[random forest prediction outcome]**  
We are passing array of tree roots into [getRandomForestPrediction](../api/modules.md#getrandomforestprediction) under the hood,
sample is passed to each tree, and some majority voting function is applied to extract final 
result. See fields **majorityVoting**, **mergeClassificationResults** and **mergeRegressionResults** of 
[algorithm config](../api/modules.md#treegardenconfiguration)
