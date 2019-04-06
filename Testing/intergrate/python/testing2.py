import sys
import json
# from __future__ import print_function
from ortools.linear_solver import pywraplp

#Read data from stdin


def main():
    solver = pywraplp.Solver('SolverSimpleSystem', pywraplp.Solver.GLOP_LINEAR_PROGRAMMING)
    # Create the variables x and y.
    x = solver.NumVar(0, 1, 'x')
    y = solver.NumVar(0, 2, 'y')
    # Create the objective function, x + y.
    objective = solver.Objective()
    objective.SetCoefficient(x, 1)
    objective.SetCoefficient(y, 1)
    objective.SetMaximization()
    # Call the solver and display the results.
    solver.Solve()

    res = {
        "x": x.solution_value(),
        "y": y.solution_value()
    }
    print(json.dumps(res))
    # sys.stdout.flush()
    # print('Solution:')
    # print('x = ', x.solution_value())
    # print('y = ', y.solution_value())


    #return the sum to the output stream
    # print lines_sum

#start process
if __name__ == '__main__':
    main()