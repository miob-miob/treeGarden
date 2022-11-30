#### What is this good for?

Which impurity measurement function is better for my dataset? Will it be **gini index** or 
**information gain** ? And what about **accuracy**? It is changing each run, because it 
depends on the mix of samples I put into training dataset and into validation dataset. 

> Cross validation is in general used for tuning hyper-parameters.

We can get more relevant answers regarding questions above, if we use proper
**[cross validation](https://en.wikipedia.org/wiki/Cross-validation_(statistics))**.  

In our case we will use ten-fold cross-validation to asses if **information gain** impurity measurement is 
leading to more precise trees than **information gain ratio**.

There is no high-level implementation for cross-validation in **tree-garden**, 
but it is easy to craft one. 

#### Let`s check code
[code_file](docs/code_snippets/crossValidation.ts)


#### Summary
If you run this example you will see, that **information gain** is not better than **information gain ratio**.
Now equipped with this knowledge based on evidence, you can switch on **information gain ratio** for titanic 
data set and train your final tree from all data you have...
