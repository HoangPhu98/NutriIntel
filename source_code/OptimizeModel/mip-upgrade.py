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
    nbNutri = len(conditionNutri)

    solver = pywraplp.Solver("Nutri model min", pywraplp.Solver.GLOP_LINEAR_PROGRAMMING)

    #Variables
    weight = [solver.NumVar(0, solver.infinity(), 'w-' + food[i][0]) for i in range(nbFood)]

    #Constraints
    constraint = [solver.Constraint(conditionNutri[i][1], solver.infinity()) for i in range(nbNutri)]

    for i in range(nbNutri):
        for j in range(nbFood):
            constraint[i].SetCoefficient(weight[j], food[j][i+2])
    
    #Objective
    objective = solver.Objective()
    for i in range(nbFood):
        objective.SetCoefficient(weight[i], food[i][1])

    objective.SetMinimization()

    #Result
    result_status = solver.Solve()

    if result_status == solver.OPTIMAL:
        #print('Find Other Solution')

        food_result = []
        for i in range(nbFood):
            a_food = [food[i][0], float(weight[i].solution_value())]
            food_result.append(a_food)
        
        return {
            "status": 2,
            "cost": solver.Objective().Value(),
            "weight": food_result
        }
    else:
        print('This is bug. hahaha')
        return {
            "status": 3,
            "cost": 0,
            "weight": []
        }

def preProcessData(food, conditionNutri):
    hasNutrie = [0 for i in range(len(conditionNutri))]
    
    for i in range(len(conditionNutri)):
        if conditionNutri[i][1] > 0:
            for a_food in food:
                if a_food[i + 2] > 0:
                    hasNutrie[i] = 1
        else:
            hasNutrie[i] = 1
    
    for i in range(len(conditionNutri)):
        if hasNutrie[i] == 0:
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
    numNutri = len(conditionNutri)

    solver = pywraplp.Solver('Nutri Intel', pywraplp.Solver.GLOP_LINEAR_PROGRAMMING)

    #Variables
    weight = [solver.NumVar(0, solver.infinity(), 'w-' + food[i][0]) for i in range(numFood)]

    #Constraints
    constraint = [solver.Constraint(conditionNutri[i][1], conditionNutri[i][2]) for i in range(numNutri)]

    for i in range(numNutri):
        for j in range(numFood):
            constraint[i].SetCoefficient(weight[j], food[j][i + 2])

    #Objective
    objective = solver.Objective()
    for i in range(numFood):
        objective.SetCoefficient(weight[i], food[i][1])
    objective.SetMinimization()

    result_status = solver.Solve()

    if result_status == solver.OPTIMAL:
        #print('Find solution')

        food_result = []
        for i in range(numFood):
            a_food = [food[i][0], float(weight[i].solution_value())]
            food_result.append(a_food)

        return {
            "status": 1,
            "cost": solver.Objective().Value(),
            "weight": food_result
        }
    else:
        return solveModelMin(food, conditionNutri)


def main():
    
    #Food: Id | Price | Water | Energy | Protein | Lipid | Glucid | Cenlluloza | Ash
    food = [
        ["Gao Nep Cai", 2000, 14, 344, 0, 1, 75, 1, 1],
        ["Sup Lo Xanh", 1500, 90, 26, 0, 0, 3, 3, 1],
        ["Ca Mo", 2400, 73, 151, 0, 0, 0, 0, 1]
    ]

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


