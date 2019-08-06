import json
# unaccented_string = unidecode.unidecode(accented_string)

ratio1 = 1.3633
ratio2 = 2.4935
ratio3 = 2.3967

with open("../public/js/locations.json", "r", encoding="utf8") as json_file:
    data = json.load(json_file)

for i in range(0,len(data)):
        for j in range (0,len(data[i]["destinations"])):
            if data[i]["name"] == "home":
                ratio = ratio1
            elif data[i]["name"] == "objects":
                ratio = ratio3
            else:
                ratio = ratio2
            if "coords" in data[i]["destinations"][j]:
                new_coord = [str(round(float(coord)/ratio)) for coord in data[i]["destinations"][j]["coords"].split(',')]
                data[i]["destinations"][j]["coords"] = ",".join(new_coord) 

with open("new_locations.json", "w", encoding="utf8") as json_file:
    json.dump(data, json_file, ensure_ascii=False)