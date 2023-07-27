---
date: 13/07/2023
description: Ressources
---

# CPP Sheet

# Vector

```cpp
#include <iostream>
#include <vector>
#include <map>
#include <unordered_map>

struct CityRecord{
    std::string Name;
    uint64_t Population;
    double Latitude,Longitude;
}

int main(){
    std::vector<CityRecord> cities;
    cities.reserve(4);
    cities.emplace_back("Melbourne",500,2.0,3.0);
    cities.emplace_back("Paris",1000,7.0,8.0);
    cities.emplace_back("London",200,5.0,8.0);
    cities.emplace_back("Montreal",300,1.0,1.0);

for (const auto& city : cities){
    if(city.name == "Paris"){
        std::cout << city.Population << std::endl;
    }
}

size_t indexToDelete = 2;
cities.erase(cities.begin() + indexToDelete );

// supprime une plage de valeur 
cities.erase(v.begin() + indexToDelete , v.end());

// supprime par valeur 
#include <algorithm>
cities.erase(std::remove(cities.begin(), cities.end(), "Melbourne"),cities.end());


/* sorting, dont work here 
    std::sort(cities.begin(),cities.end());
    */
    std::sort(cities.begin(),cities.end(), [](CityRecord a, CityRecord b){
        return a.Name < b.Name;
    });
    
}
```

# Map

```cpp
#include <iostream>
#include <vector>
#include <map>
#include <unordered_map>

struct CityRecord{
    uint64_t Population;
    double Latitude,Longitude;
}

int main(){
// Attention, si on utilise un type que l'on a défini comme clé d'une map, il faut aussi donner 
// la fonction de Hash de ce type sinon le langage ne saura pas comment Hash nos données.
// Dans le cas où on a une map il faut aussi un opérateur de comparaison qu'il faut définir 
    std::map<std::string,CityRecord> citymap; 
    //std::unordered_map<std::string,CityRecord> citymap; 
    cityMap["Melbourne"] = Cityrecord { 500,2.0,3.0 };
    cityMap["Paris"] = Cityrecord {1000,7.0,8.0};
    cityMap["London"] = Cityrecord { 200,5.0,8.0 };
    cityMap["Montreal"] = Cityrecord {300,1.0,1.0};

    CityRecord& berlinData = cityMap["Berlin"];
    berlinData.Population = 400;
    berlinData.Latitude = 1.0;
    berlinData.Longitude= 5.0;
    
    CityRecord& berlinData = cityMap["Berlin"];
    berlinData.Population;

    if(cities.find("Berlin") != cities.end()){
    // Si notre map est const l'opérateur [] ne marche pas
    // Il faut utiliser .at(), qui renvoie lui aussi toujours un const. 
        const auto& cities = cityMap;
        const CityRecord& berlinData = cities.at("Berlin");
    }

// c++ 14
    for( auto& kv : cityMap){
        const std::string& name = kv.first;
        CityRecord& city = kv.second;
    }

// c++ 17
    for( auto& [name,city] : cityMap){
        std::cout << name << "\t pop : " << city.Population << std::endl; 
    }

    cityMap.erase("Paris");
    
    
}
```
