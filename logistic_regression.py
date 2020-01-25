import csv
import numpy as np

# Initialization of matrices as Python lists
raw_x_values = []
raw_y_values = []

# Opens the CSV file to read divorce data
with open('divorce.csv', newline='') as csv_file:
    divorce_data = csv.reader(csv_file)

    # Header bool used to skip the header row in CSV file
    header = True
    for row in divorce_data:
        if header:
            header = False
            continue
        row = row[0].split(";")
        raw_x_values.append(row[:-1])
        raw_y_values.append(row[-1:])

# Numpy matrices
x_values = np.matrix(raw_x_values)
y_values = np.matrix(raw_y_values)

n = 54
m = 170

def linear_model(weights, x):
    """
    Evaluate the linear component of the logistic model given a set of weights and x values.
    """
    return np.dot(weights, x)

def sigmoid_model(z):
    """
    Evaluate the sigmoid function with input value z.
    """
    return 1 / (1 + exp(z))

def calculate_gradient_vector(weights, x_matrix, y_vector):
    """
    Calculate the gradient vector given a set of current weights, as well as the training data.
    """
    gradient_vector = np.ones(n)
    constant_vector = np.ones(m)
    for i in range(m):
        constant_vector[i] = sigmoid_model(linear_model(weights, x_matrix[i])) - y_vector[i, 0] # index?
    for j in range(n):
        gradient_vector[j] = np.dot(constant_vector, np.transpose(x_matrix[:,j]))



