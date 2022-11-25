

This example shows how to train random forest and use it for prediction if our, 
virtual passenger could survive titanic catastrophe.


## code
[code_file](docs/code_snippets/randomForest.ts)

## comments

**[impurity scoring function]**  
information gain is cheaper than information gain ratio and we can use it as we do not have
fields with huge number of classes involved like name,ticket or cabin
information gain ratio penalizes these fields as they has always high purity
and thus their information gain is always high



**[out of the bag error]**  
https://en.wikipedia.org/wiki/Out-of-bag_error


**[random forest prediction outcome]**  
todotodotodo
