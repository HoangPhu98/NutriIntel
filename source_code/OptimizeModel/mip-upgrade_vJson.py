#from __future__ import print_function
from ortools.linear_solver import pywraplp
import json

"""
# solve nutriet
# @return Object {
#    status: 1 = find optimal solution
#    0 = no solution
#    weight: demension-array: name | weight of food
#    }
"""

def solveModelMin(food, conditionNutri):
    nbFood = len(food)

    solver = pywraplp.Solver("Nutri model min", pywraplp.Solver.GLOP_LINEAR_PROGRAMMING)

    #Variables
    weight = [solver.NumVar(0, solver.infinity(), 'w-' + a_food["food"]["name"]) for a_food in food]

    #Constraints
    constraint = [solver.Constraint(conditionNutri[key][0], solver.infinity()) for key in conditionNutri]

    index = 0
    for key in conditionNutri:
        for iFood in range(nbFood):
            constraint[index].SetCoefficient(weight[iFood], food[iFood]["food"][key])
        index = index + 1
    
    #Objective
    objective = solver.Objective()
    for i in range(nbFood):
        objective.SetCoefficient(weight[i], food[i]["price"])

    objective.SetMinimization()

    #Result
    result_status = solver.Solve()

    if result_status == solver.OPTIMAL:
        #print('Find Other Solution')

        food_result = []
        for i in range(nbFood):
            a_food = [food[i]["food"]["name"], float(weight[i].solution_value())]
            food_result.append(a_food)
        
        return {
            "status": 2,
            "cost": solver.Objective().Value(),
            "weight": food_result
        }
    else:
        # print('This is bug. hahaha')
        return {
            "status": 3,
            "cost": 0,
            "weight": []
        }

def preProcessData(food, conditionNutri):
    hasNutrie = json.loads('{}')
    
    for key in conditionNutri:
        hasNutrie[key] = 0

    for key in conditionNutri:
        if conditionNutri[key][0] > 0:
            for a_food in food:
                if a_food["food"][key] > 0:
                    hasNutrie[key] = 1
        else:
            hasNutrie[key] = 1
    
    for key in hasNutrie:
        if hasNutrie[key] == 0:
            return {
                "status": -1,
                "hasNutrie": hasNutrie
            }

    return {
        "status": 0,
        "hasNutrie": hasNutrie
    }
    
    

def solveProblem(food, conditionNutri):
    result_preProcess = preProcessData(food, conditionNutri)
    
    
    if result_preProcess["status"] == -1:
        return result_preProcess

    numFood = len(food)

    solver = pywraplp.Solver('Nutri Intel', pywraplp.Solver.GLOP_LINEAR_PROGRAMMING)

    #Variables
    weight = [solver.NumVar(0, solver.infinity(), 'w-' + a_food["food"]["name"]) for a_food in food]

    #Constraints
    constraint = [solver.Constraint(conditionNutri[key][0], conditionNutri[key][1]) for key in conditionNutri]

    index = 0
    for key in conditionNutri:
        for iFood in range(numFood):
            constraint[index].SetCoefficient(weight[iFood], food[iFood]["food"][key])
        index = index + 1

    #Objective
    objective = solver.Objective()
    for i in range(numFood):
        objective.SetCoefficient(weight[i], food[i]["price"])

    objective.SetMinimization()

    result_status = solver.Solve()

    if result_status == solver.OPTIMAL:
        print('Find solution')

        food_result = []
        for i in range(numFood):
            a_food = [food[i]["food"]["name"], float(weight[i].solution_value())]
            food_result.append(a_food)

        return {
            "status": 1,
            "cost": solver.Objective().Value(),
            "weight": food_result
        }
    else:
       return solveModelMin(food, conditionNutri)


