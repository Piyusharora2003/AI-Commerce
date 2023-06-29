import sys
import json
import random
arr = [1,2,3,4,5]
x = {
  "isverified":True,
  "len_1":len(sys.argv[1]),
  "len_2":len(sys.argv[2]),
}
# sys.argv[1] is the first argument passed to the function
y = json.dumps(x)
# The print is the system ouptut / stdout and is used to get data for js 
print(y)