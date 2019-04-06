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
def solveProblem(food, conditionNutri):
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
        print('Find solution')

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
        print("No solution for problem")
        return {
            "status": 0,
            "cost": 0,
            "weight": []
        }


def main():
    
    #Food: Id | Price | Water | Energy | Protein | Lipid | Glucid | Cenlluloza | Ash
    food = [
        ["Gao Nep Cai", 2000, 14, 344, 8, 1, 75, 1, 1],
        ["Sup Lo Xanh", 1500, 90, 26, 3, 0, 3, 3, 1],
        ["Ca Mo", 2400, 73, 151, 17, 9, 0, 0, 1]
    ]

    #Nutriet: Name | min | max
    conditionNutri = [
        ["Water", 100, 2000],
        ["Energy", 100, 200],
        ["Protein", 10, 500],
        ["Lipid", 5, 150],
        ["Glucid", 5, 500],
        ["Cenlluloza", 5, 30],
        ["Ash", 0, 1000]
    ]

    data = solveProblem(food, conditionNutri)
    print("Cost of meal: %d" % data["cost"])
    for i in range(len(data["weight"])):
        print("\t%s: %.2f" % (data["weight"][i][0], data["weight"][i][1]))


if __name__ == '__main__':
    main()


