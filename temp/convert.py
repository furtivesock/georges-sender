import json
import re

my_file = open("travels.txt","r")
json_file = open("new_travels.json","w")

raw_travels = my_file.readlines()
travels_array = []
travels_dict = {}

for travel in raw_travels:
    dict = {}
    name = re.findall(r"(.*?)\s(?=\d{4})", travel)[0].split(' ')
    
    if len(name) > 1:
        def_name = " ".join(name[1:]).capitalize()
    else:
        def_name = name[0]

    dict["name"] = def_name
    dict["year"] = re.findall(r"\d{4}", travel)[0]
    url = travel.split(' ')[-1]
    dict["url"] = url[:-1]
    dict["coords"] = "0,0,0,0"

    # Defining planet's land
    if any(x in name for x in ["Indonesie","Inde","Vietnam","Cambodge","Polynésie"]):
        dict["earthland"] = "East-Asia"
    elif any(x in name for x in ["Usa","Antilles","Canada","Cuba","Venezuela","Mexique"]):
        dict["earthland"] = "America"
    elif any(x in name for x in ["Ukraine","Tunisie","Croatie","Yougoslavie","Grèce","Laponie","Egypte","Ouzbékistan"]):
        dict["earthland"] = "West-Asia"
    elif any(x in name for x in ["France","Albanie","Allemagne","Londres","Amsterdam","Italie","Belgique","Portugal","Espagne","Maroc","Sahara","Malte","Norvège","Irlande"]):
        dict["earthland"] = "Europe"
    else:
        dict["earthland"] = None
    
    # TODO: Coords according to country

    travels_array.append(dict)

travels_dict["travels"] = travels_array
    
json_file.write(json.dumps(travels_dict, indent=4))