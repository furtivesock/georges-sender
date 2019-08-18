import json
import re

import unidecode
# unaccented_string = unidecode.unidecode(accented_string)

my_file = open("travels.txt","r",encoding="utf-8")
json_file = open("new_travels.json","w",encoding="utf-8")

raw_travels = my_file.readlines()
travels_array = []
travels_dict = {}

for travel in raw_travels:
    dict = {}
    name = re.findall(r"(.*?)\s(?=\d{4})", travel)[0].split(' ')
    
    # Exceptions
    def_name  = " ".join(name).title()

    dict["name"] = def_name
    dict["year"] = re.findall(r"\d{4}", travel)[0]
    url = travel.split(' ')[-1]
    dict["url"] = url[:-1]

    travels_array.append(dict)

travels_dict["travels"] = travels_array
    
json_file.write(json.dumps(travels_dict, indent=4, ensure_ascii=False))