#from __future__ import print_function
import sys
from ortools.linear_solver import pywraplp

import json
import unicodedata

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

    solver = pywraplp.Solver(
        "Nutri model min", pywraplp.Solver.GLOP_LINEAR_PROGRAMMING)

    #Variables
    weight = [solver.NumVar(0, solver.infinity(), 'w-' +
                            a_food["food"]["name"]) for a_food in food]

    #Constraints
    constraint = [solver.Constraint(
        conditionNutri[key][0], solver.infinity()) for key in conditionNutri]

    index = 0
    for key in conditionNutri:
        for iFood in range(nbFood):
            constraint[index].SetCoefficient(
                weight[iFood], food[iFood]["food"][key])
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
            a_food = [food[i]["food"]["_id"], food[i]["food"]["name"],
                      float(weight[i].solution_value())]
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

    solver = pywraplp.Solver(
        'Nutri Intel', pywraplp.Solver.GLOP_LINEAR_PROGRAMMING)

    #Variables
    weight = [solver.NumVar(0, solver.infinity(), 'w-' +
                            a_food["food"]["name"]) for a_food in food]

    #Constraints
    constraint = [solver.Constraint(
        conditionNutri[key][0], conditionNutri[key][1]) for key in conditionNutri]

    index = 0
    for key in conditionNutri:
        for iFood in range(numFood):
            constraint[index].SetCoefficient(
                weight[iFood], food[iFood]["food"][key])
        index = index + 1

    #Objective
    objective = solver.Objective()
    for i in range(numFood):
        objective.SetCoefficient(weight[i], food[i]["price"])

    objective.SetMinimization()

    result_status = solver.Solve()

    if result_status == solver.OPTIMAL:
        # print('Find solution')

        food_result = []
        for i in range(numFood):
            a_food = [food[i]["food"]["_id"], food[i]["food"]["name"],
                      float(weight[i].solution_value())]
            food_result.append(a_food)

        return {
            "status": 1,
            "cost": solver.Objective().Value(),
            "weight": food_result
        }
    else:
       return solveModelMin(food, conditionNutri)

#
# convert unicode string element in json data to ascii
#
def convertFoodUnicodeToAscii(raw_food):
    food = []

    for a_food in raw_food:
        item = json.loads('{}')
        for key in a_food:
            aKey = unicodedata.normalize('NFKD', key).encode('ascii', 'ignore')
            if (type(a_food[key]) is int) or (type(a_food[key]) is float):
                item[aKey] = a_food[key]
            elif type(a_food[key]) is dict:
                subItem = json.loads('{}')
                for k2 in a_food[key]:
                    aKey2 = unicodedata.normalize(
                        'NFKD', k2).encode('ascii', 'ignore')
                    if (type(a_food[key][k2]) is int) or (type(a_food[key][k2]) is float):
                        subItem[aKey2] = a_food[key][k2]
                    else:
                        subItem[aKey2] = unicodedata.normalize(
                            'NFKD', a_food[key][k2]).encode('ascii', 'ignore')
                item[aKey] = subItem
            else:
                item[aKey] = unicodedata.normalize(
                    'NFKD', a_food[key]).encode('ascii', 'ignore')
        food.append(item)

    return food


def convertConditionUnicodeToAscii(raw_conditionNutri):
    conditionNutri = json.loads('{}')

    for key in raw_conditionNutri:
        akey = unicodedata.normalize('NFKD', key).encode('ascii', 'ignore')
        if type(raw_conditionNutri[key]) is list:
            conditionNutri[akey] = raw_conditionNutri[key]
        else:
            conditionNutri[akey] = unicodedata.normalize('NFKD', raw_conditionNutri[key]).encode('ascii', 'ignore')
    
    return conditionNutri

def main():

    s_food = sys.argv[1]
    raw_food = json.loads(s_food)

    s_condition = sys.argv[2]
    raw_condition = json.loads(s_condition)
    
    food = convertFoodUnicodeToAscii(raw_food)
    conditionNutri = convertConditionUnicodeToAscii(raw_condition)


    data = solveProblem(food, conditionNutri)
    print(json.dumps(data))


if __name__ == '__main__':
    main()
