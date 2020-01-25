import csv
import numpy as np

# Initialization of matrices as Python lists
raw_x_values = []
raw_y_values = []

# Opens the CSV file to read divorce data
with open('divorce.csv', newline='') as csv_file:
    divorce_data = csv.reader(csv_file)

    next(divorce_data) # skip header row
    for row in divorce_data:
        row = row[0].split(";")
        x_values = list([float(x) for x in row[:-1]])
        y_values = list([float(x) for x in row[-1:]])
        raw_x_values.append(x_values)
        raw_y_values.append(y_values)

# Numpy matrices
x_values = np.matrix(raw_x_values)
y_values = np.matrix(raw_y_values)

def linear_model(weights, x):
    """
    Evaluate the linear component of the logistic model given a set of weights and x values.
    """
    return np.dot(weights, np.concatenate([np.array([1]), x]))

def sigmoid_model(z):
    """
    Evaluate the sigmoid function with input value z.
    """
    return 1 / (1 + np.exp(-z))

def logistic_model_probability(weights, x):
    """
    Evaluate the logistic model given a set of weights and x values to find a probability.
    """
    return sigmoid_model(linear_model(weights, x))

def logistic_model_threshold(weights, x):
    """
    Evaluate the logistic model given a set of weights and x values to find a true or false value.
    """
    return linear_model(weights, x) > 0

def calculate_gradient_vector(weights, x_matrix, y_vector):
    """
    Calculate the gradient vector given a set of current weights, as well as the training data.
    """
    m, n = x_values.shape
    gradient_vector = np.ones(n + 1)
    constant_vector = np.ones(m)
    for i in range(m):
        constant_vector[i] = logistic_model_probability(weights, x_matrix[i].A1) - y_vector[i, 0]
    gradient_vector[0] = np.sum(constant_vector)
    for j in range(n):
        gradient_vector[j + 1] = np.dot(constant_vector, np.transpose(x_matrix[:,j]).A1)
    return gradient_vector

def logistic_gradient_descent(x_matrix, y_vector, learning_rate, threshold):
    """
    Perform logistic regression via the gradient descent algorithm.
    """
    n = x_values.shape[1]
    weights = np.ones(n + 1)
    while True:
        new_weights = weights - learning_rate * calculate_gradient_vector(weights, x_matrix, y_vector)
        if np.linalg.norm(new_weights - weights) < threshold:
            return new_weights
        weights = new_weights

output = logistic_gradient_descent(x_values, y_values, 0.01, 0.001)

print(output.tolist())

test = np.array([2] * 54)
print(logistic_model_probability(output, test))
print(logistic_model_threshold(output, test))

test2 = x_values[160].A1
print(logistic_model_probability(output, test2))
print(logistic_model_threshold(output, test2))

test3 = x_values[40].A1
print(logistic_model_probability(output, test3))
print(logistic_model_threshold(output, test3))