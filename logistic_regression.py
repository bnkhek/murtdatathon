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