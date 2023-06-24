import sys
import json
arr = [1,2,3,4,5]
x = {
  "name": sys.argv[1],
  "age": len(arr),
  "city": "New York"
}
# sys.argv[1] is the first argument passed to the function
y = json.dumps(x)
# The print is the system ouptut / stdout and is used to get data for js 
print(y)