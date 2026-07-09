# Number of elements in Set A
n = int(input("Enter the number of elements in Set A: "))

# Elements of Set A
A = set(map(int, input("Enter the elements of Set A (space-separated): ").split()))

# Number of operations
N = int(input("Enter the number of operations: "))

# Perform operations
for i in range(N):

    print(f"\nOperation {i+1}")

    operation, length = input(
        "Enter operation and size (Example: update 3): "
    ).split()

    other_set = set(map(int, input("Enter the elements of the other set: ").split()))

    if operation == "update":
        A.update(other_set)

    elif operation == "intersection_update":
        A.intersection_update(other_set)

    elif operation == "difference_update":
        A.difference_update(other_set)

    elif operation == "symmetric_difference_update":
        A.symmetric_difference_update(other_set)

    else:
        print("Invalid operation!")

    print("Current Set A:", A)

# Final Output
print("\nFinal Set A:", A)
print("Sum of elements:", sum(A))