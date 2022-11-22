

Let`s obtain algorithm configuration just from single data sample. 

This may be handy, if we do not have access to full training data set - for 
instance if we have build classification service which uses pretrained tree/forest.

## code 
[ts](docs/code_snippets/configFromSingleSample.ts)

## comments

In this example we imported bundled tree, take one data sample and used it to build configuration.   
This configuration is then used for predicting our unknown sample.


**[sample for config]**   
As wee used just single data sample to create configuration. We need sample **without missing values** -
all fields from learning phase where whole data set was presented must be included in this single sample.

**[important]**
We also need to provide all classes presented in our data set in our case it is **'Yes'** and
**'No'**
  