def main():
    
    """
    food = [{
            "price": 300,
            "food": {
                    "name": "Gao nep",
                    "energyC": 100,
                    "energyJ": 100,
                    "protein": 30}
            },{
            "price": 200,
            "food": {
                    "name": "Thit bo",
                    "energyC": 80,
                    "energyJ": 80,
                    "protein": 50
            }}]
    """
    
    food = [{ 
            "_id": "5cb1703a1a1336403888ad19",
            "food": { 
                    "_id": "5cac39a3b3dde1323888ef44",
                    "generalName": 'Glutinous rice',
                   "name": 'Gạo nếp cái',
                   "type": 'Ngũ cốc',
                   "description": '-',
                   "amount": 100,
                   "energyC": 344,
                   "energyJ": 1441,
                   "protein": 8.6,
                   "fat": 1.5,
                   "carbohydrate": 74.5,
                   "fiber": 0.6,
                   "ash": 0.8,
                   "totalSugar": 0,
                   "calcium": 32,
                   "iron": 1.2,
                   "magnesium": 17,
                   "manganese": 1.1,
                   "phosphorous": 98,
                   "patassium": 282,
                   "sodium": 3,
                   "zinc": 2.2,
                   "copper": 280,
                   "selenium": 0,
                   "vitaminC": 0,
                   "vitaminB1": 0.14,
                   "vitaminB2": 0.06,
                   "vitaminPP": 2.4,
                   "vitaminB5": 0,
                   "vitaminB6": 0,
                   "folate": 0,
                   "vitaminB9": 0,
                   "vitaminH": 0,
                   "vitaminB12": 0,
                   "vitaminA": 0,
                   "vitaminD": 0,
                   "vitaminE": 0,
                   "vitaminK": 0,
                   "betaCaroten": 0,
                   "alphaCaroten": 0,
                   "lycopen": 0,
                   "totalIsoflavone": 0,
                   "totalAcid": 0,
                   "cholesterol": 0,
                   "phytosterol": 0,
                   "__v": 0 },
                "price": 489.79950481951937,
                "__v": 0 }
                 ]
    """
    conditionNutri = {
          "energyC": [100, 500],
          "energyJ": [100, 500],
          "protein": [10, 20]
    }
    """
    
    
    conditionNutri = { 
          "energyC": [ 2300, 2800 ],
          "energyJ": [ 9623, 11715 ],
          "protein": [ 200, 236 ],
          "fat": [ 80, 96 ],
          "carbohydrate": [ 200, 236 ],
          "fiber": [ 0, 999999 ],
          "ash": [ 0, 999999 ],
          "totalSugar": [ 0, 999999 ],
          "calcium": [ 0, 999999 ],
          "iron": [ 0, 999999 ],
          "magnesium": [ 0, 999999 ],
          "manganese": [ 0, 999999 ],
          "phosphorous": [ 0, 999999 ],
          "patassium": [ 0, 999999 ],
          "sodium": [ 0, 999999 ],
          "zinc": [ 0, 999999 ],
          "copper": [ 0, 999999 ],
          "selenium": [ 0, 999999 ],
          "vitaminC": [ 0, 999999 ],
          "vitaminB1": [ 0, 999999 ],
          'vitaminB2': [ 0, 999999 ],
          'vitaminPP': [ 0, 999999 ],
          'vitaminB5': [ 0, 999999 ],
          'vitaminB6': [ 0, 999999 ],
          'folate': [ 0, 999999 ],
          'vitaminB9': [ 0, 999999 ],
          'vitaminH': [ 0, 999999 ],
          'vitaminB12': [ 0, 999999 ],
          'vitaminA': [ 0, 999999 ],
          'vitaminD': [ 0, 999999 ],
          'vitaminE': [ 0, 999999 ],
          'vitaminK': [ 0, 999999 ],
          'betaCaroten': [ 0, 999999 ],
          'alphaCaroten': [ 0, 999999 ],
          'lycopen': [ 0, 999999 ],
          'totalIsoflavone': [ 0, 999999 ],
          'totalAcid': [ 0, 999999 ],
          'cholesterol': [ 0, 999999 ],
          'phytosterol': [ 0, 999999 ] 
    }
    
    """
    #Nutriet: Name | min | max
    conditionNutri = [
        ["Water", 300, 400],
        ["Energy", 100, 150],
        ["Protein", 10, 500],
        ["Lipid", 5, 150],
        ["Glucid", 5, 500],
        ["Cenlluloza", 5, 30],
        ["Ash", 1, 1000]
    ]
"""
    data = solveProblem(food, conditionNutri)
    if data["status"] == -1:
        print('Meal hasn\'t nutrie:')
        for i in range(len(data['hasNutrie'])):
            if data['hasNutrie'][i] == 0:
                print('\t%s' % conditionNutri[i][0])
    elif data["status"] == 1:
        print('Find Optimal Solution')
        print("Cost of meal: %d" % data["cost"])
        for i in range(len(data["weight"])):
            print("\t%s: %.2f" % (data["weight"][i][0], data["weight"][i][1]))
    elif data["status"] == 2:
        print('Find Other Solution')
        print("Cost of meal: %d" % data["cost"])
        for i in range(len(data["weight"])):
            print("\t%s: %.2f" % (data["weight"][i][0], data["weight"][i][1]))


if __name__ == '__main__':
    main()


