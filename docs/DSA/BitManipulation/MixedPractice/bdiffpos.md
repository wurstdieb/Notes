---
title: Bit Differences
---

Let f(x,y) denote the number of bits where x and y differ, find the sum of f(x,y) over the entire array.  
**Solution:** Say at the bit position i, we have k 0s and n-k 1s from all n elements, every 0 will contribute n-k differences, and similarly all zeroes will be differnet when compared to the n-k 1s and hence the contribution due to this one bit to the overall answer will be `k*(n-k)`. Do the same over all bits.  
```cpp
int ans = 0;
for(int i = 0 ; i < 31;i++){
    int k = 0;
    for(auto &num: nums){
        if(!(num & (1<<i))){
            k++;
        }
    }
    ans+= k*(n-k);
}
```