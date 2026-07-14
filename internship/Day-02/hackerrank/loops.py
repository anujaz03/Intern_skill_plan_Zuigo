# The provided code stub reads an integer, , from STDIN. For all non-negative integers , i<n print n**2 .


if __name__ == '__main__':
    n = int(input())
    for i in range (n+1) :
        if i<n:
            print(i**2)