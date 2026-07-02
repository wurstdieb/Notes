---
title: Bit Manipulation
---


Binary Operators:  
```
Operation     | Symbol | Example      | Result
--------------|--------|--------------|-------
AND           | &      | 1101 & 1011  | 1001
OR            | |      | 1101 | 1011  | 1111
XOR           | ^      | 1101 ^ 1011  | 0110
NOT           | ~      | ~1101        | 0010
Left Shift    | <<     | 1101 << 2    | 110100
Right Shift   | >>     | 1101 >> 2    | 0011
```  
Read and add sections on 2's compliment, where to use ints, and where to use unsigned ints, and which is easier in most scenarios:


Bit Manipulation Techniques:  
1. Check if i-th bit is set or not: `x & (1<<i)`
2. Set i-th bit:                    `x|(1<<i)`
3. Flip i-th bit: `x^(1<<i)`
4. Unset the i-th bit: `x& ~(1<<i)`
5. Check if a power of 2: `x & (x-1)`, also clears the lowest set bit.
6. Least Set Bit: `x & -x` i.e. `x & (~x + 1)` and also `x &~(x-1)`

Use Cases of Bit Manipulation Techniques:  
1. Representing and iterating through subsets very fast, instead of the traditional backtracking approach:  
If the Universal Set here is `{2,3,4,5,7}`, it can be very well represented as 0b11111, with the 1 at every place showing element arr[i] is present and if it were 0 the element absent. This also helps in compressing data i.e. a large set of numbers into a single number simply referred to as the mask.  
```cpp
/***
Parse through all subsets of an array of size "n"
***/

for(int mask = 0 ; mask < (1<<n); mask++){
    for(int i = 0; i < n ;i++){
        if(mask & (1<<i)){
            cout << arr[i] << ",";
        }
    }cout << "\n";
}

```  
2. As a follow up, write a small code to find the union and intersection of two given subsets of an array:  
```cpp
int mask1 = 0b00101;
int mask2 = 0b10110;
int u = mask1 | mask2;
int i = mask1 & mask2;
for(int i = 0;  i<n;i++){
    if(u & (1<< i)){
        cout << arr[i] << ",";
    }
}
for(int i = 0;  i<n;i++){
    if(u & (1<< i)){
        cout << arr[i] << ",";
    }
}
```  

3. Covert a given decimal number into its binary representation:  
```cpp
for(int i = 31; i >= 0;i--){
    if(n &(1<<i)){
        cout << 1 << ",";
    }else{
        cout << 0 <<",";
    }
}
```