import json
import re

import unidecode
# unaccented_string = unidecode.unidecode(accented_string)

my_file = open("travels.txt","r")
json_file = open("new_travels.json","w")

raw_travels = my_file.readlines()
travels_array = []
travels_dict = {}

for travel in raw_travels:
    dict = {}
    name = re.findall(r"(.*?)\s(?=\d{4})", travel)[0].split(' ')
    
    # Exceptions
    if " ".join(name).title() in ["Costa Rica", "Sri Lanka"]:
        print("hm")
        def_name  = " ".join(name).title()
    elif len(name) > 1:
        def_name = " ".join(name[1:]).capitalize()
    else:
        def_name = name[0]

    dict["name"] = def_name
    dict["year"] = re.findall(r"\d{4}", travel)[0]
    url = travel.split(' ')[-1]
    dict["url"] = url[:-1]
    dict["coords"] = "0,0,0,0"

    # Defining planet's land

    north_america = ["Usa","Canada","Cuba","Mexique"]
    south_america = ["Venezuela","Antilles","P\u00c3\u00a9rou"]
    central_america = ["Costa"]

    north_africa = ["Mauritanie","Libye","Mali","Maroc","Sahara","Tunisie","Niger"]
    south_africa = ["Namibie"]
    middle_east = ["Egypte","Ouzb\u00c3\u00a9kistan","Oman","Turquie"]

    west_europe = ["France","Allemagne","Londres","Amsterdam","Italie","Belgique","Portugal","Espagne","Malte","Irlande"]
    east_europe = ["Ukraine","Pologne","Hongrie","Croatie","Albanie","Yougoslavie","Gr\u00c3\u00a8ce","Laponie"]
    north_europe = ["Su\u00c3\u00a8de","Norv\u00c3\u00a8ge"]
    west_asia = []
    east_asia = ["Sri", "N\u00c3\u00a9pal","Indon\u00c3\u00a9sie","Inde","Vietnam","Cambodge"]

    oceania = []
    polynesia = ["Polyn\u00c3\u00a9sie"]

    arctic = ["Groenland"]
    
    # ASIA
    if any(x in name for x in east_asia + west_asia):
        if any(x in name for x in east_asia):
            dict["earthland"] = "East-Asia"
            dict["continent"] = "Asie de l'Est"
        else:
            dict["earthland"] = "West-Asia"
            dict["continent"] = "Asie de l'Ouest"
    # AMERICA
    elif any(x in name for x in central_america + north_america + south_america):
        dict["earthland"] = "America"
        if any(x in name for x in north_america):
            dict["continent"] = "Amérique du Nord"
        elif any(x in name for x in south_america):
            dict["continent"] = "Amérique du Sud"
        else:
            dict["continent"] = "Amérique centrale"
    # MOYEN-ORIENT
    elif any(x in name for x in middle_east):
        dict["earthland"] = "Middle-East"
        dict["continent"] = "Moyen-Orient"
    # AFRICA
    elif any(x in name for x in north_africa + south_africa):
        dict["earthland"] = "Africa"
        if any(x in name for x in north_africa):
            dict["continent"] = "Afrique du Nord"
        else:
            dict["continent"] = "Afrique du Sud"
    # EUROPE
    elif any(x in name for x in west_europe + east_europe + north_europe):
        dict["earthland"] = "Europe"
        if any(x in name for x in west_europe):
            dict["continent"] = "Europe de l'Ouest"
        elif any(x in name for x in east_europe):
            dict["continent"] = "Europe de l'Est"
        else:
            dict["continent"] = "Europe du Nord"
    # ARCTIC
    elif any(x in name for x in arctic):
        dict["earthland"] = "Arctic"
        dict["continent"] = "Arctique"
    # POLYNESIA
    elif any(x in name for x in polynesia):
        dict["earthland"] = "Polynesia"
        dict["continent"] = "Polynésie"
    else:
        dict["earthland"] = None
        dict["continent"] = None
    # TODO: Coords according to country
    travels_array.append(dict)

travels_dict["travels"] = travels_array
    
json_file.write(json.dumps(travels_dict, indent=4))