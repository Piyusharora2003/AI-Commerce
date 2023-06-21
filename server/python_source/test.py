import sys
import json
arr = [1,2,3,4,5]
x = {
  "name": "John",
  "age": arr,
  "city": "New York"
}
# sys.argv[1] is the first argument passed to the function
# This demonstrates how to respond variables 
y = json.dumps(x)
print(y)