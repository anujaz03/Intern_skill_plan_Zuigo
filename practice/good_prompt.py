"""
Employee Management System
--------------------------
Features:
1. Add Employee
2. View All Employees
3. Search Employee
4. Update Employee
5. Delete Employee
6. Exit

Author: ChatGPT
"""

# ---------------------- Employee Class ----------------------


class Employee:
    """Represents a single employee."""

    def __init__(self, emp_id, name, department, salary):
        self.emp_id = emp_id
        self.name = name
        self.department = department
        self.salary = salary

    def display(self):
        """Display employee details."""
        print("-" * 45)
        print(f"Employee ID : {self.emp_id}")
        print(f"Name        : {self.name}")
        print(f"Department  : {self.department}")
        print(f"Salary      : ₹{self.salary:.2f}")


# ---------------------- Management Class ----------------------


class EmployeeManagementSystem:
    """Handles all employee operations."""

    def __init__(self):
        self.employees = {}

    # ---------------- Add Employee ----------------

    def add_employee(self):
        """Add a new employee."""

        try:
            emp_id = int(input("Enter Employee ID: "))

            if emp_id in self.employees:
                print("Employee ID already exists!")
                return

            name = input("Enter Name: ").strip()
            department = input("Enter Department: ").strip()
            salary = float(input("Enter Salary: "))

            employee = Employee(emp_id, name, department, salary)
            self.employees[emp_id] = employee

            print("Employee Added Successfully!")

        except ValueError:
            print("Invalid input! Please enter correct values.")

    # ---------------- View Employees ----------------

    def view_employees(self):
        """Display all employees."""

        if not self.employees:
            print("No employees found.")
            return

        for employee in self.employees.values():
            employee.display()

    # ---------------- Search Employee ----------------

    def search_employee(self):
        """Search employee using employee ID."""

        try:
            emp_id = int(input("Enter Employee ID to Search: "))

            if emp_id in self.employees:
                self.employees[emp_id].display()
            else:
                print("Employee Not Found.")

        except ValueError:
            print("Invalid Employee ID.")

    # ---------------- Update Employee ----------------

    def update_employee(self):
        """Update employee information."""

        try:
            emp_id = int(input("Enter Employee ID to Update: "))

            if emp_id not in self.employees:
                print("Employee Not Found.")
                return

            employee = self.employees[emp_id]

            employee.name = input(
                f"Enter New Name ({employee.name}): "
            ).strip()

            employee.department = input(
                f"Enter New Department ({employee.department}): "
            ).strip()

            employee.salary = float(
                input(f"Enter New Salary ({employee.salary}): ")
            )

            print("Employee Updated Successfully!")

        except ValueError:
            print("Invalid Input.")

    # ---------------- Delete Employee ----------------

    def delete_employee(self):
        """Delete employee."""

        try:
            emp_id = int(input("Enter Employee ID to Delete: "))

            if emp_id in self.employees:
                del self.employees[emp_id]
                print("Employee Deleted Successfully!")
            else:
                print("Employee Not Found.")

        except ValueError:
            print("Invalid Employee ID.")

    # ---------------- Menu ----------------

    def menu(self):
        """Display menu until user exits."""

        while True:

            print("\n")
            print("=" * 40)
            print(" EMPLOYEE MANAGEMENT SYSTEM ")
            print("=" * 40)
            print("1. Add Employee")
            print("2. View Employees")
            print("3. Search Employee")
            print("4. Update Employee")
            print("5. Delete Employee")
            print("6. Exit")

            choice = input("Enter your choice: ")

            if choice == "1":
                self.add_employee()

            elif choice == "2":
                self.view_employees()

            elif choice == "3":
                self.search_employee()

            elif choice == "4":
                self.update_employee()

            elif choice == "5":
                self.delete_employee()

            elif choice == "6":
                print("Thank you for using the system.")
                break

            else:
                print("Invalid choice! Please select between 1 and 6.")


# ---------------------- Main Program ----------------------

if __name__ == "__main__":
    system = EmployeeManagementSystem()
    system.menu()