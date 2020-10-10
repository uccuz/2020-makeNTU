import sys 
import json

result = [20,30,40,50]

json = json.dumps(result)

print(str(json))

sys.stdout.flush()