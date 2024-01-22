import pickle

x = True
with open('first_start.pck', 'wb') as f:
    pickle.dump(x, f)


with open('first_start.pck', 'rb') as f:
    print(pickle.load(f))
