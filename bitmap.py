import math
import logging

bitarray = [
    
]

dectohex = {
    1 :"0",
    2 :"1",
    3 :"2",
    4 :"3",
    5 :"4",
    6 :"5",
    7 :"6",
    8 :"7",
    9 :"8",
    10:"9",
    11:"a",
    12:"b",
    13:"c",
    14:"d",
    15:"e",
    16:"f"
}

neoBitmap = []

george = 0

def makeBitmap():
    bit = ""
    for v in range(int(len(bitarray)/3)):
        if (len(bit) == 3):
            neoBitmap.append("#" + bit)
            bit = ""
        for c in range(3):
            digit = bitarray[v*3+c]
            if(digit == 0 or digit == 1 or digit == 2 or digit == 3 or digit == 4 or digit == 5 or digit == 6 or digit == 7): bitarray[v*3+c] = 16
            if(digit == 8 or digit == 9 or digit == 10 or digit == 11 or digit == 12 or digit == 13 or digit == 14 or digit == 15): bitarray[v*3+c] = 16
            # print(dectohex[math.floor((bitarray[v*3+c]+1)>>4)])
            bit += dectohex[math.floor((bitarray[v*3+c]+1)>>4)]

def makeString():
    eight = ""
    four = 0
    for v in range(32):
        for c in range(4):
            for b in range(8):
                eight += "\"" + neoBitmap[(v*32 + c*8 + b)-1] + "\","
                if (b == 7):
                    print(eight + "  ", end="")
                    eight = ""
                if (c*8 + b == 31):
                    print()
                
makeBitmap()
makeString()