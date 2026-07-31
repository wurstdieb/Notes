---
title: Longest Arithmetic Subsequence
---
Given an array nums of integers, return the length of the longest arithmetic subsequence in nums. [Link](https://leetcode.com/problems/longest-arithmetic-subsequence/description/) 

Note that:  

A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.  
A sequence seq is arithmetic if `seq[i + 1] - seq[i] are all the same value (for 0 <= i < seq.length - 1).`  
**Solution:**  
Now assume DP(i,diff) to be the length of the longest subsequnce with a common difference "diff" ending at the ith index. Then the transition would be DP(i,diff) = max(DP(j,diff) + 1), for all js such that arr[i]-arr[j] = diff, and if i = 0, DP(i,diff) = 1.  
```cpp
class Solution {
public:
    int longestArithSeqLength(vector<int>& arr) {
        int dp[1010][1010];
        memset(dp,0,sizeof(dp));
        int ans = 2;
        int offset = 501;

        for(int i = 1;i< arr.size();i++){
            for(int j = i-1; j>= 0; j--){
                int diff = arr[i]-arr[j] + offset;
                if(!dp[i][diff])dp[i][diff] = 2;
                dp[i][diff] = max(dp[i][diff], dp[j][diff] + 1);
                ans = max(ans, dp[i][diff]);
            }
        }

        return ans;
    }
};  
```  
